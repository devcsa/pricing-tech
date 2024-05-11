const tokenID = localStorage.getItem("tokenPT");

const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
const formatNumber = new Intl.NumberFormat("pt-BR", options);

const fetchSettingsPrices = async () => {
   const response = await fetch("/settingPrice_All", {
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

async function initTable(prices) {
   $("#table")
      .bootstrapTable("destroy")
      .bootstrapTable({
         locale: "pt-br",
         data: prices.map(function (rowData) {
            let expirationDate;
            if (rowData.expiration_date != null) {
               expirationDate = timestamptodate(rowData.expiration_date);
            } else {
               expirationDate = rowData.expiration_date;
            }
            return {
               id: rowData.id,
               price_name: rowData.price_name,
               discount_name: rowData.discount_name,
               status: rowData.status,
               expiration_date: expirationDate,
            };
         }),
         columns: [
            [
               {
                  field: "id",
                  visible: false,
               },

               {
                  title: "Tipo Preço",
                  field: "price_name",
                  align: "left",
                  sortable: true,
                  valign: "middle",
                  width: "100",
                  visible: true,
               },

               {
                  title: "Descontos",
                  field: "discount_name",
                  align: "left",
                  sortable: true,
                  valign: "middle",
                  width: "200",
                  visible: true,
                  // class: "segmento-margem",
               },

               {
                  title: "Validade",
                  field: "expiration_date",
                  align: "center",
                  sortable: true,
                  valign: "middle",
                  width: "100",
                  visible: false,
               },

               {
                  title: "Status",
                  field: "status",
                  align: "center",
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

fetchSettingsPrices();

// Capturando o evento de clique no botão "refresh"
$("#table-prices").on("click", 'button[name="refresh"]', () => {
   fetchSettingsPrices();
});
