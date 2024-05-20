const tokenID = localStorage.getItem("tokenPT");

var filter = "";

const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
const formatNumber = new Intl.NumberFormat("pt-BR", options);

function formatarPercentual(percentual) {
   if (percentual == 0) return "0,00%";
   // let pctInput = parseFloat(percentual.replace(",", ".").replace("%", "")) / 100;
   return formatNumber.format(percentual * 100) + "%";
}

const fetchImpostos = async () => {
   const response = await fetch("/impostos_All", {
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
               ncm: rowData.ncm,
               descricao_ncm: rowData.descricao_ncm,
               pct_mva: formatarPercentual(rowData.pct_mva),
               pct_pis: formatarPercentual(rowData.pct_pis),
               pct_cofins: formatarPercentual(rowData.pct_cofins),
               pct_pis_cofins: formatarPercentual(rowData.pct_pis_cofins),
               pct_icms_operacao: formatarPercentual(rowData.pct_icms_operacao),
               pct_icms_interno: formatarPercentual(rowData.pct_icms_interno),
               pct_icms_interno_original: formatarPercentual(rowData.pct_icms_interno_original),
               pct_mva_original: formatarPercentual(rowData.pct_mva_original),
               pct_mva_exclusivo: formatarPercentual(rowData.pct_mva_exclusivo),
               pct_red_carga_efetiva: formatarPercentual(rowData.pct_red_carga_efetiva),
               pct_icms_interno_efetivo: formatarPercentual(rowData.pct_icms_interno_efetivo),
               pct_ipi: formatarPercentual(rowData.pct_ipi),
               pct_zfm: formatarPercentual(rowData.pct_zfm),
               obs: rowData.obs,
               st_nf: rowData.st_nf,
               pct_bs_red_2: formatarPercentual(rowData.pct_bs_red_2),
               pct_red_icms: formatarPercentual(rowData.pct_red_icms),
               tipo: rowData.tipo,
               commodity: rowData.commodity,
               cest: rowData.cest,
               ncm_tipi: rowData.ncm_tipi,
               cesta_basica: rowData.cesta_basica,
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
                  title: "Commodity",
                  field: "commodity",
                  align: "left",
                  sortable: true,
                  valign: "middle",
                  width: "40",
                  visible: true,
               },

               {
                  title: "Origem / Destino",
                  field: "origem_destino",
                  align: "left",
                  sortable: true,
                  valign: "middle",
                  width: "100",
                  visible: true,
                  class: "origem_destino",
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
                  title: "Desc. NCM",
                  field: "descricao_ncm",
                  align: "left",
                  sortable: true,
                  valign: "middle",
                  width: "200",
                  visible: false,
               },

               {
                  title: "% MVA",
                  field: "pct_mva",
                  align: "right",
                  valign: "middle",
                  width: "50",
               },

               {
                  title: "% Pis/Cofins",
                  field: "pct_pis_cofins",
                  align: "right",
                  valign: "middle",
                  width: "50",
               },

               {
                  title: "% ICMS Operação",
                  field: "pct_icms_operacao",
                  align: "right",
                  valign: "middle",
                  width: "50",
               },

               {
                  title: "% ICMS Interno",
                  field: "pct_icms_interno",
                  align: "right",
                  valign: "middle",
                  width: "50",
               },

               {
                  title: "% ICMS Interno Original", // .substring(0, 30) + "...",
                  field: "pct_icms_interno_original",
                  align: "right",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "% MVA Original",
                  field: "pct_mva_original",
                  align: "right",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "% MVA Exclusivo",
                  field: "pct_mva_exclusivo",
                  align: "right",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "% Red. Carga Efetiva",
                  field: "pct_red_carga_efetiva",
                  align: "right",
                  valign: "middle",
                  width: "50",
                  visible: false,
               },

               {
                  title: "% ICMS Interno Efetiva",
                  field: "pct_icms_interno_efetivo",
                  align: "right",
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "% IPI",
                  field: "pct_ipi",
                  align: "right",
                  valign: "middle",
                  width: "50",
                  visible: false,
               },
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
      if (key == "descricao_ncm" || key == "st_nf" || key == "cest" || key == "cesta_basica" || key == "pct_ipi") {
         if (key == "descricao_ncm") {
            descDetalhe = "Descrição NCM";
         }
         if (key == "pct_ipi") {
            descDetalhe = "% IPI";
         }
         if (key == "st_nf") {
            descDetalhe = "ST NF";
         }
         if (key == "cest") {
            descDetalhe = "CEST";
         }
         if (key == "cesta_basica") {
            descDetalhe = "Cesta Básica";
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

fetchImpostos();

// Capturando o evento de clique no botão "refresh"
$("#table-impostos").on("click", 'button[name="refresh"]', () => {
   fetchImpostos();
});

function addFiltersTable() {
   const filterOrigemDestino = document.querySelector(".filtros-impostos");

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
