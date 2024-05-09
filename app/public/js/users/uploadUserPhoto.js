// const token = localStorage.getItem("tokenPT");
const formPhoto = document.getElementById("updatePhoto");
const btnEditPhoto = document.getElementById("btnEditPhoto");
const uploadButton = document.getElementById("fileToUpload");
const btnDeletePhoto = document.getElementById("btnDeletePhoto");
const imageDisplay = document.getElementById("image-display");
const photoURLInput = document.getElementById("photoURL");

const deletePhoto = async () => {
   const img_name = imageDisplay.getAttribute("name");

   const response = await fetch(`/deleteUserPhoto/${id}/${img_name}`, {
      method: "DELETE",
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   if (response.ok) {
      const data = await response.json();

      let img_empty = "";

      await updateFileNameUser(id, img_empty);

      imageDisplay.src = "./img/photo.png";
      notie.alert({ type: "success", text: data.message });
   } else {
      const message = response.status + " - " + response.statusText;
      notie.alert({ type: "error", text: `Falha no upload: ${message}` });
   }
};

formPhoto.addEventListener("submit", function (event) {
   event.preventDefault();

   // if (uploadButton.files.length == 0) {
   //    let message = "Favor selecionar um arquivo!";
   //    notie.alert({ type: "error", text: message });
   //    return;
   // }

   const formData = new FormData(); // Cria um objeto formData vazio

   formData.append("name", imageDisplay.value); // Adiciona valores do input type="text"

   for (let i = 0; i < uploadButton.files.length; i++) {
      formData.append("files", uploadButton.files[i]); // Adiciona valores do input type="file"
   }

   uploadPhoto(formData);
});

const uploadPhoto = async (formData) => {
   const response = await fetch(`/uploadUserPhoto/${id}`, {
      method: "POST",
      body: formData,
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   if (response.ok) {
      const data = await response.json();
      const fileNameUser = data.files;

      updateFileNameUser(id, fileNameUser);

      // notie.alert({ type: "success", text: data.message });
   } else {
      const message = response.status + " - " + response.statusText;
      notie.alert({ type: "error", text: `Falha no upload: ${message}` });
   }
};

const updateFileNameUser = async (id, fileName) => {
   const file = JSON.stringify({
      fileName: fileName,
   });

   const response = await fetch(`/userPhoto/${id}`, {
      method: "PUT",
      body: file,
      headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (response.ok) {
      const data = await response.json();
      notie.alert({ type: "success", text: data.message });
   } else {
      const message = response.status + " - " + response.statusText;
      notie.alert({ type: "error", text: `Falha no upload: ${message}` });
   }
};

btnDeletePhoto.addEventListener("click", () => {
   deletePhoto();
});

//Upload Button
btnEditPhoto.addEventListener("click", function () {
   uploadButton.click();
});

imageDisplay.addEventListener("click", () => {
   uploadButton.click();
});

// Visualizar foto do perfil no formulário
function photoPreview() {
   const fotoPerfil = uploadButton.files[0];

   const reader = new FileReader();
   reader.onload = function (event) {
      imageDisplay.src = event.target.result;
   };
   reader.readAsDataURL(fotoPerfil);
}

uploadButton.addEventListener("change", () => {
   photoPreview();
});

uploadButton.addEventListener("change", function (event) {
   var selectedFile = event.target.files[0];
   var objectURL = URL.createObjectURL(selectedFile);
   photoURLInput.value = objectURL;
});
