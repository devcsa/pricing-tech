const side_bar = document.getElementById("sidebar");

side_bar.innerHTML = `<div class="logo-details">
<i class="bx bx-menu"></i>
<span class="logo_name">Menu</span>
</div>
<ul class="nav-links">
<li class="menu-1">
<a href="home.html?menuActive=menu-1">
<i class="bx bx-store"></i>
<span class="link_name">Home</span>
</a>
<ul class="sub-menu blank">
<li class="li-blank"><a class="link_name" href="home.html?menuActive=menu-1">Home</a></li>
</ul>
</li>
<li class="menu-2">
<div class="iocn-link">
<a class="menu_drop" href="#">
<i class="bx bx-notepad"></i>
<span class="link_name drop_menu">Cadastros</span>
</a>
<i class="bx bxs-chevron-down arrow"></i>
</div>
<ul class="sub-menu">
<span class="link_name">Cadastros</span>
<li><a href="#">Origem / Destino</a></li>
<li><a href="#">Produtos</a></li>
<li><a href="#">Região</a></li>
<li><a href="#">Segmentos</a></li>
</ul>
</li>
<li class="menu-3">
<div class="iocn-link">
<a class="menu_drop" href="#">
<i class='bx bx-line-chart'></i>
<span class="link_name drop_menu">Simuladores</span>
</a>
<i class="bx bxs-chevron-down arrow"></i>
</div>
<ul class="sub-menu">
<span class="link_name">Simuladores</span>
<li><a href="didatic.html?menuActive=menu-3">Didático</a></li>
<li><a href="#">Horizontal</a></li>
<li><a href="#">Multi-Region</a></li>
</ul>
</li>
<li class="menu-4">
<a href="users.html?menuActive=menu-4">
<i class="bx bx-user"></i>
<span class="link_name">Usuários</span>
</a>
<ul class="sub-menu blank">
<li class="li-blank"><a class="link_name" href="users.html?menuActive=menu-4">Usuários</a></li>
</ul>
</li>
<li class="mt-4 menu-5">
<div class="iocn-link">
<a class="menu_drop" href="#">
<i class="bx bx-cog"></i>
<span class="link_name drop_menu">Parametrizações</span>
</a>
<i class="bx bxs-chevron-down arrow"></i>
</div>
<ul class="sub-menu">
<span class="link_name">Parametrizações</a></span>
<li><a href="#">Preços</a></li>
<li><a href="#">Impostos</a></li>
<li><a href="#">Margens e Markups</a></li>
<li><a href="#">Encargos Financeiros</a></li>
<li><a href="#">Lista de Preços</a></li>
<li><a href="#">Rotas</a></li>
</ul>
</li>
<li class="profile">
<div class="profile-details">
<div class="name_job">
<div class="name">Pricing</div>
<div class="job">Tecnologia</div>
</div>
</div>
<i title="Sair" class="bx bx-log-out" id="log_out"></i>
</li>
</ul>`;

$(document).ready(function () {
   const params = new URLSearchParams(window.location.search);
   var menu_active = params.get("menuActive");

   if (menu_active == null) {
      menu_active = "menu-1";
   }

   document.querySelector(`.${menu_active}`).classList.add("menu-active");

   var url = window.location.href;
   var cleanUrl = url.split("?")[0];
   window.history.replaceState({}, document.title, cleanUrl);
});

let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
   arrow[i].addEventListener("click", (e) => {
      arrow.forEach((item) => {
         if (item !== e.target) {
            let parent = item.parentElement.parentElement;
            parent.classList.remove("showMenu");
         }
      });

      let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
      arrowParent.classList.toggle("showMenu");
   });
}

let dropMenu = document.querySelectorAll(".drop_menu");
for (var i = 0; i < dropMenu.length; i++) {
   dropMenu[i].addEventListener("click", (e) => {
      dropMenu.forEach((item) => {
         if (item !== e.target) {
            let parent = item.parentElement.parentElement.parentElement;
            parent.classList.remove("showMenu");
         }
      });

      let menuParent = e.target.parentElement.parentElement.parentElement;
      menuParent.classList.toggle("showMenu");
   });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
sidebarBtn.addEventListener("click", () => {
   sidebar.classList.toggle("close");
});

// let closeBtn = document.querySelector("#btn");
let btnMobile = document.querySelector("#menu-mobile");
let home_header = document.querySelector(".home-header");
const tela = window.innerWidth;

// closeBtn.addEventListener("click", () => {
//    sidebar.classList.toggle("open");

//    menuBtnChange();
// });

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

// // following are the code to change sidebar button(optional)
// function menuBtnChange() {
//    if (sidebar.classList.contains("open")) {
//       closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
//    } else {
//       closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
//    }
// }
