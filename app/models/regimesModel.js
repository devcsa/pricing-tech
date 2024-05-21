const con = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      con.query(
         "SELECT regimes_especiais.*, origem_destino.origem as origem, origem_destino.destino as destino, segmento.segmento AS segmento, micro_regiao.micro_regiao AS micro_regiao, micro_regiao.incentivized_area AS incentivized_area FROM regimes_especiais INNER JOIN origem_destino ON regimes_especiais.origem_destino_id = origem_destino.id INNER JOIN segmento ON regimes_especiais.segmento_id = segmento.id INNER JOIN micro_regiao ON regimes_especiais.micro_regiao_id = micro_regiao.id",
         (err, result) => {
            if (err) {
               reject(`Erro ao recuperar os dados: ${err}`);
            } else {
               resolve(result);
            }
         }
      );
   });
};

const getOne = async (regimes_especiais) => {
   try {
      let regimeExist = await new Promise((resolve, reject) => {
         con.query(
            `SELECT regimes_especiais.*, origem_destino.origem as origem, origem_destino.destino as destino, segmento.segmento AS segmento, micro_regiao.micro_regiao AS micro_regiao, micro_regiao.incentivized_area AS incentivized_area FROM regimes_especiais INNER JOIN origem_destino ON regimes_especiais.origem_destino_id = origem_destino.id INNER JOIN segmento ON regimes_especiais.segmento_id = segmento.id INNER JOIN micro_regiao ON regimes_especiais.micro_regiao_id = micro_regiao.id WHERE regimes_especiais.origem_destino_id = ${regimes_especiais.origem_destino_id} AND regimes_especiais.segmento_id = ${regimes_especiais.segmento_id} AND regimes_especiais.ncm = '${regimes_especiais.ncm}' AND regimes_especiais.tipo_produto = '${regimes_especiais.tipo_produto}' AND regimes_especiais.cesta_basica = '${regimes_especiais.cesta_basica}'`,
            (err, result) => {
               if (err) {
                  reject(`Erro ao localizar regimes especiais: ${err}`);
               } else {
                  resolve(result.length > 0 ? result[0] : null);
               }
            }
         );
      });

      if (regimeExist) {
         return regimeExist;
      }

      let regimeExistCesta = await new Promise((resolve, reject) => {
         con.query(
            `SELECT regimes_especiais.*, origem_destino.origem as origem, origem_destino.destino as destino, segmento.segmento AS segmento, micro_regiao.micro_regiao AS micro_regiao, micro_regiao.incentivized_area AS incentivized_area FROM regimes_especiais INNER JOIN origem_destino ON regimes_especiais.origem_destino_id = origem_destino.id INNER JOIN segmento ON regimes_especiais.segmento_id = segmento.id INNER JOIN micro_regiao ON regimes_especiais.micro_regiao_id = micro_regiao.id WHERE regimes_especiais.origem_destino_id = ${regimes_especiais.origem_destino_id} AND regimes_especiais.segmento_id = ${regimes_especiais.segmento_id} AND regimes_especiais.ncm = 'TODOS' AND regimes_especiais.tipo_produto = 'TODOS' AND regimes_especiais.cesta_basica = '${regimes_especiais.cesta_basica}'`,
            (err, result) => {
               if (err) {
                  reject(`Erro ao localizar regimes especiais: ${err}`);
               } else {
                  resolve(result.length > 0 ? result[0] : null);
               }
            }
         );
      });

      if (regimeExistCesta) {
         return regimeExistCesta;
      }

      let regimeExistOrigem = await new Promise((resolve, reject) => {
         con.query(
            `SELECT regimes_especiais.*, origem_destino.origem as origem, origem_destino.destino as destino, segmento.segmento AS segmento, micro_regiao.micro_regiao AS micro_regiao, micro_regiao.incentivized_area AS incentivized_area FROM regimes_especiais INNER JOIN origem_destino ON regimes_especiais.origem_destino_id = origem_destino.id INNER JOIN segmento ON regimes_especiais.segmento_id = segmento.id INNER JOIN micro_regiao ON regimes_especiais.micro_regiao_id = micro_regiao.id WHERE regimes_especiais.origem_destino_id = ${regimes_especiais.origem_destino_id} AND regimes_especiais.segmento_id = ${regimes_especiais.segmento_id} AND regimes_especiais.ncm = 'TODOS' AND regimes_especiais.tipo_produto = '${regimes_especiais.tipo_produto}' AND regimes_especiais.cesta_basica = 'TODOS'`,
            (err, result) => {
               if (err) {
                  reject(`Erro ao localizar regimes especiais: ${err}`);
               } else {
                  resolve(result.length > 0 ? result[0] : null);
               }
            }
         );
      });

      if (regimeExistOrigem) {
         return regimeExistOrigem;
      }

      let regimeExistNCM = await new Promise((resolve, reject) => {
         con.query(
            `SELECT regimes_especiais.*, origem_destino.origem as origem, origem_destino.destino as destino, segmento.segmento AS segmento, micro_regiao.micro_regiao AS micro_regiao, micro_regiao.incentivized_area AS incentivized_area FROM regimes_especiais INNER JOIN origem_destino ON regimes_especiais.origem_destino_id = origem_destino.id INNER JOIN segmento ON regimes_especiais.segmento_id = segmento.id INNER JOIN micro_regiao ON regimes_especiais.micro_regiao_id = micro_regiao.id WHERE regimes_especiais.origem_destino_id = ${regimes_especiais.origem_destino_id} AND regimes_especiais.segmento_id = ${regimes_especiais.segmento_id} AND regimes_especiais.ncm = '${regimes_especiais.ncm}' AND regimes_especiais.tipo_produto = 'TODOS' AND regimes_especiais.cesta_basica = 'TODOS'`,
            (err, result) => {
               if (err) {
                  reject(`Erro ao localizar regimes especiais: ${err}`);
               } else {
                  resolve(result.length > 0 ? result[0] : null);
               }
            }
         );
      });

      if (regimeExistNCM) {
         return regimeExistNCM;
      }

      let regimeExistAll = await new Promise((resolve, reject) => {
         con.query(
            `SELECT regimes_especiais.*, origem_destino.origem as origem, origem_destino.destino as destino, segmento.segmento AS segmento, micro_regiao.micro_regiao AS micro_regiao, micro_regiao.incentivized_area AS incentivized_area FROM regimes_especiais INNER JOIN origem_destino ON regimes_especiais.origem_destino_id = origem_destino.id INNER JOIN segmento ON regimes_especiais.segmento_id = segmento.id INNER JOIN micro_regiao ON regimes_especiais.micro_regiao_id = micro_regiao.id WHERE regimes_especiais.origem_destino_id = ${regimes_especiais.origem_destino_id} AND regimes_especiais.segmento_id = ${regimes_especiais.segmento_id} AND regimes_especiais.ncm = 'TODOS' AND regimes_especiais.tipo_produto = 'TODOS' AND regimes_especiais.cesta_basica = 'TODOS'`,
            (err, result) => {
               if (err) {
                  reject(`Erro ao localizar regimes especiais: ${err}`);
               } else {
                  resolve(result.length > 0 ? result[0] : null);
               }
            }
         );
      });

      if (regimeExistAll) {
         return regimeExistAll;
      }

      return null;
   } catch (error) {
      throw new Error(error);
   }
};

const findOne = async (id) => {
   return new Promise((resolve, reject) => {
      con.query(
         `SELECT regimes_especiais.*, origem_destino.origem as origem, origem_destino.destino as destino, segmento.segmento AS segmento, micro_regiao.micro_regiao AS micro_regiao, micro_regiao.incentivized_area AS incentivized_area FROM regimes_especiais INNER JOIN origem_destino ON regimes_especiais.origem_destino_id = origem_destino.id INNER JOIN segmento ON regimes_especiais.segmento_id = segmento.id INNER JOIN micro_regiao ON regimes_especiais.micro_regiao_id = micro_regiao.id WHERE regimes_especiais.id = ${id}`,
         (err, result) => {
            if (err) {
               reject(`Erro ao recuperar os dados: ${err}`);
            } else {
               resolve(result[0]);
            }
         }
      );
   }).catch((error) => {
      throw new Error(`Erro ao localizar regime especial: ${error}`);
   });
};

module.exports = { getAll, getOne, findOne };
