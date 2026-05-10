const ordersContainer =
document.getElementById("ordersContainer");

const totalOrders =
document.getElementById("totalOrders");

const totalSales =
document.getElementById("totalSales");


// =========================
// GET ORDERS
// =========================

let orders =
JSON.parse(
  localStorage.getItem("orderHistory")
) || [];


// =========================
// GET SAVED STATUSES
// =========================

let orderStatuses =
JSON.parse(
  localStorage.getItem("orderStatuses")
) || {};


// =========================
// TOTAL SALES
// =========================

let salesTotal = 0;


// =========================
// SHOW ORDERS
// =========================

displayOrders();

function displayOrders(){

  // CLEAR CONTAINER
  ordersContainer.innerHTML = "";

  // FILTER ACTIVE ORDERS ONLY
  let activeOrders = orders.filter(order =>
    order.active !== false
  );

  // NO ORDERS
  if(activeOrders.length === 0){

    ordersContainer.innerHTML = `
      <p class="empty-orders">
        No active orders.
      </p>
    `;

    totalOrders.innerText = "0";
    totalSales.innerText = "₱0";

    return;
  }

  salesTotal = 0;

  // REVERSE FOR LATEST FIRST
  activeOrders.reverse().forEach(order => {

    salesTotal += Number(order.total);

    // DEFAULT STATUS
    if(!orderStatuses[order.orderNo]){

      orderStatuses[order.orderNo] = {
        text:"Preparing",
        class:"preparing"
      };

    }

    ordersContainer.innerHTML += `

      <div class="order-card">

        <div class="order-top">

          <div>
            <h3>${order.orderNo}</h3>
            <p>${order.time}</p>
          </div>

          <div
            class="current-status ${orderStatuses[order.orderNo].class}"
            id="status-${order.orderNo}"
          >
            ${orderStatuses[order.orderNo].text}
          </div>

        </div>

        <div class="order-info">

          <p>
            <strong>Payment:</strong>
            ${order.payment}
          </p>

          <p>
            <strong>Total:</strong>
            ₱${order.total}
          </p>

        </div>

        <div class="order-buttons">

          <!-- PREPARING -->
          <button
            onclick="
              updateStatus(
                '${order.orderNo}',
                'Preparing',
                'preparing'
              )
            "
            class="prep-btn"
          >
            Preparing
          </button>

          <!-- READY -->
          <button
            onclick="
              updateStatus(
                '${order.orderNo}',
                'Ready',
                'ready'
              )
            "
            class="ready-btn"
          >
            Ready
          </button>

          <!-- OUT OF STOCK -->
          <button
            onclick="
              updateStatus(
                '${order.orderNo}',
                'Out of Stock',
                'out-stock'
              )
            "
            class="out-btn"
          >
            Out of Stock
          </button>

          <!-- MARK RECEIVED -->
          <button
            onclick="
              completeOrder(
                '${order.orderNo}'
              )
            "
            class="received-btn"
          >
            Mark Received
          </button>

        </div>

      </div>

    `;

  });

  // UPDATE TOTALS
  totalOrders.innerText =
  activeOrders.length;

  totalSales.innerText =
  "₱" + salesTotal;

}


// =========================
// UPDATE STATUS
// =========================

function updateStatus(
  orderNo,
  text,
  className
){

  orderStatuses[orderNo] = {
    text:text,
    class:className
  };

  localStorage.setItem(
    "orderStatuses",
    JSON.stringify(orderStatuses)
  );

  const statusBox =
  document.getElementById(
    `status-${orderNo}`
  );

  if(statusBox){

    statusBox.className =
    `current-status ${className}`;

    statusBox.innerText = text;

  }

}


// =========================
// COMPLETE ORDER
// REMOVE FROM ACTIVE ORDERS
// =========================

function completeOrder(orderNo){

  let confirmDelete =
  confirm(
    "Mark this order as received?"
  );

  if(!confirmDelete){
    return;
  }

  // UPDATE ORDER
  orders = orders.map(order => {

    if(order.orderNo === orderNo){

      order.active = false;
      order.completed = true;

    }

    return order;

  });

  // SAVE UPDATED ORDERS
  localStorage.setItem(
    "orderHistory",
    JSON.stringify(orders)
  );

  // REMOVE STATUS
  delete orderStatuses[orderNo];

  localStorage.setItem(
    "orderStatuses",
    JSON.stringify(orderStatuses)
  );

  // REFRESH DISPLAY
  displayOrders();

}



// =========================
// LOGOUT ADMIN
// =========================

function logoutAdmin(){

  // REMOVE ADMIN SESSION
  localStorage.removeItem("adminLogin");

  // REDIRECT TO LOGIN PAGE
  window.location.href = "login.html";

}