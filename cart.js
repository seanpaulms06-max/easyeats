const cartList = document.getElementById("cart-list");
const totalDiv = document.getElementById("total");

// GET CART DATA
let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;


// SHOW MESSAGE IF EMPTY
if(cart.length === 0){

  cartList.innerHTML = `
    <p>Your cart is empty.</p>
  `;

} else {

  // DISPLAY ITEMS
  cart.forEach(item => {

    const priceNumber =
    parseFloat(item.price.replace("₱",""));

    const subtotal =
    priceNumber * item.quantity;

    total += subtotal;

    // RANDOM STATUS
    const statusList = [
      {
        text: "Out of Stock",
        class: "out-stock"
      },
      {
        text: "Preparing",
        class: "preparing"
      },
      {
        text: "Ready to Pick Up",
        class: "ready"
      }
    ];

    const randomStatus =
    statusList[
      Math.floor(
        Math.random() * statusList.length
      )
    ];

    cartList.innerHTML += `
    
      <div class="cart-item">

        <h3>${item.name}</h3>

        <p>Price: ${item.price}</p>

        <p>Quantity: ${item.quantity}</p>

        <p>Subtotal: ₱${subtotal}</p>

        <div class="status ${randomStatus.class}">
          ${randomStatus.text}
        </div>

      </div>

    `;
  });

}


// TOTAL
totalDiv.textContent =
"Total: ₱" + total;



// =========================
// CHECKOUT BUTTON
// =========================

function checkout(){

  if(cart.length === 0){

    alert("Your cart is empty!");
    return;

  }

  // OPEN PAYMENT MODAL
  document.getElementById(
    "paymentModal"
  ).style.display = "flex";

}



// =========================
// CLOSE PAYMENT MODAL
// =========================

function closePaymentModal(){

  document.getElementById(
    "paymentModal"
  ).style.display = "none";

}



// =========================
// SELECT PAYMENT
// =========================

function selectPayment(paymentText){

  // CLOSE PAYMENT MODAL
  closePaymentModal();

  // OPEN QR MODAL
  document.getElementById(
    "qrModal"
  ).style.display = "flex";

  // CHANGE TITLE
  document.getElementById(
    "paymentTitle"
  ).innerText =
  paymentText + " Payment";

  // GENERATE ORDER NUMBER
  const orderNumber =
  "ORD-" +
  Math.floor(Math.random() * 999999);

  // SAVE TEMP DATA
  localStorage.setItem(
    "currentOrderNo",
    orderNumber
  );

  localStorage.setItem(
    "currentPayment",
    paymentText
  );

  // SHOW ORDER ID
  document.getElementById(
    "orderIdText"
  ).innerText = orderNumber;

  // CLEAR OLD QR
  document.getElementById(
    "qrcode"
  ).innerHTML = "";

  // CREATE QR CODE
  const canvas =
  document.createElement("canvas");

  QRCode.toCanvas(

    canvas,

    `
      Order: ${orderNumber}
      Payment: ${paymentText}
      Total: ₱${total}
    `,

    function(error){

      if(error){

        console.error(error);
        return;

      }

      document.getElementById(
        "qrcode"
      ).appendChild(canvas);

    }

  );

  // AUTO COMPLETE PAYMENT
  setTimeout(() => {

    completePayment();

  }, 3000);

}



// =========================
// COMPLETE PAYMENT
// =========================

function completePayment(){

  const orderNumber =
  localStorage.getItem(
    "currentOrderNo"
  );

  const paymentText =
  localStorage.getItem(
    "currentPayment"
  );

  // CURRENT TIME
  const orderTime =
  new Date().toLocaleString();

  // ORDER DATA
 const orderData = {

  orderNo: orderNumber,
  time: orderTime,
  payment: paymentText,
  total: total,
  items: cart,

  status: "Preparing",
  active: true

};
  // GET OLD HISTORY
  let history =
  JSON.parse(
    localStorage.getItem("orderHistory")
  ) || [];

  // SAVE ORDER
  history.push(orderData);

  localStorage.setItem(
    "orderHistory",
    JSON.stringify(history)
  );

  // SUCCESS MESSAGE
  alert(
    "Payment Successful!\n\n" +
    "Order No: " + orderNumber +
    "\nPayment: " + paymentText
  );

  // CLOSE QR MODAL
  document.getElementById(
    "qrModal"
  ).style.display = "none";

  // CLEAR CART
  localStorage.removeItem("cart");

  // REDIRECT
  window.location.href =
  "order hstory.html";

}



// =========================
// CLEAR CART
// =========================

function clearCart(){

  localStorage.removeItem("cart");

  location.reload();

}