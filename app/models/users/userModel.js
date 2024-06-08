const { getConnection } = require("../../config/connection");
const bcrypt = require("bcrypt");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }

         connection.query(
            "SELECT users.*, type_user.type_user AS type_user, status_user.status AS status_user FROM users INNER JOIN type_user ON users.type_user_id = type_user.id INNER JOIN status_user ON users.status_user_id = status_user.id",
            (err, result) => {
               connection.release(); // Libera a conexão de volta para o pool
               if (err) {
                  reject(`Erro ao recuperar os dados: ${err}`);
               } else {
                  resolve(result);
               }
            }
         );
      });
   });
};

const getOne = async (id) => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }

         connection.query(
            `SELECT users.*, type_user.type_user AS type_user, status_user.status AS status_user FROM users INNER JOIN type_user ON users.type_user_id = type_user.id INNER JOIN status_user ON users.status_user_id = status_user.id WHERE users.id = ?`,
            [id],
            (err, result) => {
               connection.release(); // Libera a conexão de volta para o pool
               if (err) {
                  reject(`Erro ao localizar usuário: ${err}`);
               } else {
                  resolve(result[0]);
               }
            }
         );
      });
   });
};

const loginUser = async (user) => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }

         connection.query("SELECT * FROM users WHERE email = ? AND status_user_id <> ?", [user.email, 2], (err, result) => {
            connection.release(); // Libera a conexão de volta para o pool
            if (err) {
               reject(`Erro ao localizar usuário: ${err}`);
            } else {
               resolve(result[0]);
            }
         });
      });
   });
};

const checkPassword = async (password_login, password_db) => {
   return bcrypt.compare(password_login, password_db);
};

const addUser = async (user) => {
   // Verificar se o email já está em uso
   const emailExist = await new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }

         connection.query(`SELECT email FROM users WHERE email = ?`, [user.email], (err, result) => {
            connection.release(); // Libera a conexão de volta para o pool
            if (err) {
               reject(`Erro ao verificar email: ${err}`);
            } else {
               resolve(result.length > 0); // Retorna true se o email já existir, caso contrário false
            }
         });
      });
   });

   // Se o email já existir, retorne sem adicionar o usuário
   if (emailExist) {
      return { error: "Email já está em uso!" };
   }

   // Se o email não existir, continue com a adição do usuário
   let password_hash = await bcrypt.hash(user.password, 7);

   const query = "INSERT INTO users (username, email, phone_number, password, status_user_id, type_user_id) VALUES (?, ?, ?, ?, ?, ?)";

   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }

         connection.query(query, [user.username, user.email, user.phone_number, password_hash, user.status_user_id, user.type_user_id], (err, result) => {
            connection.release(); // Libera a conexão de volta para o pool
            if (err) {
               reject(`Erro ao cadastrar usuário: ${err}`);
            } else {
               resolve({ message: "Usuário cadastrado com sucesso!" });
            }
         });
      });
   });
};

const updateUser = async (id, user) => {
   const { username, email, phone_number, status_user_id, type_user_id } = user;

   // Verificar se o email já está em uso
   const emailExist = await new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }

         connection.query(`SELECT * FROM users WHERE email = ? AND id <> ?`, [email, id], (err, result) => {
            connection.release(); // Libera a conexão de volta para o pool
            if (err) {
               reject(`Erro ao verificar email: ${err}`);
            } else {
               resolve(result.length > 0); // Retorna true se o email já existir, caso contrário false
            }
         });
      });
   });

   // Se o email já existir, retorne sem adicionar o usuário
   if (emailExist) {
      return { error: "Email já está em uso!" };
   }

   const query = "UPDATE users SET username = ?, email = ?, phone_number = ?, status_user_id = ?, type_user_id = ? WHERE id = ?";

   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }

         connection.query(query, [username, email, phone_number, status_user_id, type_user_id, id], (err, result) => {
            connection.release(); // Libera a conexão de volta para o pool
            if (err) {
               reject(`Erro ao alterar usuário: ${err}`);
            } else {
               resolve({ message: "Usuário alterado com sucesso!" });
            }
         });
      });
   });
};

