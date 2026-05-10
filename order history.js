const historyList =
document.getElementById("history-list");

let history =
JSON.parse(localStorage.getItem("orderHistory"))
|| [];

if(history.length === 0){

  historyList.innerHTML =
  "<p>No orders yet.</p>";

} else {

  history.reverse().forEach(order => {

    let itemsHTML = "";

    order.items.forEach(item => {

      itemsHTML += `
        <div class="item">
          <p><strong>${item.name}</strong></p>
          <p>Qty: ${item.quantity}</p>
          <p>Price: ${item.price}</p>
        </div>
      `;

    });

   historyList.innerHTML += `
    
  <div class="order-card">

    <h2>${order.orderNo}</h2>

    <p>
      <strong>Time:</strong>
      ${order.time}
    </p>

    <p>
      <strong>Payment:</strong>
      ${order.payment}
    </p>

    <p>
      <strong>Total:</strong>
      ₱${order.total}
    </p>

    <p>
      <strong>Status:</strong>
      ${order.status}
    </p>

    ${itemsHTML}

    ${
      order.active
      ?
      `
      <button
      class="receive-btn"
      onclick="receiveOrder('${order.orderNo}')">

        Order Received

      </button>
      `
      :
      `
      <button class="done-btn">
        Completed
      </button>
      `
    }

  </div>

  `;

  });

}
function receiveOrder(orderNo){

  let history =
  JSON.parse(
    localStorage.getItem("orderHistory")
  ) || [];

  history = history.map(order => {

    if(order.orderNo === orderNo){

      order.active = false;
      order.status = "Completed";

    }

    return order;

  });

  localStorage.setItem(
    "orderHistory",
    JSON.stringify(history)
  );

  location.reload();

}