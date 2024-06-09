const tokenUser = localStorage.getItem("tokenPT");
var areaIncentivada, creditoPisCofins, ncmProduto, origemProduto, cestaBasica, segmento_id, markup, infosEstaduais, origemDestinoId;

const fetchMicroRegiao = async () => {
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

   var micro_regiao = document.getElementById("micro_regiao");

   result.forEach(function (rowData) {
      var option = document.createElement("option");
      option.setAttribute("value", rowData.id);
      option.textContent = rowData.micro_regiao;
      micro_regiao.appendChild(option);
   });
};

const fetchSegmento = async () => {
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

   var segmento = document.getElementById("segmento");

   result.forEach(function (rowData) {
      var option = document.createElement("option");
      option.setAttribute("value", rowData.id);
      option.textContent = rowData.segmento;
      segmento.appendChild(option);
   });
};

const fetchProduto = async () => {
   const response = await fetch("/produto_All", {
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

   var produto = document.getElementById("produto");
   var optgroup = document.createElement("optgroup");

   var group = "";

   result.forEach(function (rowData) {
      if (group == "") {
         group = rowData.categoria;
         optgroup.setAttribute("label", group);
         produto.appendChild(optgroup);
      } else {
         if (group != rowData.categoria) {
            group = rowData.categoria;
            optgroup = document.createElement("optgroup");
            optgroup.setAttribute("label", group);
            produto.appendChild(optgroup);
         }
      }

      var option = document.createElement("option");
      option.setAttribute("value", rowData.id);
      option.setAttribute("data-product-group", rowData.product_group);
      option.setAttribute("data-category", rowData.categoria);

      // Configurar o textContent com a descrição completa
      var fullText = rowData.cod_produto + "-" + rowData.produto;
      option.textContent = fullText;

      // Adicionar título com descrição completa
      option.setAttribute("title", fullText);

      optgroup.appendChild(option);
   });

   // Adicionar evento change para ajustar o textContent após a seleção
   produto.addEventListener("change", function () {
      var selectedOption = this.options[this.selectedIndex];
      selectedOption.textContent = selectedOption.getAttribute("title").substring(0, 40) + "...";
   });
};

fetchMicroRegiao();
fetchSegmento();
fetchProduto();

const fetchSearchProduto = async (searchProduto, simulation) => {
   const response = await fetch(`/produto_filter/${searchProduto}`, {
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

   var produto = document.getElementById("produto");

   produto.innerHTML = "";
   produto.textContent = searchProduto;
   var event = new MouseEvent("mousedown");
   produto.dispatchEvent(event);

   result.forEach(function (rowData) {
      var option = document.createElement("option");
      option.setAttribute("value", rowData.id);
      option.setAttribute("data-product-group", rowData.product_group);
      option.setAttribute("data-category", rowData.categoria);

      // Configurar o textContent com a descrição completa
      var fullText = rowData.cod_produto + "-" + rowData.produto;
      option.textContent = fullText;

      // Adicionar título com descrição completa
      option.setAttribute("title", fullText);

      produto.appendChild(option);
   });

   // Adicionar evento change para ajustar o textContent após a seleção
   produto.addEventListener("change", function () {
      var selectedOption = this.options[this.selectedIndex];
      selectedOption.textContent = selectedOption.getAttribute("title").substring(0, 40) + "...";
   });
};

const fetchPriceList = async (id, simulation) => {
   const response = await fetch(`/price_list/${id}`, {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (response.status == 404) {
      return { status: response.status };
   }

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   document.getElementById("ncm").value = result.ncm;
   document.getElementById("origem").value = result.tipo_produto;

   document.getElementById(`${simulation}-price-list`).value = result.preco_unitario;
   document.getElementById(`ncm-${simulation}`).value = result.ncm;
   document.getElementById(`origem-${simulation}`).value = result.tipo_produto;

   // document.getElementById(`produto-${simulation}`).value = result.produto;

   ncmProduto = result.ncm;
   origemProduto = result.tipo_produto;

   let data = { ncm: ncmProduto, origem: origemProduto, status: response.status };
   return data;

   // calcForm(simulation);
};

const fetchDiscounts = async (queryString, simulation) => {
   const response = await fetch(`/investiments?${queryString}`, {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (response.status == 404) {
      return { status: response.status };
   }

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   // console.log(result);

   var pctTmiOn = document.getElementById(simulation + "-pct-tmi-on");
   var pctTmiOff = document.getElementById(simulation + "-pct-tmi-off");
   var cva_cliente = document.getElementById("cva-" + simulation);

   cva_cliente.innerHTML = "";
   var cvaOptions = {}; // Objeto para armazenar as opções de cva

   result.forEach(function (tmiRow) {
      if (!cvaOptions.hasOwnProperty(tmiRow.cva)) {
         cvaOptions[tmiRow.cva] = {
            discountType: [],
            pctTmi: [],
         };
      }

      cvaOptions[tmiRow.cva].discountType.push(tmiRow.discount_type);
      cvaOptions[tmiRow.cva].pctTmi.push(tmiRow.pct_total * 100);
   });

   for (let cva in cvaOptions) {
      var option = document.createElement("option");
      option.setAttribute("value", cva);
      option.textContent = cva;
      cva_cliente.appendChild(option);
   }

   // Seleção automática do primeiro cva
   var firstCva = Object.keys(cvaOptions)[0];
   cva_cliente.value = firstCva;
   updatePctValues(cvaOptions[firstCva]);

   cva_cliente.removeAttribute("disabled");

   let data = { status: response.status };
   return data;

   function updatePctValues(cvaData) {
      pctTmiOn.value = "";
      pctTmiOff.value = "";

      for (let i = 0; i < cvaData.discountType.length; i++) {
         let discountType = cvaData.discountType[i];
         let pctTmi = cvaData.pctTmi[i];

         if (discountType === "OFF") {
            pctTmiOff.value += pctTmi + ", ";
         } else {
            pctTmiOn.value += pctTmi + ", ";
         }
      }

      // Remover a vírgula extra no final
      pctTmiOff.value = pctTmiOff.value.slice(0, -2);
      pctTmiOn.value = pctTmiOn.value.slice(0, -2);
   }
};

const fetchDiscountsCva = async (queryString, simulation) => {
   const response = await fetch(`/investiments_cva?${queryString}`, {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (response.status == 404) {
      return { status: response.status };
   }

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   console.log(result);

   var pctTmiOn = document.getElementById(simulation + "-pct-tmi-on");
   var pctTmiOff = document.getElementById(simulation + "-pct-tmi-off");

   pctTmiOff.value = "0,000%";
   pctTmiOn.value = "0,000%";

   result.forEach(function (tmiRow) {
      if (tmiRow.discount_type == "OFF") {
         pctTmiOff.value = tmiRow.pct_total * 100;
      } else {
         pctTmiOn.value = tmiRow.pct_total * 100;
      }
   });
};

const fetchMargem_Markup = async (queryString, simulation) => {
   const response = await fetch(`/margem_markup?${queryString}`, {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (response.status == 404) {
      return { status: response.status };
   }

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   // console.log(result);

   markup = result.pct_markup * 100;
   areaIncentivada = result.incentivized_area;
   creditoPisCofins = result.credito_pis_cofins;

   document.getElementById(`${simulation}-pct-margem-at`).value = result.pct_margem * 100;
   document.getElementById(`${simulation}-pct-markup-pv`).value = markup;

   document.getElementById(`area-incentivada-${simulation}`).value = areaIncentivada;
   document.getElementById("area-incentivada").value = areaIncentivada;

   document.getElementById(`credito-pis-cofins-${simulation}`).value = creditoPisCofins;

   segmento_id = result.segmento_id;

   let data = { segmento_id: segmento_id, status: response.status };
   return data;

   // calcForm(simulation);
};

const fetchEncargoFinanceiro = async (queryString, simulation) => {
   const response = await fetch(`/encargoFinanceiro?${queryString}`, {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (response.status == 404) {
      notie.alert({ type: "error", text: "Encargo Financeiro não encontrada!" });
      return;
   }

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   document.getElementById(`${simulation}-pct-encargo`).value = result.pct_encargo * 100;

   // calcForm(simulation);
};

const fetchRota = async (queryString, simulation) => {
   const response = await fetch(`/rotas?${queryString}`, {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (response.status == 404) {
      return { status: response.status };
   }

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   var rota = result.origem + " / " + result.destino;

   document.getElementById("origem-destino").value = rota;

   let data = { rota: rota, simulation: simulation, status: response.status };
   return data;

   //await getOrigemDestino(rota, simulation);
};

const getOrigemDestino = async (rota, simulation) => {
   const resp = await fetch("/origem_destino_All", {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const res = await resp.json();

   if (!resp.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   var origemDestino = document.getElementById("origem-destino");
   var origemDestinoSimulacao = document.getElementById("origem-destino-" + simulation);

   res.forEach(function (row) {
      // var option = document.createElement("option");
      // option.setAttribute("value", row.id);
      // option.textContent = row.origem_destino;
      // origemDestino.appendChild(option);

      if (row.origem_destino === rota) {
         // option.selected = true;
         // option.style.fontWeight = "bold";
         // option.style.color = "green";
         origemDestinoId = row.id;
         origemDestinoSimulacao.value = rota;
      }
   });

   await fetchImpostos(origemDestinoId, simulation);
};

const fetchImpostos = async (origemDestinoId, simulation) => {
   const tipo_produto = document.getElementById(`origem-${simulation}`);
   const ncm = document.getElementById(`ncm-${simulation}`);

   const queryFilter = {
      tipo_produto: tipo_produto.value,
      ncm: ncm.value,
      origem_destino_id: origemDestinoId,
   };

   const filterString = new URLSearchParams(queryFilter).toString();

   const response = await fetch(`/impostos?${filterString}`, {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (response.status == 404) {
      notie.alert({ type: "error", text: "Impostos não encontrados!" });
      return;
   }

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   const infoImpostos = result;

   document.getElementById(`cesta-basica-${simulation}`).value = result.cesta_basica;

   document.getElementById("cesta-basica").value = result.cesta_basica;

   document.getElementById(`${simulation}-pct-pis-cofins`).value = result.pct_pis_cofins * 100;
   document.getElementById(`${simulation}-pct-pis-cofins-at`).value = result.pct_pis_cofins * 100;
   document.getElementById(`${simulation}-pct-icms`).value = result.pct_icms_operacao * 100;
   document.getElementById(`${simulation}-pct-ipi`).value = result.pct_ipi * 100;

   if (markup != 0) {
      document.getElementById(`${simulation}-pct-pis-cofins-pv`).value = result.pct_pis_cofins * 100;
      document.getElementById(`${simulation}-pct-icms-saida-pv`).value = result.pct_icms_interno * 100;
   }

   cestaBasica = result.cesta_basica;

   await fetchRegimesEspeciais(simulation, infoImpostos);
};

const fetchRegimesEspeciais = async (simulation, infoImpostos) => {
   const queryFilter = {
      tipo_produto: origemProduto,
      ncm: ncmProduto,
      cesta_basica: cestaBasica,
      segmento_id: segmento_id,
      origem_destino_id: origemDestinoId,
   };

   const filterString = new URLSearchParams(queryFilter).toString();

   const response = await fetch(`/regimes?${filterString}`, {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${tokenUser}`,
      },
   });

   const result = await response.json();

   if (response.status == 404) {
      console.log("Regimes especiais não encontrados!");
      calcForm(simulation, undefined, infoImpostos, undefined);
      return { status: response.status };
      // notie.alert({ type: "error", text: "Não há regimes especiais!" });
      // return;
   }

   if (result.mva_estadual == "SIM") {
      const queryEstadual = {
         origem_destino_id: result.origem_destino_estadual_id,
         tipo_produto: infoImpostos.tipo_produto,
         ncm: infoImpostos.ncm,
      };

      const filterEstadual = new URLSearchParams(queryEstadual).toString();

      const res = await fetch(`/impostos?${filterEstadual}`, {
         method: "GET",
         headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tokenUser}`,
         },
      });

      const req = await res.json();

      if (req.status == 404) {
         console.log("Impostos estaduais não encontrados!");
      } else {
         infosEstaduais = req;
         // console.log(infosEstaduais);
      }
   }

   // if (!response.ok) {
   //    notie.alert({ type: "error", text: "Realize login para continuar!" });
   //    setTimeout(() => {
   //       window.location.href = "index.html";
   //    }, 1000);
   // }

   if (response.status == 404) {
      console.log("Regimes especiais não encontrados!");
   } else {
      const infoRegimes = result;

      // console.log(infoRegimes);

      document.getElementById(`${simulation}-pct-regime`).value = result.pct_antecipacao * 100;

      if (result.capturar_beneficio_fiscal_cliente == "SIM") {
         document.getElementById(`${simulation}-pct-credito-presumido`).value = result.pct_credito_presumido * 100;
      }
      calcForm(simulation, infoRegimes, infoImpostos, infosEstaduais);
   }
};
