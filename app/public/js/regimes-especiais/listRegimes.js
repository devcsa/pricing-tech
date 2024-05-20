const tokenID = localStorage.getItem("tokenPT");

var filter = "";

const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
const formatNumber = new Intl.NumberFormat("pt-BR", options);

function formatarPercentual(percentual) {
   if (percentual == 0) return "0,00%";
   // let pctInput = parseFloat(percentual.replace(",", ".").replace("%", "")) / 100;
   return formatNumber.format(percentual * 100) + "%";
}

const fetchRegimes = async () => {
   const response = await fetch("/regimes_All", {
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

   await initTable(result);
   addFiltersTable();
};

async function initTable(impostos) {
   $("#table")
      .bootstrapTable("destroy")
      .bootstrapTable({
         locale: "pt-br",
         resizable: "true",
         data: impostos.map(function (rowData) {
            return {
               id: rowData.id,
               origem_destino: rowData.origem + " / " + rowData.destino,
               micro_regiao: rowData.micro_regiao,
               segmento: rowData.segmento,
               commodity: rowData.commodity,
               ncm: rowData.ncm,
               tipo_produto: rowData.tipo_produto,
               cesta_basica: rowData.cesta_basica,
               pct_antecipacao: formatarPercentual(rowData.pct_antecipacao),
               vira_custo: rowData.vira_custo,
               pct_credito_presumido: formatarPercentual(rowData.pct_credito_presumido),
               bc_credito_presumido_st_cliente: rowData.bc_credito_presumido_st_cliente,
               capturar_beneficio_fiscal_cliente: rowData.capturar_beneficio_fiscal_cliente,
               red_icms: rowData.red_icms,
               credito_icms: rowData.credito_icms,
               pct_limite_credito_icms: formatarPercentual(rowData.pct_limite_credito_icms),
               substituto: rowData.substituto,
               mva_receita_liquida: rowData.mva_receita_liquida,
               mva_estadual: rowData.mva_estadual,
               origem_destino_estadual_id: rowData.origem_destino_estadual_id,
               origem_destino_estadual: rowData.origem_destino_estadual,
               ajustar_mva: rowData.ajustar_mva,
               mva_exclusivo: rowData.mva_exclusivo,
               reducao_icms_bc_pis_cofins: rowData.reducao_icms_bc_pis_cofins,
               reducao_icms_interno_va_at: rowData.reducao_icms_interno_va_at,
               reducao_icms_saida_va_at: rowData.reducao_icms_saida_va_at,
               reducao_bc_st_cliente: rowData.reducao_bc_st_cliente,
               reducao_icms_st_cliente: rowData.reducao_icms_st_cliente,
               estorno_icms_va_at: rowData.estorno_icms_va_at,
               pct_estorno_icms_va_at: formatarPercentual(rowData.pct_estorno_icms_va_at),
               calcular_icms_saida__pv: rowData.calcular_icms_saida__pv,
               pct_carga_efetiva_icms: formatarPercentual(rowData.pct_carga_efetiva_icms),
               decreto_base_legal: rowData.decreto_base_legal,
               created_at: rowData.created_at,
               updated_at: rowData.updated_at,
            };
         }),
         columns: [
            [
               {
                  field: "id",
                  visible: false,
               },
               // {
               //    field: "",
               //    checkbox: true,
               //    align: "center",
               //    valign: "middle",
               // },
               {
                  field: "operate",
                  title: "Ações",
                  align: "center",
                  class: "btn-action-delete",
                  // clickToSelect: false,
                  events: window.operateEvents,
                  formatter: operateFormatter,
               },

               {
                  title: "Origem / Destino",
                  field: "origem_destino",
                  align: "left",
                  sortable: true,
                  valign: "middle",
                  width: "100",
                  visible: true,
                  class: "origem-destino",
               },
               {
                  title: "Micro Região",
                  field: "micro_regiao",
                  align: "center",
                  sortable: true,
                  valign: "middle",
                  width: "40",
                  visible: true,
                  class: "ajustar-coluna",
               },

               {
                  title: "Segmento",
                  field: "segmento",
                  align: "left",
                  sortable: true,
                  valign: "middle",
                  width: "100",
                  visible: true,
                  class: "segmento-regime",
               },

               {
                  title: "Commodity",
                  field: "commodity",
                  align: "left",
                  sortable: true,
                  valign: "middle",
                  width: "40",
                  visible: true,
               },

               {
                  title: "NCM",
                  field: "ncm",
                  align: "left",
                  sortable: true,
                  valign: "middle",
                  width: "100",
                  visible: true,
               },

               {
                  title: "Origem",
                  field: "tipo_produto",
                  align: "center",
                  sortable: true,
                  valign: "middle",
                  width: "40",
                  visible: true,
               },

               {
                  title: "Cesta Básica",
                  field: "cesta_basica",
                  align: "center",
                  valign: "middle",
                  width: "40",
                  visible: true,
               },

               {
                  title: "% Antecipação",
                  field: "pct_antecipacao",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "Vira Custo?",
                  field: "vira_custo",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "% Crédito Presumido",
                  field: "pct_credito_presumido",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "BC Crédito Presumido ST Cliente?",
                  field: "bc_credito_presumido_st_cliente",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
                  class: "ajustar-coluna",
               },

               {
                  title: "Capturar Benefício Fiscal Cliente?",
                  field: "capturar_beneficio_fiscal_cliente",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
                  class: "ajustar-coluna",
               },

               {
                  title: "Red. ICMS?",
                  field: "red_icms",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "Crédito ICMS?",
                  field: "credito_icms",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },
               {
                  title: "% Limite Crédito ICMS",
                  field: "pct_limite_credito_icms",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "Substituto?",
                  field: "substituto",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "MVA Receita Líquida?",
                  field: "mva_receita_liquida",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "MVA Estadual?",
                  field: "mva_estadual",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  field: "origem_destino_estadual_id",
                  visible: false,
               },

               {
                  title: "Origem Destino",
                  field: "origem_destino_estadual",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: false,
               },

               {
                  title: "Ajustar MVA?",
                  field: "ajustar_mva",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },
               {
                  title: "MVA Exclusivo?",
                  field: "mva_exclusivo",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "Redução % ICMS BC Pis/Cofins?",
                  field: "reducao_icms_bc_pis_cofins",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
                  class: "ajustar-coluna",
               },

               {
                  title: "Redução % ICMS Interno VA/AT?",
                  field: "reducao_icms_interno_va_at",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
                  class: "ajustar-coluna",
               },

               {
                  title: "Redução % ICMS Saída VA/AT?",
                  field: "reducao_icms_saida_va_at",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
                  class: "ajustar-coluna",
               },

               {
                  title: "Redução BC ST Cliente?",
                  field: "reducao_bc_st_cliente",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "Redução % ICMS ST Cliente?",
                  field: "reducao_icms_st_cliente",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
                  class: "ajustar-coluna",
               },

               {
                  title: "Estorno ICMS VA/AT?",
                  field: "estorno_icms_va_at",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
                  class: "ajustar-coluna",
               },
               {
                  title: "% Estorno ICMS VA/AT",
                  field: "pct_estorno_icms_va_at",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "Calcular ICMS Saída PV?",
                  field: "calcular_icms_saida_pv",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "% Carga Efetiva ICMS",
                  field: "pct_carga_efetiva_icms",
                  align: "center",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "Decreto / Base Legal",
                  field: "decreto_base_legal",
                  align: "center",
                  valign: "middle",
                  width: "200",
                  visible: false,
               },

               // {
               //    title: "created_at",
               //    field: "created_at",
               //    align: "center",
               //    valign: "middle",
               //    width: "50",
               //    visible: false,
               // },

               // {
               //    title: "updated_at",
               //    field: "updated_at",
               //    align: "center",
               //    valign: "middle",
               //    width: "50",
               //    visible: false,
               // },
            ],
         ],
      });
}

function operateFormatter(value, row, index) {
   return ['<a class="remove" href="javascript:void(0)" title="Excluir">', '<i class="fa fa-trash"></i>', "</a>"].join("");
}

window.operateEvents = {
   "click .remove": function (e, value, row, index) {
      bootbox.confirm({
         title: "Aviso",
         message: "Deseja realmente excluir?",
         // size: "small",
         buttons: {
            cancel: {
               label: "Cancelar",
               className: "btn-secondary bootbox-accept",
            },
            confirm: {
               label: "Excluir",
               className: "btn-danger",
            },
         },
         callback: async function (excluir) {
            if (excluir) {
               try {
                  $("#table").bootstrapTable("remove", {
                     field: "id",
                     values: [row.id],
                  });

                  //let distributor = new Distributor(row.id);

                  // código faltante

                  //distributor.deleteDistributor(row.id);

                  alertMessage("Registro excluído com sucesso!");
               } catch (error) {
                  console.error("Erro ao excluir registro:", error);
               }
            }
         },
      });
   },
};

function detailFormatter(index, row) {
   var html = [];
   var descDetalhe;

   $.each(row, function (key, value) {
      if (key == "decreto_base_legal" || key == "origem_destino_estadual") {
         if (key == "origem_destino_estadual") {
            descDetalhe = "Origem Destino";
         }
         if (key == "decreto_base_legal") {
            descDetalhe = "Decreto / Base Legal";
         }

         html.push("<p class='mb-0'><b>" + descDetalhe + ":</b> " + value + "</p>");
      }
   });
   // $.each(row, function (key, value) {
   //    if (!key == "" && key != "id") {
   //       html.push("<p><b>" + key + ":</b> " + value + "</p>");
   //    }
   // });

   return html.join("");
}

function alertMessage(alert_mensagem) {
   document.querySelector("#confirm-confirm").computedStyleMap.display = "none";
   document.getElementById("modal-confirm-message").innerHTML = alert_mensagem;
   document.querySelector("#cancel-confirm").innerHTML = "Fechar";
   document.querySelector(".modal-title").innerHTML = "Aviso";
   $("#tipoMsg").attr("class", "modal-header text-secondary");
   $("#cancel-confirm").attr("class", "btn btn-secondary");

   // Pop up Mensagem Sucesso
   $("#modal-confirm").modal("show");
}

function timestamptodate(timestamp) {
   const date = new Date(timestamp.seconds * 1000);

   const dia = String(date.getDate()).padStart(2, "0");
   const mes = String(date.getMonth() + 1).padStart(2, "0");
   const ano = String(date.getFullYear()).slice(-2);
   const hora = String(date.getHours()).padStart(2, "0");
   const minutos = String(date.getMinutes()).padStart(2, "0");

   // Formatando a data no formato "dd/mm/aa hh:mm"
   const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`;

   return dataFormatada;
}

fetchRegimes();

// Capturando o evento de clique no botão "refresh"
$("#table-regimes").on("click", 'button[name="refresh"]', () => {
   fetchRegimes();
});

function addFiltersTable() {
   const filterOrigemDestino = document.querySelector(".filtros-regimes");

   filterOrigemDestino.innerHTML = `
   <div class="d-flex flex-column col-md-12 px-5 mt-5">
   <h6 class="h6-filtros mb-3">Filtros</h6>
   <div class="d-flex flex-row col-md-3 px-0">
   <div class="d-flex flex-column col-md-12 px-0">
   <label class="label-filtros mb-1" for="origem-destino">Origem / Destino</label>
   <select class="filter-origem-destino" name="filterOrigem" id="filterOrigem">
   <option value="0" selected></option>
   </select>
   </div>
   <div class="d-flex mx-2 align-items-end">
   <button class="btn btn-filter-header" onclick="filtrarOrigem()") type="button" id="filtrar">OK</button>
   </div>
   </div>
   </div>`;

   selectOrigemDestino();
}

const selectOrigemDestino = async () => {
   const resp = await fetch("/origem_destino_All", {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenID}`,
      },
   });

   const res = await resp.json();

   const filterOrigemDestino = document.getElementById("filterOrigem");

   res.forEach(function (row) {
      var option = document.createElement("option");
      option.setAttribute("value", row.id);
      option.textContent = row.origem_destino;
      filterOrigemDestino.appendChild(option);
   });

   $("select").select2({
      placeholder: "",
      selectOnClose: true,
   });

   $(document).on("select2:open", () => {
      document.querySelector(".select2-container--open .select2-search__field").focus();
   });
};

function filtrarOrigem() {
   const filter = document.getElementById("select2-filterOrigem-container");

   let select = filter.getAttribute("title");

   $("#table").bootstrapTable("filterBy", {
      origem_destino: [select],
   });
}