const updatePassword = async (id, user) => {
   const { password } = user;

   let password_hash = await bcrypt.hash(password, 7);

   const query = "UPDATE users SET password = ? WHERE id = ?";

   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }

         connection.query(query, [password_hash, id], (err, result) => {
            connection.release(); // Libera a conexão de volta para o pool
            if (err) {
               reject(`Erro ao alterar senha: ${err}`);
            } else {
               resolve({ message: "Senha alterada com sucesso!" });
            }
         });
      });
   });
};

const deleteUser = async (id) => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }

         connection.query(`DELETE FROM users WHERE id = ?`, [id], (err, result) => {
            connection.release(); // Libera a conexão de volta para o pool
            if (err) {
               reject(`Erro ao excluir usuário: ${err}`);
            } else {
               resolve({ message: "Usuário excluído com sucesso!" });
            }
         });
      });
   });
};

const updatePhoto = async (id, fileName) => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }

         connection.query(`UPDATE users SET user_photo = ? WHERE id = ?`, [fileName.fileName, id], (err, result) => {
            connection.release(); // Libera a conexão de volta para o pool
            if (err) {
               reject(`Erro ao atualizar foto: ${err}`);
            } else {
               resolve({ message: "Foto atualizada com sucesso!" });
            }
         });
      });
   });
};

module.exports = {
   getAll,
   addUser,
   deleteUser,
   updateUser,
   getOne,
   loginUser,
   checkPassword,
   updatePassword,
   updatePhoto,
};

// const con = require("../../config/connection");
// const bcrypt = require("bcrypt");

// const getAll = async () => {
//    return new Promise((resolve, reject) => {
//       con.query(
//          "SELECT users.*, type_user.type_user AS type_user, status_user.status AS status_user FROM users INNER JOIN type_user ON users.type_user_id = type_user.id INNER JOIN status_user ON users.status_user_id = status_user.id",
//          (err, result) => {
//             if (err) {
//                reject(`Erro ao recuperar os dados: ${err}`);
//             } else {
//                resolve(result);
//             }
//          }
//       );
//    }).catch((error) => {
//       throw new Error(`Erro ao atualizar usuário: ${error}`);
//    });
// };

// const getOne = async (id) => {
//    return new Promise((resolve, reject) => {
//       con.query(
//          `SELECT users.*, type_user.type_user AS type_user, status_user.status AS status_user FROM users INNER JOIN type_user ON users.type_user_id = type_user.id INNER JOIN status_user ON users.status_user_id = status_user.id WHERE users.id = ${id}`,
//          (err, result) => {
//             if (err) {
//                reject(`Erro ao localizar usuário: ${err}`);
//             } else {
//                resolve(result[0]);
//             }
//          }
//       );
//    }).catch((error) => {
//       throw new Error(`Erro ao localizar usuário: ${error}`);
//    });
// };

// const loginUser = async (user) => {
//    return new Promise((resolve, reject) => {
//       con.query("SELECT * FROM users WHERE email = ? AND status_user_id <> ?", [user.email, 2], (err, result) => {
//          if (err) {
//             reject(`Erro ao localizar usuário: ${err}`);
//          } else {
//             resolve(result[0]);
//          }
//       });
//    }).catch((error) => {
//       throw new Error(`Erro ao localizar usuário: ${error}`);
//    });
// };

// // Compara a senha informada com a senha criptografada no banco de dados
// const checkPassword = async (password_login, password_db) => {
//    // console.log(password_login + " " + password_db);
//    return bcrypt.compare(password_login, password_db);
// };

// const addUser = async (user) => {
//    // Verificar se o email já está em uso
//    const emailExist = await new Promise((resolve, reject) => {
//       con.query(`SELECT email FROM users WHERE email = ?`, [user.email], (err, result) => {
//          if (err) {
//             reject(`Erro ao verificar email: ${err}`);
//          } else {
//             resolve(result.length > 0); // Retorna true se o email já existir, caso contrário false
//          }
//       });
//    });

//    // Se o email já existir, retorne sem adicionar o usuário
//    if (emailExist) {
//       return { error: "Email já está em uso!" };
//    }

//    // Se o email não existir, continue com a adição do usuário
//    let password = user.password;
//    let password_hash = await bcrypt.hash(password, 7);

