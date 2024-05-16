function showLoading() {
   var bodyLoader = document.getElementById("loader-produtos");
   bodyLoader.classList.add("body-loader");
   loader_bg.classList.remove("loader-wrapper-remove");
   loader_bg.classList.add("loader-wrapper");
}

function hideLoading() {
   var bodyLoader = document.getElementById("loader-produtos");
   var loader_bg = document.getElementById("loader_bg");
   bodyLoader.classList.remove("body-loader");
   loader_bg.classList.add("loader-wrapper-remove");
   loader_bg.classList.remove("loader-wrapper");
}
