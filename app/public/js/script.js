const log_out = document.getElementById("log_out");
const token = localStorage.getItem("tokenPT");
const fotoPerfil = document.getElementById("fotoPerfil");
const modalTitle = document.getElementById("modal-confirm-label");
var message = document.getElementById("modal-confirm-message");
const btnConfirm = document.getElementById("confirm-confirm");

document.addEventListener("keydown", function (event) {
   if (event.key === "F5" || (event.key === "F5" && event.ctrlKey)) {
      modalTitle.textContent = "Sair do site?";
      message.textContent = "As alterações feitas podem não ser salvas.";
      $("#modal-confirm").modal("show");
      event.preventDefault();
   }
});

btnConfirm.addEventListener("click", () => {
   window.location.href = "home.html";
});

// window.onbeforeunload = function (event) {
//    event.returnValue = "Write something clever here..";
// };

if (!token) window.location.href = "index.html";

let storageString = localStorage.getItem("userData");

let storageData = JSON.parse(storageString);

var id = storageData.id;
let username = storageData.username;
let typeUserId = storageData.type_user_id;
let photoUser = storageData.user_photo;

if (photoUser == null || photoUser == "") {
   fotoPerfil.src = "./img/user.png";
} else {
   fotoPerfil.src = `/uploads/users/${photoUser}`;
   fotoPerfil.setAttribute("name", `${photoUser}`);
}

log_out.addEventListener("click", () => {
   logout();
});

const logout = async () => {
   localStorage.removeItem("userData");
   localStorage.removeItem("tokenPT");

   notie.alert({ type: "success", text: "Logout efetuado com sucesso!" });
   setTimeout(() => {
      window.location.href = "index.html";
   }, 1000);
};

function editProfile() {
   window.location.href = `./profile.html?userID=${id}`;
}
