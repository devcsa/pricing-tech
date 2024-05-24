const tokenUser = localStorage.getItem("tokenPT");

const origem_destino = document.getElementById("origem-destino");
const micro_regiao = document.getElementById("micro-regiao");
const segmento = document.getElementById("segmento");
const origem_destino_estadual = document.getElementById("origem-destino-estadual");
const ncm = document.getElementById("ncm");
const btn_voltar = document.getElementById("btn-voltar");
const decreto_base_legal = document.getElementById("decreto-base-legal");

const options = { minimumFractionDigits: 3, maximumFractionDigits: 3 };

function formatToLocaleString(number) {
   return number.toLocaleString("pt-BR", options);
}

btn_voltar.addEventListener("click", () => {
   window.location.href = "./regimes-lista.html";
});

const getOrigemDestino = async (rota) => {
   const response = await fetch("/origem_destino_All", {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   var option = document.createElement("option");
   option.setAttribute("value", 0);
   origem_destino.appendChild(option);

   result.forEach(function (row) {
      var option = document.createElement("option");
      option.setAttribute("value", row.id);
      option.textContent = row.origem_destino;
      origem_destino.appendChild(option);

      if (rota != undefined) {
         if (row.origem_destino === rota) {
            option.selected = true;
            option.style.fontWeight = "bold";
            option.style.color = "green";
         }
      }
   });
};

const getMicroRegiao = async (microRegiao) => {
   const response = await fetch("/microRegiao_All", {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   var option = document.createElement("option");
   option.setAttribute("value", 0);
   micro_regiao.appendChild(option);

   result.forEach(function (row) {
      var option = document.createElement("option");
      option.setAttribute("value", row.id);
      option.textContent = row.micro_regiao;
      micro_regiao.appendChild(option);

      if (microRegiao != undefined) {
         if (row.micro_regiao == microRegiao) {
            option.selected = true;
            option.style.fontWeight = "bold";
            option.style.color = "green";
         }
      }
   });
};

const getSegmento = async (segmentoRegime) => {
   const response = await fetch("/segmento_All", {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   var option = document.createElement("option");
   option.setAttribute("value", 0);
   segmento.appendChild(option);

   result.forEach(function (row) {
      var option = document.createElement("option");
      option.setAttribute("value", row.id);
      option.textContent = row.segmento;
      segmento.appendChild(option);

      if (segmentoRegime != undefined) {
         if (row.segmento === segmentoRegime) {
            option.selected = true;
            option.style.fontWeight = "bold";
            option.style.color = "green";
         }
      }
   });
};

const getOrigemDestinoEstatdual = async (rotaEstadual) => {
   const response = await fetch("/origem_destino_All", {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   var option = document.createElement("option");
   option.setAttribute("value", 0);
   origem_destino_estadual.appendChild(option);

   result.forEach(function (row) {
      if (row.origem == row.destino) {
         var option = document.createElement("option");
         option.setAttribute("value", row.id);
         option.textContent = row.origem_destino;
         origem_destino_estadual.appendChild(option);

         if (rotaEstadual != undefined) {
            if (row.origem_destino === rotaEstadual) {
               option.selected = true;
               option.style.fontWeight = "bold";
               option.style.color = "green";
            }
         }
      }
   });
};

const gePriceList = async (ncmRegime) => {
   const response = await fetch("/price_list_All", {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   result.forEach(function (row) {
      var option = document.createElement("option");
      option.setAttribute("value", row.ncm);
      option.textContent = row.ncm;
      ncm.appendChild(option);

      if (ncmRegime != undefined) {
         if (row.ncm === ncmRegime) {
            option.selected = true;
            option.style.fontWeight = "bold";
            option.style.color = "green";
         }
      }
   });
};

const editRegime = async (id) => {
   const response = await fetch(`/regimes/${id}`, {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   let rota = result.origem + " / " + result.destino;
   let microRegiao = result.micro_regiao;
   let segmentoRegime = result.segmento;
   let ncmRegime = result.ncm;
   let rotaEstadual = result.origem_destino_estadual;

   document.getElementById("regimeID").value = result.id;
   document.getElementById("commodity").value = result.commodity;
   document.getElementById("tipo-produto").value = result.tipo_produto;
   document.getElementById("cesta-basica").value = result.cesta_basica;
   document.getElementById("pct-antecipacao").value = formatToLocaleString(result.pct_antecipacao * 100) + "%";
   document.getElementById("vira-custo").value = result.vira_custo;
   document.getElementById("pct-credito-presumido").value = formatToLocaleString(result.pct_credito_presumido * 100) + "%";
   document.getElementById("bc-credito-presumido-st-cliente").value = result.bc_credito_presumido_st_cliente;
   document.getElementById("capturar-beneficio-fiscal-cliente").value = result.capturar_beneficio_fiscal_cliente;
   document.getElementById("red-icms").value = result.red_icms;
   document.getElementById("credito-icms").value = result.credito_icms;
   document.getElementById("pct-limite-credito-icms").value = formatToLocaleString(result.pct_limite_credito_icms * 100) + "%";
   document.getElementById("substituto").value = result.substituto;
   document.getElementById("mva-receita-liquida").value = result.mva_receita_liquida;

   const mvaEstadual = document.getElementById("mva-estadual");

   mvaEstadual.addEventListener("change", () => {
      if (mvaEstadual.value == "NÃO") {
         origemDestinoEstadual.value = "";
         origemDestinoEstadual.setAttribute("disabled", "disabled");
      } else {
         origemDestinoEstadual.removeAttribute("disabled");
      }
   });

   const origemDestinoEstadual = document.getElementById("origem-destino-estadual");

   mvaEstadual.value = result.mva_estadual;
   if (mvaEstadual.value == "NÃO") {
      origemDestinoEstadual.setAttribute("disabled", "disabled");
   }

   origemDestinoEstadual.value = result.origem_destino_estadual;
   document.getElementById("ajustar-mva").value = result.ajustar_mva;
   document.getElementById("mva-exclusivo").value = result.mva_exclusivo;
   document.getElementById("reducao-icms-bc-pis-cofins").value = result.reducao_icms_bc_pis_cofins;
   document.getElementById("reducao-icms-interno-va-at").value = result.reducao_icms_interno_va_at;
   document.getElementById("reducao-icms-saida-va-at").value = result.reducao_icms_saida_va_at;
   document.getElementById("reducao-bc-st-cliente").value = result.reducao_bc_st_cliente;
   document.getElementById("reducao-icms-st-cliente").value = result.reducao_icms_st_cliente;
   document.getElementById("estorno-icms-va-at").value = result.estorno_icms_va_at;
   document.getElementById("pct-estorno-icms-va-at").value = formatToLocaleString(result.pct_estorno_icms_va_at * 100) + "%";
   document.getElementById("calcular-icms-saida-pv").value = result.calcular_icms_saida_pv;
   document.getElementById("pct-carga-efetiva-icms").value = formatToLocaleString(result.pct_carga_efetiva_icms * 100) + "%";
   document.getElementById("decreto-base-legal").value = result.decreto_base_legal;
   document.getElementById("status").value = result.status;

   getOrigemDestino(rota);
   getOrigemDestinoEstatdual(rotaEstadual);
   getMicroRegiao(microRegiao);
   getSegmento(segmentoRegime);
   gePriceList(ncmRegime);
};

$(document).ready(function () {
   const params = new URLSearchParams(window.location.search);
   const regimeID = params.get("regimeID");

   if (regimeID) {
      editRegime(regimeID);

      var url = window.location.href;
      var cleanUrl = url.split("?")[0];
      window.history.replaceState({}, document.title, cleanUrl);
   } else {
      getOrigemDestino();
      getMicroRegiao();
      getSegmento();
      getOrigemDestinoEstatdual();
      gePriceList();
   }
});

origem_destino.focus();
