const editProfileBtn =
document.getElementById("editProfileBtn");

const fileInput =
document.getElementById("fileInput");

const profileImage =
document.getElementById("profileImage");


// OPEN FILE MANAGER
editProfileBtn.addEventListener("click", () => {

  alert("Button clicked");

  fileInput.click();

});


// CHANGE PROFILE PICTURE
fileInput.addEventListener("change", function () {

  const file = this.files[0];

  if(file){

    const reader = new FileReader();

    reader.onload = function(e){

      profileImage.src = e.target.result;

      // SAVE IMAGE
      localStorage.setItem(
        "profileImage",
        e.target.result
      );

    };

    reader.readAsDataURL(file);

  }

});


// LOAD SAVED IMAGE
const savedImage =
localStorage.getItem("profileImage");

if(savedImage){

  profileImage.src = savedImage;

}


// OTHER MENU BUTTONS
const menuItems =
document.querySelectorAll(".menu-item");

menuItems.forEach(item => {

  item.addEventListener("click", () => {

    const text = item.innerText;

    if(text.includes("Logout")){

      const confirmLogout = confirm(
        "Are you sure you want to logout?"
      );

      if(confirmLogout){

        window.location.href = "index.html";

      }

    } else if(
      !text.includes("Edit Profile")
    ){

      alert(text + " clicked!");

    }

  });

});