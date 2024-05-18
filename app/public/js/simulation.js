const mainContainer = document.getElementById("container");
const qtde_simulation = document.getElementById("qtde-simulation");
const simulationAdd = document.getElementById("add-simulation");
const simulationFilter = document.getElementById("simulation-number");

const microRegiaoFilter = document.getElementById("micro-regiao-filter");
const produtoFilter = document.getElementById("produto-filter");
const segmentoFilter = document.getElementById("segmento-filter");
const origemDestinoFilter = document.getElementById("origem-destino");
const ncmFilter = document.getElementById("ncm");
const origemFilter = document.getElementById("origem");
const cestaBasicaFilter = document.getElementById("cesta-basica");

var searching = 0;

// $.fn.modal.Constructor.prototype.enforceFocus = function () {};

// document.addEventListener("keypress", (event) => {
//    const tecla = event.keyCode;
//    alert(tecla);
// });

// document.addEventListener("keydown", (event) => {
//    let key = event.code;
//    alert(key);
// });

// // Permitir números, ponto e vírgula
function checkInput(event) {
   const keyCode = event.keyCode;
   if (
      (keyCode >= 48 && keyCode <= 57) || // números de 0 a 9
      keyCode === 46 ||
      keyCode === 44 || // ponto e vírgula
      keyCode === 8 ||
      keyCode === 9 || // backspace e tab
      keyCode === 37 ||
      // keyCode === 39 || // setas esquerda e direita
      keyCode === 190 ||
      keyCode === 188
   ) {
      return true;
   } else {
      event.preventDefault();
      return false;
   }
}

function saveValuesForm(numberSimulation) {
   var valuesSimulation = {};
   const formSimulation = document.getElementById("calcForm-" + numberSimulation);
   for (let i = 0; i < formSimulation.elements.length; i++) {
      const field = formSimulation.elements[i];
      valuesSimulation[field.name] = field.value;
   }

   return valuesSimulation;
}

simulationAdd.addEventListener("click", () => {
   searching = 0;
   let simulation = Number(qtde_simulation.value);

   if (simulation == 0) {
      simulation = 1;
      addSimulation(simulation);
      qtde_simulation.value = simulation;
   } else {
      simulation += 1;
      if (simulation <= 3) {
         qtde_simulation.value = simulation;
         addSimulation(simulation);
      } else {
         notie.alert({ type: "info", text: "Atingido o número máximo de simulações!" });
         return;
      }
   }
});

