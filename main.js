// ================= LOGIN / REGISTER =================

const form = document.getElementById("form");

if(form){

  form.addEventListener("submit", function(e){

    e.preventDefault();

    const email =
    document.getElementById("email")
    .value.trim();

    const password =
    document.getElementById("password")
    .value.trim();

    const confirmPassword =
    document.getElementById(
      "confirmPassword"
    ).value;

    const confirmBox =
    document.getElementById(
      "confirmBox"
    );

    const isRegister =
    window.getComputedStyle(
      confirmBox
    ).display !== "none";

    // EMPTY CHECK
    if(!email || !password){

      alert("Please fill in all fields");
      return;

    }

    // =========================
    // EMAIL VALIDATION
    // =========================

    const isStudentEmail =
    email.endsWith(
      "@iskwela.psau.edu.ph"
    );

    const isAdminEmail =
    email.endsWith(
      "@admincanteen.com"
    );

    // BLOCK INVALID EMAILS
    if(!isStudentEmail && !isAdminEmail){

      alert(
        "Only PSAU or Admin emails are allowed."
      );

      return;
    }

    // =========================
    // REGISTER VALIDATION
    // =========================

    if(isRegister){

      if(!confirmPassword){

        alert(
          "Please confirm your password"
        );

        return;
      }

      if(password.length < 6){

        alert(
          "Password must be at least 6 characters!"
        );

        return;
      }

      if(password !== confirmPassword){

        alert(
          "Passwords do not match!"
        );

        return;
      }

    }

    // =========================
    // LOGIN REDIRECTION
    // =========================

    // ADMIN LOGIN
    if(isAdminEmail){

      window.location.href =
      "admin.html";

    }

    // STUDENT LOGIN
    else if(isStudentEmail){

      window.location.href =
      "menu.html";

    }

  });

}

// ================= TOGGLE PASSWORD =================

function togglePassword(id) {

  const input = document.getElementById(id);

  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }

}


// ================= SWITCH MODE =================

function switchMode(mode) {

  const submitBtn = document.getElementById("submitBtn");
  const confirmBox = document.getElementById("confirmBox");
  const forgot = document.getElementById("forgot");

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  if (!submitBtn) return;

  if (mode === "login") {

    submitBtn.textContent = "Sign In";
    confirmBox.style.display = "none";
    forgot.style.display = "block";

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

  } else {

    submitBtn.textContent = "Create Account";
    confirmBox.style.display = "block";
    forgot.style.display = "none";

    registerTab.classList.add("active");
    loginTab.classList.remove("active");
  }
}


const items = document.querySelectorAll(".item");

items.forEach(item => {

  const minus = item.querySelector(".minus");
  const plus = item.querySelector(".plus");
  const count = item.querySelector(".count");
  const addCart = item.querySelector(".add-cart");

  const itemName = item.querySelector(".details h3").textContent;
  const itemPrice = item.querySelector(".details p").textContent;

  let value = 0;

  // PLUS BUTTON
  plus.addEventListener("click", () => {
    value++;
    count.textContent = value;
  });

  // MINUS BUTTON
  minus.addEventListener("click", () => {

    if(value > 0){
      value--;
      count.textContent = value;
    }

  });

  // ADD TO CART
  addCart.addEventListener("click", () => {

    if(value === 0){
      alert("Please select quantity");
      return;
    }

    // GET EXISTING CART
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // CHECK IF ITEM EXISTS
    const existingItem = cart.find(product =>
      product.name === itemName
    );

    if(existingItem){

      existingItem.quantity += value;

    } else {

      cart.push({
        name: itemName,
        price: itemPrice,
        quantity: value
      });

    }

    // SAVE
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(itemName + " added to cart!");

    // RESET COUNTER
    value = 0;
    count.textContent = value;

  });

});
if(isAdminEmail){

  window.location.href =
  "admin.html";

}