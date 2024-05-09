const tokenUser = localStorage.getItem("tokenPT");

var origemDestinoId;

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

   var produto = document.getElementById("produto-" + simulation);

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

const fetchMicroRegiao = async (simulation) => {
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

   var micro_regiao = document.getElementById("micro_regiao-" + simulation);

   result.forEach(function (rowData) {
      var option = document.createElement("option");
      option.setAttribute("value", rowData.id);
      option.textContent = rowData.micro_regiao;
      micro_regiao.appendChild(option);
   });
};

const fetchSegmento = async (simulation) => {
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

   var segmento = document.getElementById("segmento-" + simulation);

   result.forEach(function (rowData) {
      var option = document.createElement("option");
      option.setAttribute("value", rowData.id);
      option.textContent = rowData.segmento;
      segmento.appendChild(option);
   });
};

const fetchProduto = async (simulation) => {
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

   var produto = document.getElementById("produto-" + simulation);

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
      notie.alert({ type: "error", text: "Preço de lista não encontrado!" });
      return;
   }

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   document.getElementById(`${simulation}-price-list`).value = result.preco_unitario;
   document.getElementById(`ncm-${simulation}`).value = result.ncm;
   document.getElementById(`origem-${simulation}`).value = result.tipo_produto;

   calcForm(simulation);
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
      notie.alert({ type: "error", text: "Rota não encontrada!" });
      return;
   }

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   document.getElementById(`${simulation}-pct-margem-at`).value = result.pct_margem;
   document.getElementById(`${simulation}-pct-markup-pv`).value = result.pct_markup;

   calcForm(simulation);
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

   calcForm(simulation);
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
      notie.alert({ type: "error", text: "Origem Destino não encontrada!" });
      return;
   }

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   var rota = result.origem + " / " + result.destino;

   await getOrigemDestino(rota, simulation);
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

   var origemDestino = document.getElementById("origem-destino-" + simulation);

   res.forEach(function (row) {
      var option = document.createElement("option");
      option.setAttribute("value", row.id);
      option.textContent = row.origem_destino;
      origemDestino.appendChild(option);

      if (row.origem_destino === rota) {
         option.selected = true;
         option.style.fontWeight = "bold";
         option.style.color = "green";
         origemDestinoId = row.id;
      }
   });

   fetchImpostos(origemDestinoId, simulation);
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

   document.getElementById(`${simulation}-pct-pis-cofins`).value = result.pct_pis_cofins * 100;
   document.getElementById(`${simulation}-pct-pis-cofins-at`).value = result.pct_pis_cofins * 100;
   document.getElementById(`${simulation}-pct-pis-cofins-pv`).value = result.pct_pis_cofins * 100;
   document.getElementById(`${simulation}-pct-icms`).value = result.pct_icms_operacao * 100;
   document.getElementById(`${simulation}-pct-ipi`).value = result.pct_ipi * 100;
   document.getElementById(`${simulation}-pct-icms-saida-pv`).value = result.pct_icms_interno * 100;

   calcForm(simulation);
};