async function addSimulation(simulation) {
   var newSection = document.createElement("section");
   newSection.setAttribute("id", `simulation-${simulation}`);
   newSection.setAttribute("class", "section-didatico");

   // <i value="${simulation}" onclick="getNumberSimulation(this)" title="Filtrar Rota" class="showFilter bx bx-filter-alt"></i>;

   newSection.innerHTML = `
      <div class="num-simulacao">
         <h6>Simulação ${simulation}</h6>
         <div class="short-cut">
         <i value="${simulation}" onclick="getNumberSimulation(${Number(simulation)})" title="Filtrar Rota" class="showFilter bx bx-filter-alt"></i>
            <i id="export-pdf-${simulation}" title="Exportar PDF Rota" class="bx bxs-file-export"></i>
            <i id="del-simulation-${simulation}" title="Remover Simulação" class="bx bx-list-minus"></i>
         </div>
      </div>

      <input type="hidden" name="micro-regiao-${simulation}" id="micro-regiao-${simulation}" />
      <input type="hidden" name="segmento-${simulation}" id="segmento-${simulation}"/ >
      <input type="hidden" name="produto-${simulation}" id="produto-${simulation}"/ >
      <input type="hidden" name="origem-destino-${simulation}" id="origem-destino-${simulation}" />
      <input type="hidden" name="origem-destino-estadual-${simulation}" id="origem-destino-estadual${simulation}" />
      <input type="hidden" name="ncm-${simulation}" id="ncm-${simulation}" />
      <input type="hidden" name="origem-${simulation}" id="origem-${simulation}" />
      <input type="hidden" name="cesta-basica-${simulation}" id="cesta-basica-${simulation}" />

      <div class="container-didatico">
         <form id="calcForm-${simulation}" class="">
            <div class="">
            <div class="title-metric d-flex row mx-0 row">
               <div class="d-flex justify-content-center" style="max-width: 170px"></div>
               <div class="d-flex justify-content-center text-center align-items-center" style="max-width: 90px">%</div>
               <div class="d-flex justify-content-center text-center align-items-center" style="max-width: 120px">R$</div>
            </div>
            <div class="row div-form ms-0">
               <label for="${simulation}-price-list" class="metric ms-1 col-form-label">Preço Lista</label>
               <div class="pct-metric"></div>
               <input type="text" onkeypress="return checkInput(event)" class="vl-metric mx-1 form-control input-value" id="${simulation}-price-list" value="0,00" name="${simulation}-price-list" />
            </div>
            <div class="row div-form ms-0">
               <label for="${simulation}-pct-encargo" class="metric ms-1 col-form-label">Encargos</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-encargo" name="${simulation}-pct-encargo" value="0,00%" />
               <input type="text" title="Preço Lista * % Encargo" class="vl-metric form-control font-bold" id="${simulation}-vl-encargo" name="${simulation}-vl-encargo" value="0,00" disabled />
            </div>
            <div class="row div-form ms-0">
               <label for="${simulation}-gsv" class="metric ms-1 col-form-label">GSV</label>
               <div class="pct-metric"></div>
               <input type="text" title="GSV = Preço Lista + Valor Encargo" class="vl-metric mx-1 form-control font-bold" id="${simulation}-gsv" name="${simulation}-gsv" value="0,00" disabled />
            </div>
            <div class="row div-form ms-0">
               <label for="${simulation}-pct-tmi-on" class="metric ms-1 col-form-label">% TMI ON</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-tmi-on" name="${simulation}-pct-tmi-on" value="0,000%" />
               <input type="text" title="R$ TMI ON = GSV * % TMI ON" class="vl-metric form-control" id="${simulation}-vl-tmi-on" name="${simulation}-vl-tmi-on" value="0,00" disabled />
            </div>
            <div class="row div-form ms-0">
               <span class="total-metric px-1 mx-0 row">
                  <label for="${simulation}-niv" class="metric col-form-label">NIV</label>
                  <input type="text" title="NIV = GSV (-) Valor TMI ON" class="tt-metric form-control" id="${simulation}-niv" name="${simulation}-niv" value="0,00" disabled />
               </span>
            </div>
            <div class="row div-form ms-0">
               <label for="${simulation}-b-pis-cofins" class="metric ms-1 col-form-label">Base Pis/Cofins</label>
               <div class="pct-metric"></div>
               <input type="text" class="vl-metric mx-1 form-control" id="${simulation}-b-pis-cofins" name="${simulation}-b-pis-cofins" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-pis-cofins" class="metric ms-1 col-form-label">Pis/Cofins</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-pis-cofins" name="${simulation}-pct-pis-cofins" value="0,00%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-pis-cofins" name="${simulation}-vl-pis-cofins" disabled value="0,00" />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-b-icms" class="metric ms-1 col-form-label">Base ICMS</label>
               <div class="pct-metric"></div>
               <input type="text" class="vl-metric mx-1 form-control" id="${simulation}-b-icms" name="${simulation}-b-icms" disabled value="0,00" />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-icms" class="metric ms-1 mx-1col-form-label">ICMS</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-icms" name="${simulation}-pct-icms" value="0,0%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-icms" name="${simulation}-vl-icms" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-vl-mercadoria" class="metric ms-1 col-form-label">Valor Mercadoria</label>
               <div class="pct-metric"></div>
               <input type="text" class="vl-metric mx-1 form-control" id="${simulation}-vl-mercadoria" name="${simulation}-vl-mercadoria" disabled value="0,00" />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-ipi" class="metric ms-1 col-form-label">IPI</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-ipi" name="${simulation}-pct-ipi" value="0,00%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-ipi" name="${simulation}-vl-ipi" disabled value="0,00" />
            </div>

            <div class="row div-form ms-0">
               <span class="total-metric px-1 mx-0 row">
                  <label for="${simulation}-vl-nf-s_icms-st" class="metric col-form-label">NF S/ ICMS-ST</label>
                  <input type="text" class="tt-metric form-control" id="${simulation}-vl-nf-s_icms-st" name="${simulation}-vl-nf-s_icms-st" value="0,00" disabled />
               </span>
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-mva" class="metric ms-1 col-form-label">MVA</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-mva" name="${simulation}-pct-mva" value="0,00%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-base-icms-st" name="${simulation}-vl-base-icms-st" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-icms-st" class="metric ms-1 col-form-label">ICMS-ST</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-icms-st" name="${simulation}-pct-icms-st" value="0,00%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-icms-st" name="${simulation}-vl-icms-st" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <div class="align-items-center total-strong px-1 mx-0 row">
                  <div class="d-flex align-items-center px-0 ms-1" style="max-width: 150px">NF Unilever</div>
                  <input type="text" class="tt-metric form-control ms-1" id="${simulation}-vl-nf-total" name="${simulation}-vl-nf-total" value="0,00" disabled />
               </div>
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-regime" class="metric ms-1 col-form-label">Regime Estado</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-regime" name="${simulation}-pct-regime" value="0,00%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-regime" name="${simulation}-vl-regime" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-tmi-off" class="metric ms-1 col-form-label">TMI OFF</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-tmi-off" name="${simulation}-pct-tmi-off" value="0,000%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-tmi-off" name="${simulation}-vl-tmi-off" disabled value="0,00" />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-cred-pis-cofins" class="metric ms-1 col-form-label">Crédito Pis/Cofins</label>
               <div class="pct-metric"></div>
               <input type="text" class="vl-metric mx-1 form-control" id="${simulation}-cred-pis-cofins" name="${simulation}-cred-pis-cofins" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-cred-presumido" class="metric ms-1 col-form-label">Crédito Presumido</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-credito-presumido" name="${simulation}-pct-credito-presumido" value="0,000%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-cred-presumido" name="${simulation}-cred-presumido" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-cred-icms" class="metric ms-1 col-form-label">Crédito ICMS</label>
               <div class="pct-metric"></div>
               <input type="text" class="vl-metric mx-1 form-control" id="${simulation}-cred-icms" name="${simulation}-cred-icms" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-total-cred-icms" class="metric ms-1 col-form-label">Total Crédito ICMS</label>
               <div class="pct-metric"></div>
               <input type="text" class="vl-metric mx-1 form-control" id="${simulation}-total-cred-icms" name="${simulation}-total-cred-icms" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-custo-antes-st" class="metric ms-1 col-form-label">Custo Antes da ST</label>
               <div class="pct-metric"></div>
               <input type="text" class="vl-metric mx-1 form-control" id="${simulation}-custo-antes-st" name="${simulation}-custo-antes-st" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-margem-at" class="font-bold metric ms-1 col-form-label">Margem</label>
               <input type="text" onkeypress="return checkInput(event)" class="font-bold pct-metric mx-1 form-control input-value" id="${simulation}-pct-margem-at" name="${simulation}-pct-margem-at" value="0,0%" />
               <input type="text" class="font-bold vl-metric form-control" id="${simulation}-vl-margem-at" name="${simulation}-vl-margem-at" disabled value="0,00" />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-receita-liquida-at" class="metric ms-1 col-form-label">Receita Líquida</label>
               <div class="pct-metric"></div>
               <input type="text" class="vl-metric mx-1 form-control" id="${simulation}-receita-liquida-at" name="${simulation}-receita-liquida-at" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-pis-cofins-at" class="metric ms-1 col-form-label">Pis/Cofins</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-pis-cofins-at" name="${simulation}-pct-pis-cofins-at" value="0,00%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-pis-cofins-at" name="${simulation}-vl-pis-cofins-at" disabled value="0,00" />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-icms-saida" class="metric ms-1 col-form-label">ICMS Saída</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-icms-saida" name="${simulation}-pct-icms-saida" value="0,0%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-icms-saida" name="${simulation}-vl-icms-saida" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-estorno" class="metric ms-1 col-form-label">Estorno</label>
               <div class="pct-metric"></div>
               <input type="text" class="vl-metric mx-1 form-control" id="${simulation}-estorno" name="${simulation}-estorno" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-mva-at" class="metric ms-1 col-form-label">MVA Cliente</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-mva-at" name="${simulation}-pct-mva-at" value="0,00%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-base-icms-st-at" name="${simulation}-vl-base-icms-st-at" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-icms-st-at" class="metric ms-1 col-form-label">ICMS-ST Cliente</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-icms-st-at" name="${simulation}-pct-icms-st-at" value="0,00%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-icms-st-at" name="${simulation}-vl-icms-st-at" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <div class="align-items-center total-strong px-1 mx-0 row">
                  <div class="d-flex align-items-center px-0 ms-1" style="max-width: 150px">Preço Venda VA/AT</div>
                  <input type="text" class="tt-metric form-control ms-1" id="${simulation}-preco-venda-at" name="${simulation}-preco-venda-at" value="0,00" disabled />
               </div>
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-markup-at" class="font-bold metric ms-1 col-form-label">Markup</label>
               <div class="pct-metric"></div>
               <input type="text" class="font-bold vl-metric mx-1 form-control" id="${simulation}-pct-markup-at" name="${simulation}-pct-markup-at" value="0,0%" disabled />
            </div>

            <!-- Formação de Preços Pequeno Varejo - Start -->

            <div class="row div-form ms-0">
               <label for="${simulation}-cred-tributario" class="metric ms-1 col-form-label">Crédito Tributário</label>
               <div class="pct-metric"></div>
               <input type="text" class="vl-metric mx-1 form-control" id="${simulation}-cred-tributario" name="${simulation}-cred-tributario" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-custo-cliente" class="metric ms-1 col-form-label">Custo Cliente</label>
               <div class="pct-metric"></div>
               <input type="text" class="vl-metric mx-1 form-control" id="${simulation}-custo-cliente" name="${simulation}-custo-cliente" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-margem-pv" class="font-bold metric ms-1 col-form-label">Margem PV</label>
               <input type="text" class="font-bold pct-metric mx-1 form-control" id="${simulation}-pct-margem-pv" name="${simulation}-pct-margem-pv" disabled value="0,0%" />
               <input type="text" class="font-bold vl-metric form-control" id="${simulation}-vl-margem-pv" name="${simulation}-vl-margem-pv" disabled value="0,00" />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-receita-liquida-pv" class="metric ms-1 col-form-label">Receita Líquida</label>
               <div class="pct-metric"></div>
               <input type="text" class="vl-metric mx-1 form-control" id="${simulation}-receita-liquida-pv" name="${simulation}-receita-liquida-pv" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-pis-cofins-pv" class="metric ms-1 col-form-label">Pis/Cofins</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-pis-cofins-pv" name="${simulation}-pct-pis-cofins-pv" value="0,00%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-pis-cofins-pv" name="${simulation}-vl-pis-cofins-pv" disabled value="0,00" />
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-icms-saida-pv" class="metric ms-1 col-form-label">ICMS Saída</label>
               <input type="text" onkeypress="return checkInput(event)" class="pct-metric mx-1 form-control input-value" id="${simulation}-pct-icms-saida-pv" name="${simulation}-pct-icms-saida-pv" value="0,0%" />
               <input type="text" class="vl-metric form-control" id="${simulation}-vl-icms-saida-pv" name="${simulation}-vl-icms-saida-pv" value="0,00" disabled />
            </div>

            <div class="row div-form ms-0">
               <div class="align-items-center total-strong px-1 mx-0 row">
                  <div class="d-flex align-items-center px-0 ms-1" style="max-width: 150px">Preço Venda PV</div>
                  <input type="text" class="tt-metric form-control ms-1" id="${simulation}-preco-venda-pv" name="${simulation}-preco-venda-pv" value="0,00" disabled />
               </div>
            </div>

            <div class="row div-form ms-0">
               <label for="${simulation}-pct-markup-pv" class="font-bold metric ms-1 col-form-label">Markup PV</label>
               <div class="pct-metric"></div>
               <input type="text" onkeypress="return checkInput(event)" class="font-bold vl-metric mx-1 form-control input-value" id="${simulation}-pct-markup-pv" name="${simulation}-pct-markup-pv" value="0,0%" />
            </div>
            <!-- Formação de Preços Pequeno Varejo - End -->
         </div>
         </form>
      </div>
   `;

   mainContainer.appendChild(newSection);

   $("select").select2({
      placeholder: "",
      selectOnClose: true,
   });

   $(document).on("select2:open", () => {
      document.querySelector(".select2-container--open .select2-search__field").focus();
   });

   // Função para resetar os campos do formulário
   async function resetForm(simulation) {
      const form = document.getElementById(`calcForm-${simulation}`);
      if (form) {
         form.reset();
      }
   }

   // Adicionando evento de clique para o ícone de exclusão
   const deleteIcon = document.getElementById(`del-simulation-${simulation}`);

   deleteIcon.addEventListener("click", () => {
      let qtdeSimulation = Number(qtde_simulation.value);
      const simulationNumber = parseInt(deleteIcon.id.split("-")[2]);

      if (qtdeSimulation === 2) {
         if (simulationNumber < 2) {
            var Form1 = simulationNumber + 1;
            var newSimulation = saveValuesForm(Form1);
         } else {
            const section = document.getElementById("simulation-" + simulationNumber);
            section.remove();
            qtdeSimulation -= 1;
            qtde_simulation.value = qtdeSimulation;
            return;
         }
      } else {
         if (qtdeSimulation === 1) {
            const section = document.getElementById("simulation-" + simulationNumber);
            section.remove();
            qtdeSimulation -= 1;
            qtde_simulation.value = qtdeSimulation;
            return;
         } else {
            if (simulationNumber === 1) {
               var Form1 = simulationNumber + 1;
               var newSimulation = saveValuesForm(Form1);
               var Form2 = Form1 + 1;
               var newSimulation2 = saveValuesForm(Form2);
            } else if (simulationNumber === 2) {
               var Form1 = simulationNumber - 1;
               var newSimulation = saveValuesForm(Form1);
               var Form2 = simulationNumber + 1;
               var newSimulation2 = saveValuesForm(Form2);
            } else {
               const section = document.getElementById("simulation-" + simulationNumber);
               section.remove();
               qtdeSimulation -= 1;
               qtde_simulation.value = qtdeSimulation;
               return;
            }
         }
      }

      mainContainer.innerHTML = "";

      let sections = (qtdeSimulation -= 1);

      if (sections === 1) {
         addSimulation(1);
         try {
            addValuesSimulation(newSimulation, sections, Form1);
            qtde_simulation.value = sections;
            return;
         } catch (error) {
            console.error("Erro ao adicionar simulação: " + newSimulation, error);
            return;
         }
      } else {
         addSimulation(1);
         try {
            addValuesSimulation(newSimulation, 1, Form1);
         } catch (error) {
            console.error("Erro ao adicionar simulação: " + newSimulation, error);
            return;
         }
         try {
            addSimulation(2);
            addValuesSimulation(newSimulation2, 2, Form2);
            qtde_simulation.value = sections;
         } catch (error) {
            console.error("Erro ao adicionar simulação: " + newSimulation2, error);
            return;
         }
      }
   });

   const exportPDF = document.getElementById(`export-pdf-${simulation}`);

   exportPDF.addEventListener("click", () => {
      var element = document.getElementById(`simulation-${simulation}`);

      let body = document.body;
      let html = document.documentElement;
      let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

      let heightCM = 20;
      html2pdf(element, {
         margin: [1, 1, 1, 1],
         filename: `simulation-${simulation}.pdf`,
         html2canvas: { scale: 2, letterRendering: true },
         jsPDF: {
            orientation: "portrait",
            unit: "cm",
            format: [32, 21],
         },
      }).save();
   });

   const btnFilter = document.getElementById("btn-filter");

   btnFilter.addEventListener("click", () => {
      const selectElement = document.getElementById("produto");
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      const productGroup = selectedOption.getAttribute("data-product-group");
      const category = selectedOption.getAttribute("data-category");

      const microRegiao = document.getElementById("micro_regiao");
      const segmento = document.getElementById("segmento");
      const produto = document.getElementById("produto");

      let produtoSelected = selectElement.options[selectElement.selectedIndex].textContent;
      let microRegiaoOption = microRegiao.options[microRegiao.selectedIndex].textContent;
      let segmentoOption = segmento.options[segmento.selectedIndex].textContent;

      let simulation = simulationFilter.value;

      document.getElementById(`micro-regiao-${simulation}`).value = microRegiaoOption;
      document.getElementById(`segmento-${simulation}`).value = segmentoOption;
      document.getElementById(`produto-${simulation}`).value = produtoSelected;

      const filter = {
         micro_regiao_id: Number(microRegiao.value),
         segmento_id: Number(segmento.value),
         produto_id: Number(produto.value),
         product_group: productGroup,
         category: category,
      };

      // console.log(filter);

      const queryString = new URLSearchParams(filter).toString();

      microRegiaoFilter.value = microRegiaoOption;
      produtoFilter.value = produtoSelected;
      segmentoFilter.value = segmentoOption;

      const getData = async () => {
         await resetForm(simulation);

         const data = await fetchRota(queryString, simulationFilter.value);
         // console.log(data);
         // if (data == undefined) return;

         if (data.status == 404) {
            $("#filterRotaModal").modal("hide");
            notie.alert({ type: "error", text: "Não há rota cadastrada para essa seleção!" });
            setTimeout(() => {
               $("#filterRotaModal").modal("show");
            }, 1000);
            return;
         }
         try {
            const margens = await fetchMargem_Markup(queryString, simulationFilter.value);
            // console.log(margens);

            if (margens.status == 404) {
               $("#filterRotaModal").modal("hide");
               notie.alert({ type: "error", text: "Não há margen/markup cadastrado para essa rota!" });
               setTimeout(() => {
                  $("#filterRotaModal").modal("show");
               }, 2000);
               return;
            }
            try {
               const price = await fetchPriceList(Number(produto.value), simulationFilter.value);
               if (price.status == 404) {
                  await resetForm(simulationFilter.value);
                  $("#filterRotaModal").modal("hide");
                  notie.alert({ type: "error", text: "Não há preço de lista para esse produto!" });
                  setTimeout(() => {
                     $("#filterRotaModal").modal("show");
                  }, 2000);
                  return;
               }

               await fetchEncargoFinanceiro(queryString, simulationFilter.value);
               await getOrigemDestino(data.rota, data.simulation);

               $("#filterRotaModal").modal("hide");
               notie.alert({ type: "success", text: `Simulação ${data.simulation} atualizada com sucesso!` });
            } catch (error) {
               console.error("Erro ao atualizar dados: " + error);
               return;
            }
         } catch (error) {
            console.error("Erro ao atualizar dados: " + error);
            return;
         }
      };

      getData();
   });

   $("select:not(.normal)").each(function () {
      $(this).select2({
         dropdownParent: $(this).parent(),
      });
   });

   initializeSections();
}

function selectRoute(filterNumber) {
   let microRegiao = document.getElementById(`micro-regiao-${filterNumber}`);
   let segmento = document.getElementById(`segmento-${filterNumber}`);
   let produto = document.getElementById(`produto-${filterNumber}`);
   let origemDestino = document.getElementById(`origem-destino-${filterNumber}`);
   let ncm = document.getElementById(`ncm-${filterNumber}`);
   let origemProduto = document.getElementById(`origem-${filterNumber}`);
   let cestaBasica = document.getElementById(`cesta-basica-${filterNumber}`);

   document.getElementById("select2-micro_regiao-container").textContent = microRegiao.value;
   document.getElementById("select2-segmento-container").textContent = segmento.value;
   document.getElementById("select2-produto-container").textContent = produto.value;

   simulationFilter.value = filterNumber;

   microRegiaoFilter.value = microRegiao.value;
   segmentoFilter.value = segmento.value;
   produtoFilter.value = produto.value;
   origemDestinoFilter.value = origemDestino.value;
   ncmFilter.value = ncm.value;
   origemFilter.value = origemProduto.value;
   cestaBasicaFilter.value = cestaBasica.value;

   $("#filterRotaModal").modal("show");
}
