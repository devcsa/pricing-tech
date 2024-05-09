const priceFormat = (priceTracking) => {
   if (priceTracking.p6m !== undefined) {
      priceTracking.p6m = Number(priceTracking.p6m).toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
   }
   if (priceTracking.p3m !== undefined) {
      priceTracking.p3m = Number(priceTracking.p3m).toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
   }
   if (priceTracking.pm_2 !== undefined) {
      priceTracking.pm_2 = Number(priceTracking.pm_2).toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
   }
   if (priceTracking.pm_1 !== undefined) {
      priceTracking.pm_1 = Number(priceTracking.pm_1).toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
   }
};

const checkCategory = (category) => {
   if (typeof category !== "string" || category.trim() === "") {
      throw new Error("Categoria inválida. Por favor, forneça uma categoria válida.");
   }
};

module.exports = { priceFormat, checkCategory };
