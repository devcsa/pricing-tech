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

const updateRegimes = async (id, regime) => {
   const query =
      "UPDATE regimes_especiais SET origem_destino_id = ?, micro_regiao_id = ?, segmento_id = ?, commodity = ?, ncm = ?, tipo_produto = ?,  cesta_basica = ?, pct_antecipacao = ?, vira_custo = ?, pct_credito_presumido = ?, bc_credito_presumido_st_cliente = ?,capturar_beneficio_fiscal_cliente = ?, red_icms = ?, credito_icms = ?, pct_limite_credito_icms = ?, substituto = ?, mva_receita_liquida = ?,  mva_estadual = ?, origem_destino_estadual_id = ?, origem_destino_estadual = ?, ajustar_mva = ?, mva_exclusivo = ?, reducao_icms_bc_pis_cofins = ?, reducao_icms_interno_va_at = ?, reducao_icms_saida_va_at = ?, reducao_bc_st_cliente = ?, reducao_icms_st_cliente = ?, estorno_icms_va_at = ?, pct_estorno_icms_va_at = ?, calcular_icms_saida_pv = ?, pct_carga_efetiva_icms = ?, decreto_base_legal = ?, status = ?, created_at = ?, updated_at = ? WHERE id = ?";

   return new Promise((resolve, reject) => {
      con.query(
         query,
         [
            regime.origem_destino_id,
            regime.micro_regiao_id,
            regime.segmento_id,
            regime.commodity,
            regime.ncm_input,
            regime.tipo_produto,
            regime.cesta_basica,
            regime.pct_antecipacao,
            regime.vira_custo,
            regime.pct_credito_presumido,
            regime.bc_credito_presumido_st_cliente,
            regime.capturar_beneficio_fiscal_cliente,
            regime.red_icms,
            regime.credito_icms,
            regime.pct_limite_credito_icms,
            regime.substituto,
            regime.mva_receita_liquida,
            regime.mva_estadual,
            regime.origem_destino_estadual_id,
            regime.origem_destino_estadual,
            regime.ajustar_mva,
            regime.mva_exclusivo,
            regime.reducao_icms_bc_pis_cofins,
            regime.reducao_icms_interno_va_at,
            regime.reducao_icms_saida_va_at,
            regime.reducao_bc_st_cliente,
            regime.reducao_icms_st_cliente,
            regime.estorno_icms_va_at,
            regime.pct_estorno_icms_va_at,
            regime.calcular_icms_saida_pv,
            regime.pct_carga_efetiva_icms,
            regime.decreto_base_legal,
            regime.status,
            regime.created_at,
            regime.updated_at,
            regime.regime_id,
         ],
         (err, result) => {
            if (err) {
               reject(`Erro ao alterar regime especial: ${err}`);
            } else {
               if (result.affectedRows === 0) {
                  reject(`Nenhum registro foi atualizado. Verifique o ID: ${regime.regime_id}`);
               } else {
                  // console.log("Resultado da atualização:", result);
                  resolve({ message: "Regime alterado com sucesso!" });
               }
            }
         }
      );
   }).catch((error) => {
      throw new Error(`Erro ao alterar regime: ${error}`);
   });
};

module.exports = { getAll, getOne, findOne, updateRegimes };
