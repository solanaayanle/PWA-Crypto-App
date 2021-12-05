let usersname = document.getElementById("nameOfUser");
let greetUser = document.getElementById("greetUser");

function store() {
  localStorage.setItem("nameOfUser", usersname.value);
  let storedValue = localStorage.getItem("nameOfUser");
  console.log(storedValue);
  window.location = "dashboard.html";
  goToDashBoard(storedValue);
}

function goToDashBoard(storedValue) {
  let greetUser = document.getElementById("greetUser");
  greetUser.innerHTML = "Hi, " + storedValue;
}

function darkMode() {
  var el = document.createElement("link");
  el.type = "text/css";
  el.rel = "stylesheet";
  el.href = "darkstyle.css";
  document.getElementsByTagName("head")[0].appendChild(el);
}

function lightMode() {
  var el = document.createElement("link");
  el.type = "text/css";
  el.rel = "stylesheet";
  el.href = "style.css";
  document.getElementsByTagName("head")[0].appendChild(el);
}

let currentPrices = document.getElementById("currentPrices");

if (typeof currentPrices != "undefined" && currentPrices != null) {
  currentPrices.addEventListener("click", getCurrentPrices());

  //Get Current Prices of Crypto
  function getCurrentPrices() {
    fetch(
      "https://api.nomics.com/v1/currencies/ticker?key=80eb4f0d33616040bb8c2db5283ec054&convert=EUR&per-page=100&page=1"
    )
      .then((response) => response.json())
      .then((data) => {
        let allCoins = document.createElement("div");
        allCoins.className = "allCoins";
        let mainDiv = document.getElementById("currentCoinPrices");
        data.forEach((coin) => {
          // let coinId = coin.id;
          let allCoins1 = document.createElement("div");
          allCoins1.className = "allCoins1";

          let coinSymbol = document.createElement("span");
          coinSymbol.className = "coinInform";
          coinSymbol.innerHTML = coin.symbol;

          let coinName = document.createElement("h3");
          coinName.className = "coinInform";
          coinName.innerHTML = coin.name;

          let coinPrice = document.createElement("h3");
          coinPrice.className = "coinInform";
          coinPrice.innerHTML = "£ " + coin.price;

          allCoins.appendChild(allCoins1);
          //Append to end of div "allCoins1"
          allCoins1.appendChild(coinSymbol);
          allCoins1.appendChild(coinName);
          allCoins1.appendChild(coinPrice);

          //Append to div "currentCoinPrices"
          mainDiv.appendChild(allCoins);
        });
      });
  }
}

const getCoinsBtn = document.getElementById("getCoins");
getCoinsBtn.addEventListener("click", function () {
  fetch(
    "https://api.nomics.com/v1/currencies/ticker?key=80eb4f0d33616040bb8c2db5283ec054&convert=GBP&per-page=100&page=1"
  )
    .then((response) => response.json())
    .then((data) => {
      //Div
      let searchResults = document.createElement("div");
      searchResults.className = "searchResults";

      //Input -Search Input
      let searchInput = document.createElement("input");
      searchInput.id = "search";
      searchInput.autocomplete = "off";

      //returnedResults DIV
      const returnedResults = document.getElementById("returnedResults");

      searchResults.appendChild(searchInput);
      returnedResults.appendChild(searchResults);

      data.forEach((coin) => {
        let addFromSearchBtn = document.createElement("a");
        addFromSearchBtn.className = "addFromSearch";
        addFromSearchBtn.id = coin.id;
        addFromSearchBtn.innerHTML = "Add coin";
        addFromSearchBtn.price = coin.price;
        addFromSearchBtn.addEventListener("click", function () {
          addToDashboard(addFromSearchBtn);
        });

        let addCoinDiv = document.createElement("div");
        addCoinDiv.className = "addCoin";
        addCoinDiv.id = coin.id;

        let addCoinID = document.createElement("h3");
        addCoinID.className = "coinInfo";
        addCoinID.innerHTML = coin.id;

        let addCoinName = document.createElement("h3");
        addCoinName.className = "coinInfo";
        addCoinName.innerHTML = coin.name;

        let addCoinPrice = document.createElement("h3");
        addCoinPrice.className = "coinInfo";
        addCoinPrice.innerHTML = "£ " + coin.price;

        addCoinDiv.appendChild(addCoinID);
        addCoinDiv.appendChild(addCoinName);
        addCoinDiv.appendChild(addCoinPrice);
        addCoinDiv.appendChild(addFromSearchBtn);

        returnedResults.appendChild(addCoinDiv);
      });

      //filtering function
      document.getElementById("search").addEventListener("keyup", search);

      function search() {
        let value = document.getElementById("search").value;
        data.forEach((cost) => {
          if (
            (cost.id == value.toUpperCase() &&
              cost.name == value.toUpperCase()) ||
            cost.id.indexOf(value.toUpperCase()) > -1 ||
            value == ""
          ) {
            document.getElementById(cost.id).style.display = "block";
          } else {
            document.getElementById(cost.id).style.display = "none";
          }
        });
      }
    });
});

function addToDashboard(addFromSearchBtn) {
  const returnedResults = document.getElementById("returnedResults");
  returnedResults.style.display = "none";

  let finishedAdd = document.createElement("div");
  finishedAdd.className = "finishedPurchase";

  let finished = document.createElement("div");
  finished.className = "finished";
  let finishedH1 = document.createElement("h1");
  finishedH1.innerHTML = "Finished!";
  let successAdd = document.createElement("p");
  successAdd.innerHTML = `You have successfully added 1 ${addFromSearchBtn.id} for £${addFromSearchBtn.price}`;
  let back2Dashboard = document.createElement("a");
  back2Dashboard.innerHTML = "Please Give Your Comments";
  back2Dashboard.className = "back2Dashboard";
  back2Dashboard.href = "feedback.html";

  finished.appendChild(finishedH1);
  finished.appendChild(successAdd);
  finished.appendChild(back2Dashboard);
  finishedAdd.appendChild(finished);
  const searchCoinSection = document.getElementById("searchCoinSection1");
  searchCoinSection.appendChild(finishedAdd);
  console.log(successAdd); //console.log(addFromSearchBtn.price);
}
var inputFirstName = document.getElementById("firstName");
localStorage.setItem("firstName", inputFirstName.value);

var inputLastName = document.getElementById("lastName");
localStorage.setItem("lastName", inputLastName.value);

var inputEmail = document.getElementById("email");
localStorage.setItem("email", inputEmail.value);

var inputComment = document.getElementById("comments");
localStorage.setItem("comments", inputComment.value);
