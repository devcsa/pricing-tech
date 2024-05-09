const formatarValores = (simulador) => {
   if (simulador.total_niv !== undefined) {
      simulador.total_niv = Number(simulador.total_niv).toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
      // simulador.total_niv = Math.round(simulador.total_niv).toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
      // simulador.total_niv = Math.round(simulador.total_niv).toLocaleString("pt-BR");
   }
   if (simulador.preco_medio !== undefined) {
      simulador.preco_medio = Number(simulador.preco_medio).toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
      // simulador.preco_medio = simulador.preco_medio.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });
   }
   if (simulador.preco_regular !== undefined) {
      simulador.preco_regular = Number(simulador.preco_regular).toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
      // simulador.preco_regular = simulador.preco_regular.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });
   }
};

const validarCategoria = (nomeCategoria) => {
   // Verifica se a categoria é uma string não vazia
   if (typeof nomeCategoria !== "string" || nomeCategoria.trim() === "") {
      throw new Error("Categoria inválida. Por favor, forneça uma categoria válida.");
   }
};

module.exports = { formatarValores, validarCategoria };