//    console.log(user);

//    console.log(password_hash);

//    const query = "INSERT INTO users (username, email, phone_number, password, status_user_id, type_user_id) VALUES (?, ?, ?, ?, ?, ?)";

//    return new Promise((resolve, reject) => {
//       con.query(query, [user.username, user.email, user.phone_number, password_hash, user.status_user_id, user.type_user_id], (err, result) => {
//          if (err) {
//             reject(`Erro ao cadastrar usuário: ${err}`);
//          } else {
//             // resolve({
//             //    insertId: result.insertId,
//             //    affectedRows: result.affectedRows,
//             // });
//             resolve({ message: "Usuário cadastrado com sucesso!" });
//          }
//       });
//    }).catch((error) => {
//       throw new Error(`Erro ao adicionar usuário: ${error}`);
//    });
// };

// const updateUser = async (id, user) => {
//    const { username, email, phone_number, status_user_id, type_user_id } = user;

//    // let password_hash = await bcrypt.hash(password, 7);

//    // Verificar se o email já está em uso
//    const emailExist = await new Promise((resolve, reject) => {
//       con.query(`SELECT * FROM users WHERE email = ? AND id <> ?`, [email, id], (err, result) => {
//          if (err) {
//             reject(`Erro ao verificar email: ${err}`);
//          } else {
//             resolve(result.length > 0); // Retorna true se o email já existir, caso contrário false
//          }
//       });
//    });

//    // Se o email já existir, retorne sem adicionar o usuário
//    if (emailExist) {
//       return { error: "Email já está em uso!" };
//    }

//    const query = "UPDATE users SET username = ?, email = ?, phone_number = ?, status_user_id = ?, type_user_id = ? WHERE id = ?";

//    return new Promise((resolve, reject) => {
//       con.query(query, [username, email, phone_number, status_user_id, type_user_id, id], (err, result) => {
//          if (err) {
//             reject(`Erro ao alterar usuário: ${err}`);
//          } else {
//             // resolve(JSON.stringify(result));
//             resolve({ message: "Usuário alterado com sucesso!" });
//          }
//       });
//    }).catch((error) => {
//       throw new Error(`Erro ao alterar usuário: ${error}`);
//    });
// };

// const updatePassword = async (id, user) => {
//    const { password } = user;

//    let password_hash = await bcrypt.hash(password, 7);

//    const query = "UPDATE users SET password = ? WHERE id = ?";

//    return new Promise((resolve, reject) => {
//       con.query(query, [password_hash, id], (err, result) => {
//          if (err) {
//             reject(`Erro ao alterar usuário: ${err}`);
//          } else {
//             // resolve(JSON.stringify(result));
//             resolve({ message: "Senha alterada com sucesso!" });
//          }
//       });
//    }).catch((error) => {
//       throw new Error(`Erro ao alterar senha: ${error}`);
//    });
// };

// const deleteUser = async (id) => {
//    return new Promise((resolve, reject) => {
//       con.query(`DELETE FROM users WHERE id = ${id}`, (err, result) => {
//          if (err) {
//             reject(`Erro ao excluir usuário: ${err}`);
//          } else {
//             // resolve(JSON.stringify(result));
//             resolve({ message: "Usuário excluído com sucesso!" });
//          }
//       });
//    }).catch((error) => {
//       throw new Error(`Erro ao excluir usuário: ${error}`);
//    });
// };

// const updatePhoto = async (id, fileName) => {
//    // console.log(fileName);
//    // console.log(fileName.fileName);
//    // console.log(id);
//    // console.log(id.id);

//    return new Promise((resolve, reject) => {
//       con.query(`UPDATE users SET user_photo = '${fileName.fileName}' WHERE id = ${id}`, (err, result) => {
//          if (err) {
//             reject(`Erro ao atualizar foto: ${err}`);
//          } else {
//             // console.log(result);
//             resolve({ message: "Foto atualizada com sucesso!" });
//          }
//       });
//    }).catch((error) => {
//       throw new Error(`Erro ao atualizar foto: ${error}`);
//    });
// };

// module.exports = { getAll, addUser, deleteUser, updateUser, getOne, loginUser, checkPassword, updatePassword, updatePhoto };
