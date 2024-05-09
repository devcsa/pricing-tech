// const btnFechar = document.getElementById("btn-fechar");
const modalMessage = document.getElementById("modal-message-text");
const formProfile = document.getElementById("profileForm");
const formPassword = document.getElementById("passwordForm");

const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPhone = document.getElementById("phone");
const userType = document.getElementById("type_user");
const userStatus = document.getElementById("status_user");
const userID = document.getElementById("userId");

const newPassword = document.getElementById("new-password");
const confirmPassword = document.getElementById("confirm-password");

var messageUser;

formPassword.addEventListener("submit", function (event) {
   event.preventDefault();

   if (newPassword.value.trim() == "") {
      messageUser = "Nova senha é obrigatório!";
   } else {
      if (confirmPassword.value.trim() == "" || confirmPassword.value != newPassword.value) {
         messageUser = "Confirmação de senha não confere!";
      }
   }

   if (!messageUser == "") {
      modalMessage.textContent = messageUser;
      $("#modal-message").modal("show");
      messageUser = "";
      newPassword.focus();
   } else {
      updatePassword();
   }
});

async function updatePassword() {
   const user = JSON.stringify({
      password: newPassword.value,
   });

   const response = await fetch(`/userPassword/${userID.value}`, {
      method: "PUT",
      body: user,
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (response.ok) {
      $("#passwordModal").modal("hide");
      const data = await response.json();
      notie.alert({ type: "success", text: data.message });
   } else {
      $("#passwordModal").modal("hide");
      const data = await response.json();
      notie.alert({ type: "error", text: data.error });
   }
}

formProfile.addEventListener("submit", function (event) {
   event.preventDefault();

   if (userName.value.trim() == "") {
      messageUser = "Nome é obrigatório!";
   } else {
      if (userEmail.value.trim() == "") {
         messageUser = "Email é obrigatório!";
      }
   }

   if (!messageUser == "") {
      modalMessage.textContent = messageUser;
      $("#modal-message").modal("show");
      messageUser = "";
      userName.focus();
   } else {
      updateUser();
   }

   // document.getElementById("status_user").disabled = false;
   // document.getElementById("type_user").disabled = false;
});

async function updateUser() {
   const user = JSON.stringify({
      username: userName.value,
      email: userEmail.value,
      phone_number: userPhone.value,
      type_user_id: userType.value,
      status_user_id: userStatus.value,
   });

   const response = await fetch(`/users/${userID.value}`, {
      method: "PUT",
      body: user,
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (response.ok) {
      const data = await response.json();
      notie.alert({ type: "success", text: data.message });
   } else {
      const data = await response.json();
      notie.alert({ type: "error", text: data.error });
   }
}

const getProfile = async (userId) => {
   const response = await fetch(`/users/${userId}`, {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   const userData = await response.json();

   const { username, email, user_photo, phone_number, status_user, type_user } = userData;

   userID.value = userId;
   userName.value = username;
   userEmail.value = email;
   (imageDisplay.src = user_photo), (userPhone.value = phone_number);
   if (user_photo == null || user_photo == "") {
      imageDisplay.src = "./img/photo.png";
   } else {
      imageDisplay.src = `/uploads/users/${user_photo}`;
      imageDisplay.setAttribute("name", `${user_photo}`);
   }

   userStatus.innerHTML = "";
   userType.innerHTML = "";

   await getStatusUser(status_user);
   await getTypeUser(type_user);
};

const getStatusUser = async (status) => {
   const response = await fetch("/statusUser_All", {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   const result = await response.json();

   if (!response.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   result.forEach(function (rowData) {
      var option = document.createElement("option");
      option.setAttribute("value", rowData.id);
      option.textContent = rowData.status;
      userStatus.appendChild(option);

      // Verifica se o status do usuário corresponde a este status e o seleciona
      if (rowData.status === status) {
         option.selected = true;
      }
   });
};

const getTypeUser = async (typeUser) => {
   const resp = await fetch("/typeUser_All", {
      method: "GET",
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   const res = await resp.json();

   if (!resp.ok) {
      notie.alert({ type: "error", text: "Realize login para continuar!" });
      setTimeout(() => {
         window.location.href = "index.html";
      }, 1000);
   }

   res.forEach(function (row) {
      var opt = document.createElement("option");
      opt.setAttribute("value", row.id);
      opt.textContent = row.type_user;
      userType.appendChild(opt);

      if (row.type_user === typeUser) {
         opt.selected = true;
      }
   });
};

$(document).ready(function () {
   const params = new URLSearchParams(window.location.search);
   const userID = params.get("userID");

   getProfile(userID);

   var url = window.location.href;
   var cleanUrl = url.split("?")[0];
   window.history.replaceState({}, document.title, cleanUrl);
});
