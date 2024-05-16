const tokenID = localStorage.getItem("tokenPT");

const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
const formatNumber = new Intl.NumberFormat("pt-BR", options);

function formatarPercentual(percentual) {
   if (percentual == 0) return "0,00%";
   // let pctInput = parseFloat(percentual.replace(",", ".").replace("%", "")) / 100;
   return formatNumber.format(percentual * 100) + "%";
}

const fetchMargens = async () => {
   showLoading();
   const response = await fetch("/margem_markup_All", {
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
   // tableFields();
};

async function initTable(margens) {
   $("#table")
      .bootstrapTable("destroy")
      .bootstrapTable({
         locale: "pt-br",
         data: margens.map(function (rowData) {
            return {
               id: rowData.id,
               micro_regiao: rowData.micro_regiao,
               segmento: rowData.segmento,
               produto: rowData.produto,
               pct_margem: formatarPercentual(rowData.pct_margem),
               pct_markup: formatarPercentual(rowData.pct_markup),
            };
         }),
         columns: [
            [
               {
                  field: "id",
                  visible: false,
               },

               {
                  title: "Micro Região",
                  field: "micro_regiao",
                  align: "center",
                  sortable: true,
                  valign: "middle",
                  width: "50",
                  visible: true,
               },

               {
                  title: "Segmento",
                  field: "segmento",
                  align: "left",
                  sortable: true,
                  valign: "middle",
                  width: "300",
                  visible: true,
                  class: "segmento-margem",
               },

               {
                  title: "Produto",
                  field: "produto",
                  align: "left",
                  sortable: true,
                  valign: "middle",
                  width: "300",
                  visible: true,
               },

               {
                  title: "% Margem",
                  field: "pct_margem",
                  align: "right",
                  sortable: false,
                  valign: "middle",
                  width: "50",
                  visible: true,
               },
               {
                  title: "% Markup",
                  field: "pct_markup",
                  align: "right",
                  sortable: false,
                  valign: "middle",
                  width: "50",
                  visible: true,
               },
               {
                  field: "operate",
                  title: "Ações",
                  align: "center",
                  class: "btn-action-delete",
                  width: "60",
                  // clickToSelect: false,
                  events: window.operateEvents,
                  formatter: operateFormatter,
               },
            ],
         ],
      });
   hideLoading();
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

fetchMargens();

// Capturando o evento de clique no botão "refresh"
$("#table-impostos").on("click", 'button[name="refresh"]', () => {
   fetchMargens();
});
