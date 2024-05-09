const tokenID = localStorage.getItem("tokenPT");
const modalDelete = document.getElementById("modal-message");
const confirmDelete = document.getElementById("confirm-delete");
const cancelDelete = document.getElementById("cancel-delete");
const newUser = document.getElementById("new-user");
const formAddUser = document.getElementById("addUserForm");

const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPhone = document.getElementById("phone");
const userPassword = document.getElementById("password");
const userStatus = document.getElementById("status_user");
const userType = document.getElementById("type_user");

var messageUser;

formAddUser.addEventListener("submit", function (event) {
   event.preventDefault();

   if (userName.value.trim() == "") {
      messageUser = "Nome é obrigatório!";
   } else {
      if (userEmail.value.trim() == "") {
         messageUser = "Email é obrigatório!";
      }
   }

   if (!messageUser == "") {
      notie.alert({ type: "error", position: "bottom", text: messageUser });
      messageUser = "";
      userName.focus();
   } else {
      addUser();
   }

   // document.getElementById("status_user").disabled = false;
   // document.getElementById("type_user").disabled = false;
});

async function addUser() {
   const user = JSON.stringify({
      username: userName.value,
      email: userEmail.value,
      phone_number: userPhone.value.replace(/[\(\)\-\s]/g, ""),
      password: userPassword.value,
      type_user_id: userType.value,
      status_user_id: userStatus.value,
   });

   const response = await fetch("/users", {
      method: "POST",
      body: user,
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenID}`,
      },
   });

   if (response.ok) {
      const data = await response.json();
      $("#addUserModal").modal("hide");
      fetchUsers();
      notie.alert({ type: "success", text: data.message });
   } else {
      const data = await response.json();
      notie.alert({ type: "error", text: data.error });
   }
}

const fetchUsers = async () => {
   const response = await fetch("/users", {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenID}`,
      },
   });

   const result = await response.json();

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   // Criando a tabela
   var table = document.createElement("table");
   table.className = "table table-striped";

   // Cabeçalho da tabela
   var thead = table.createTHead();
   var headerRow = thead.insertRow();
   var headers = ["Nome", "E-mail", "Status", "Perfil", "Ações"];
   headers.forEach(function (headerText) {
      var th = document.createElement("th");
      th.appendChild(document.createTextNode(headerText));
      headerRow.appendChild(th);
   });

   // Saída de dados de cada linha

   await result.forEach(function (rowData) {
      var row = table.insertRow();

      var usernameCell = row.insertCell();
      usernameCell.textContent = rowData.username;

      var emailCell = row.insertCell();
      emailCell.textContent = rowData.email;

      var statusCell = row.insertCell();
      statusCell.textContent = rowData.status_user;

      var typeCell = row.insertCell();
      typeCell.textContent = rowData.type_user;

      var actionsCell = row.insertCell();
      var dropdown = document.createElement("div");
      dropdown.className = "dropdown";

      var dropdownButton = document.createElement("button");
      dropdownButton.className = "btn btn-outline-primary dropdown-toggle";
      dropdownButton.setAttribute("type", "button");
      dropdownButton.setAttribute("id", "dropdownMenu");
      dropdownButton.setAttribute("data-toggle", "dropdown");
      dropdownButton.setAttribute("aria-haspopup", "true");
      dropdownButton.setAttribute("aria-expanded", "false");
      dropdownButton.textContent = "Ações";

      var dropdownMenu = document.createElement("div");
      dropdownMenu.className = "dropdown-menu dropdown-menu-dark";
      dropdownMenu.setAttribute("aria-labelledby", "dropdownMenu");

      var userUpdateButton = document.createElement("button");
      userUpdateButton.id = "user-update";
      userUpdateButton.className = "userUpdate dropdown-item";
      userUpdateButton.setAttribute("type", "button");
      userUpdateButton.innerHTML = "<i class='color-blue fa fa-edit'></i> Alterar";

      // Adicionando o evento de clique ao botão de atualização de usuário
      userUpdateButton.addEventListener("click", function () {
         const userID = rowData.id; // Usando rowData.id diretamente, já que você já está iterando sobre os dados

         window.location.href = "./profile.html?userID=" + userID;
      });

      var userDeleteButton = document.createElement("button");
      userDeleteButton.id = "user-delete";
      userDeleteButton.className = "userDelete dropdown-item";
      userDeleteButton.setAttribute("type", "button");
      userDeleteButton.innerHTML = "<i class='color-red fa fa-remove'></i> Excluir";

      userDeleteButton.addEventListener("click", function () {
         deleteUser(rowData.id);
      });

      dropdownMenu.appendChild(userUpdateButton);
      dropdownMenu.appendChild(userDeleteButton);
      dropdown.appendChild(dropdownButton);
      dropdown.appendChild(dropdownMenu);
      actionsCell.appendChild(dropdown);
   });

   // Adicionando a tabela ao elemento container
   var tableContainer = document.getElementById("list-users");
   tableContainer.innerHTML = "";
   tableContainer.appendChild(table);
};

fetchUsers();

async function deleteUser(userId) {
   messageUser = "Deseja realmente excluir o usuário selecionado?";

   modalDelete.textContent = messageUser;
   $("#modal-delete").modal("show");

   confirmDelete.addEventListener("click", async function () {
      const response = await fetch(`/users/${userId}`, {
         method: "DELETE",
         headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tokenID}`,
         },
      });

      if (response.ok) {
         const data = await response.json();
         notie.alert({ type: "success", text: data.message });
         setTimeout(() => {
            fetchUsers();
         }, 1000);
      } else {
         const data = await response.json();
         notie.alert({ type: "error", text: data.error });
      }
   });
}

const getStatusUser = async (status) => {
   const response = await fetch("/statusUser_All", {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenID}`,
      },
   });

   const result = await response.json();

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   result.forEach(function (rowData) {
      var option = document.createElement("option");
      option.setAttribute("value", rowData.id);
      option.textContent = rowData.status;
      userStatus.appendChild(option);
   });
};

const getTypeUser = async (typeUser) => {
   const resp = await fetch("/typeUser_All", {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   const res = await resp.json();

   if (!resp.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   res.forEach(function (row) {
      var opt = document.createElement("option");
      opt.setAttribute("value", row.id);
      opt.textContent = row.type_user;
      userType.appendChild(opt);
   });
};

newUser.addEventListener("click", async () => {
   await getTypeUser();
   await getStatusUser();
   $("#addUserModal").modal("show");
   userName.focus();
});

$(document).ready(function () {
   $("#addUserModal").on("shown.bs.modal", function () {
      userName.focus();
   });
});
