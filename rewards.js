const rewardList =
document.getElementById("reward-list");

// GET ORDER HISTORY
let history =
JSON.parse(
  localStorage.getItem("orderHistory")
) || [];

// ITEM COUNTER
let itemCount = {};

// LOOP THROUGH ORDERS
history.forEach(order => {

  order.items.forEach(item => {

    // CREATE ITEM
    if(!itemCount[item.name]){

      itemCount[item.name] = 0;

    }

    // ADD QUANTITY
    itemCount[item.name] += item.quantity;

  });

});


// DISPLAY REWARDS
for(let itemName in itemCount){

  const count = itemCount[itemName];

  rewardList.innerHTML += `

    <div class="reward-card">

      <h3>${itemName}</h3>

      <p class="tally">
        Purchases: ${count} / 10
      </p>

      ${
        count >= 10
        ?
        `
        <button
        class="claim-btn"
        onclick="claimReward('${itemName}')">

          Claim Free Reward

        </button>
        `
        :
        ""
      }

    </div>

  `;

}


// CLAIM REWARD
function claimReward(itemName){

  // OPEN MODAL
  document.getElementById(
    "rewardModal"
  ).style.display = "flex";

  // SHOW ITEM NAME
  document.getElementById(
    "rewardItem"
  ).innerText =
  "FREE " + itemName;

  // CLEAR OLD QR
  document.getElementById(
    "rewardQr"
  ).innerHTML = "";

  // CREATE QR
  const canvas =
  document.createElement("canvas");

  const rewardCode =
  "FREE-" +
  itemName +
  "-" +
  Math.floor(Math.random() * 999999);

  QRCode.toCanvas(
    canvas,
    rewardCode,
    function(error){

      if(error){
        console.error(error);
        return;
      }

      document.getElementById(
        "rewardQr"
      ).appendChild(canvas);

    }
  );

}


// CLOSE MODAL
function closeRewardModal(){

  document.getElementById(
    "rewardModal"
  ).style.display = "none";

}