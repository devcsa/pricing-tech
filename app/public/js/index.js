const token = localStorage.getItem("tokenPT");

if (token) window.location.href = "home.html";

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const formLogin = document.querySelector(".form-login");
const formTitle = document.querySelector(".title");
const userLogin = document.querySelector(".signup-user");
const nameLogin = document.querySelector("#nameLogin");
const btnLogin = document.querySelector("#btn-login");
const showPassword = document.querySelector("#show_password");

showPassword.addEventListener("click", (e) => {
   e.preventDefault();
   showPassword.setAttribute("src", userPassword.getAttribute("type") === "password" ? "./img/icons/eye-off.svg" : "./img/icons/eye.svg");
   userPassword.setAttribute("type", userPassword.getAttribute("type") === "password" ? "text" : "password");
   showPassword.setAttribute("title", showPassword.getAttribute("title") === "Mostrar senha" ? "Ocultar senha" : "Mostrar senha");
});

function showPopUp() {
   var popup = document.getElementById("popup-caps");
   popup.classList.toggle("show");
}

var inputFocus = "";
var statusCaps = "";

userPassword.addEventListener("focus", checkCapsLock);
userPassword.addEventListener("keyup", checkCapsLock);

userPassword.addEventListener("blur", () => {
   isCapsLock = "";
});

function checkCapsLock(event) {
   var isCapsLockOn = event.getModifierState && event.getModifierState("CapsLock");
   // console.log(isCapsLockOn);
   if (isCapsLockOn) {
      statusCaps = "on";
      if (inputFocus != statusCaps) {
         showPopUp();
         setTimeout(() => {
            showPopUp();
         }, 1500);
      }
   }
}

const login = async (event) => {
   event.preventDefault();

   const user = JSON.stringify({
      email: userEmail.value,
      password: userPassword.value,
   });

   const response = await fetch("/login", {
      method: "POST",
      body: user,
      headers: { "content-type": "application/json" },
   });

   if (response.ok) {
      const data = await response.json();

      const { id, username, user_photo, type_user_id, token } = data;

      const storageData = {
         id: id,
         username: username,
         type_user_id: type_user_id,
         user_photo: user_photo,
      };

      const storageString = JSON.stringify(storageData);

      localStorage.setItem("userData", storageString);
      localStorage.setItem("tokenPT", token);

      notie.alert({ type: "success", text: "Usuário logado com sucesso!" });

      setTimeout(() => {
         window.location.href = "home.html";
      }, 1000);
   } else {
      const data = await response.json();
      notie.alert({ type: "error", text: data.error });
      userName.focus();
   }
};

btnLogin.addEventListener("click", login);
