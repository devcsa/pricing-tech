const side_bar = document.getElementById("sidebar");

side_bar.innerHTML =
   '<div class="title-details">' +
   '<div class="title">Menu</div>' +
   '<i class="bx bx-menu" id="btn"></i>' +
   "</div>" +
   '<ul class="nav-list">' +
   "<li>" +
   '<a href="home.html">' +
   '<i class="bx bx-grid-alt"></i>' +
   '<span class="links_name">Home</span>' +
   "</a>" +
   '<span class="tooltip">Home</span>' +
   "</li>" +
   "<li>" +
   '<a href="#">' +
   '<i class="bx bxs-offer"></i>' +
   '<span class="links_name">Margem Total</span>' +
   "</a>" +
   '<span class="tooltip">Margem Total</span>' +
   "</li>" +
   "<li>" +
   '<a href="didatic.html">' +
   '<i class="bx bx-edit"></i>' +
   '<span class="links_name">Simulador Didático</span>' +
   "</a>" +
   '<span class="tooltip">Simulador Didático</span>' +
   "</li>" +
   "<li>" +
   '<a href="#">' +
   '<i class="bx bx-pie-chart-alt-2"></i>' +
   '<span class="links_name">Análises</span>' +
   "</a>" +
   '<span class="tooltip">Análises</span>' +
   "</li>" +
   "<li>" +
   '<a href="./users.html">' +
   '<i class="bx bx-user"></i>' +
   '<span class="links_name">Usuários</span>' +
   "</a>" +
   '<span class="tooltip">Usuários</span>' +
   "</li>" +
   "<li>" +
   '<a href="#">' +
   '<i class="bx bx-cog"></i>' +
   '<span class="links_name">Configurações</span>' +
   "</a>" +
   '<span class="tooltip">Configurações</span>' +
   "</li>" +
   '<li class="profile">' +
   '<div class="profile-details">' +
   '<div class="name_job">' +
   '<div class="name">Pricing</div>' +
   '<div class="job">Tecnologia</div>' +
   "</div>" +
   "</div>" +
   '<i title="Sair" class="bx bx-log-out" id="log_out"></i>' +
   "</li>" +
   "</ul>";

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let btnMobile = document.querySelector("#menu-mobile");
let home_header = document.querySelector(".home-header");
const tela = window.innerWidth;

closeBtn.addEventListener("click", () => {
   sidebar.classList.toggle("open");
   if (sidebar.classList.contains("open")) {
      home_header.style.width = tela - 250 + "px";
   } else {
      home_header.style.width = tela - 78 + "px";
   }

   menuBtnChange();
});

btnMobile.addEventListener("click", () => {
   if (sidebar.classList.contains("open")) {
      sidebar.classList.toggle("open");
      side_bar.style.display = "none";
   } else {
      closeBtn.style.display = "none";
      side_bar.style.display = "block";
      sidebar.classList.toggle("open");
      menuBtnChange();
   }
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
   if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
   } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
   }
}
