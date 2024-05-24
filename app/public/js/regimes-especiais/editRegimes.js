const tokenID = localStorage.getItem("tokenPT");

const form_origem_destino_id = document.getElementById("origem-destino");
const form_micro_regiao_id = document.getElementById("micro-regiao");
const form_segmento_id = document.getElementById("segmento");
const form_commodity = document.getElementById("commodity");
const form_ncm = document.getElementById("ncm");
const form_tipo_produto = document.getElementById("tipo-produto");
const form_cesta_basica = document.getElementById("cesta-basica");
const form_pct_antecipacao = document.getElementById("pct-antecipacao");
const form_vira_custo = document.getElementById("vira-custo");
const form_pct_credito_presumido = document.getElementById("pct-credito-presumido");
const form_bc_credito_presumido_st_cliente = document.getElementById("bc-credito-presumido-st-cliente");
const form_capturar_beneficio_fiscal_cliente = document.getElementById("capturar-beneficio-fiscal-cliente");
const form_red_icms = document.getElementById("red-icms");
const form_credito_icms = document.getElementById("credito-icms");
const form_pct_limite_credito_icms = document.getElementById("pct-limite-credito-icms");
const form_substituto = document.getElementById("substituto");
const form_mva_receita_liquida = document.getElementById("mva-receita-liquida");
const form_mva_estadual = document.getElementById("mva-estadual");
const form_origem_destino_estadual_id = document.getElementById("origem-destino-estadual");
const form_origem_destino_estadual = document.getElementById("origem-destino-estadual");
const form_ajustar_mva = document.getElementById("ajustar-mva");
const form_mva_exclusivo = document.getElementById("mva-exclusivo");
const form_reducao_icms_bc_pis_cofins = document.getElementById("reducao-icms-bc-pis-cofins");
const form_reducao_icms_interno_va_at = document.getElementById("reducao-icms-interno-va-at");
const form_reducao_icms_saida_va_at = document.getElementById("reducao-icms-saida-va-at");
const form_reducao_bc_st_cliente = document.getElementById("reducao-bc-st-cliente");
const form_reducao_icms_st_cliente = document.getElementById("reducao-icms-st-cliente");
const form_estorno_icms_va_at = document.getElementById("estorno-icms-va-at");
const form_pct_estorno_icms_va_at = document.getElementById("pct-estorno-icms-va-at");
const form_calcular_icms_saida_pv = document.getElementById("calcular-icms-saida-pv");
const form_pct_carga_efetiva_icms = document.getElementById("pct-carga-efetiva-icms");
const form_decreto_base_legal = document.getElementById("decreto-base-legal");
const form_statusRegime = document.getElementById("status");
const form_created_at = document.getElementById("created-at");
const form_updated_at = document.getElementById("updated-at");

var regimesInicio = 0;

const btnSaveRegime = document.getElementById("btn-save-regime");

btnSaveRegime.addEventListener("click", () => {
   let regimeID = document.getElementById("regimeID").value;
   updateRegimes(regimeID);
});

async function updateRegimes(id) {
   let origemDestinoEstadual = origem_destino_estadual.options[origem_destino_estadual.selectedIndex].textContent;
   let pctAntecipacao = (parseFloat(form_pct_antecipacao.value.replace(",", ".").replace("%", "")) / 100).toFixed(4);

   const regimes = JSON.stringify({
      regime_id: Number(id),
      origem_destino_id: Number(form_origem_destino_id.value),
      micro_regiao_id: Number(form_micro_regiao_id.value),
      segmento_id: Number(form_segmento_id.value),
      commodity: form_commodity.value,
      ncm_input: form_ncm.value,
      tipo_produto: form_tipo_produto.value,
      cesta_basica: form_cesta_basica.value,
      pct_antecipacao: Number(pctAntecipacao),
      vira_custo: form_vira_custo.value,
      pct_credito_presumido: Number(parseFloat(form_pct_credito_presumido.value.replace(",", ".").replace("%", "")) / 100),
      bc_credito_presumido_st_cliente: form_bc_credito_presumido_st_cliente.value,
      capturar_beneficio_fiscal_cliente: form_capturar_beneficio_fiscal_cliente.value,
      red_icms: form_red_icms.value,
      credito_icms: form_credito_icms.value,
      pct_limite_credito_icms: Number(parseFloat(form_pct_limite_credito_icms.value.replace(",", ".").replace("%", "")) / 100),
      substituto: form_substituto.value,
      mva_receita_liquida: form_mva_receita_liquida.value,
      mva_estadual: form_mva_estadual.value,
      origem_destino_estadual_id: Number(form_origem_destino_estadual.value),
      origem_destino_estadual: origemDestinoEstadual,
      ajustar_mva: form_ajustar_mva.value,
      mva_exclusivo: form_mva_exclusivo.value,
      reducao_icms_bc_pis_cofins: form_reducao_icms_bc_pis_cofins.value,
      reducao_icms_interno_va_at: form_reducao_icms_interno_va_at.value,
      reducao_icms_saida_va_at: form_reducao_icms_saida_va_at.value,
      reducao_bc_st_cliente: form_reducao_bc_st_cliente.value,
      reducao_icms_st_cliente: form_reducao_icms_st_cliente.value,
      estorno_icms_va_at: form_estorno_icms_va_at.value,
      pct_estorno_icms_va_at: Number(parseFloat(form_pct_estorno_icms_va_at.value.replace(",", ".").replace("%", "")) / 100),
      calcular_icms_saida_pv: form_calcular_icms_saida_pv.value,
      pct_carga_efetiva_icms: Number(parseFloat(form_pct_carga_efetiva_icms.value.replace(",", ".").replace("%", "")) / 100),
      decreto_base_legal: form_decreto_base_legal.value,
      status: form_statusRegime.value,
      created_at: "2024-05-22 15:18:32",
      updated_at: "2024-05-22 15:18:32",
   });

   // console.log(regimes);

   // const queryString = new URLSearchParams(regimes).toString();

   // console.log(queryString);

   const response = await fetch(`/regimes/${id}`, {
      method: "PUT",
      body: regimes,
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenID}`,
      },
   });

   if (response.ok) {
      const data = await response.json();
      notie.alert({ type: "success", text: data.message });
      setTimeout(() => {
         window.location.href = "regimes-lista.html";
      }, 1500);
   } else {
      const data = await response.json();
      notie.alert({ type: "error", text: data.error });
   }
}
