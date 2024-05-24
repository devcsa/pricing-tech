const notifications = document.querySelector(".notifications");

notifications.innerHTML = `
<a href="#" class="notification">
   <i class="bx bxs-bell"></i>
   <span class="num">1</span>
</a>

<!-- Inicio Notificações -->
<div class="dropdown__wrapper hide dropdown__wrapper--fade-in none">
   <div class="notifications-top">
      <h2>Notificações</h2>
   </div>
   <div class="notification-items">
      <div class="notification-item notification-item--recent">
         <div class="avatar-wrapper">
            <img class="avatar" src="/uploads/users/photo_user-8.png" alt="Betina" />
            <div class="notification-mark"></div>
         </div>
         <span class="notification-item-body">
            <div><h6>Betina Perez</h6></div>
            <div>
               <small><strong>Assunto:</strong> Mudança Regimes Especiais</small>
            </div>
            <time> 6 min atrás </time>
         </span>
      </div>

      <div class="notification-item">
         <div class="avatar-wrapper">
            <img class="avatar" src="/uploads/users/photo_user-9.png" alt="Guilherme" />
         </div>
         <span class="notification-item-body">
            <div><h6>Guilherme Junqueira</h6></div>
            <div>
               <small><strong>Assunto:</strong> Simulador Semanal Disponível</small>
            </div>
            <time> 15 Mai, 2024 </time>
         </span>
      </div>

      <div class="notification-item">
         <div class="avatar-wrapper">
            <img class="avatar" src="/uploads/users/photo_user-9.png" alt="Guilherme" />
         </div>
         <span class="notification-item-body">
            <div><h6>Guilherme Junqueira</h6></div>
            <div>
               <small><strong>Assunto:</strong> Simulador Mensal Disponível</small>
            </div>
            <time> 03 Mai, 2024 </time>
         </span>
      </div>

      <div class="notification-item view-all">
         <a href="#!" class="text-center text-primary py-2">Ver mais</a>
      </div>
   </div>
</div>`;

const dropdown = document.querySelector(".dropdown__wrapper");

notifications.addEventListener("click", () => {
   dropdown.classList.remove("none");
   dropdown.classList.toggle("hide");
});

document.addEventListener("click", (event) => {
   const isClickInsideDropdown = dropdown.contains(event.target);
   const isClicked = notifications.contains(event.target);

   if (!isClickInsideDropdown && !isClicked) {
      dropdown.classList.add("hide");
      dropdown.classList.add("dropdown__wrapper--fade-in");
   }
});
