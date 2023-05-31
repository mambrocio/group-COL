const apiKey = "7lki27i8glz6d0";
var geoapiKey = "93ebb8e57f9a4d07d7c8ebff4bd9146f";
var searchBtn = $(".btn");
var form = document.getElementById("options");
var inputName;
var inputLat;
var inputLon;
var childCare;
var averageRent;

// // pull the search input from index page and give it a variable in our Java Script
// var urlParams = new URLSearchParams(window.location.search);
// var searchQuery = urlParams.get("searchQuery");
// console.log(searchQuery);
// // Get a reference to the form
//
// // click event for search/submit button
// $(function () {
//   searchBtn.on("click", function (event) {
//     event.preventDefault();

//     searchInput = document.getElementById("input").value;
//     console.log(searchInput);
//     console.log("button Clicked");
//     // fetching longitude and lattude of input city
//   });
// });

// Load the Visualization API and the corechart package.
google.charts.load("current", { packages: ["corechart"] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");

  data.addRows([
    ["Mushrooms", 5],
    ["Onions", 1],
    ["Olives", 1],
    ["Zucchini", 1],
    ["Pepperoni", 2],
  ]);

  // Set chart options
  var options = { title: "Current Spnding", width: 400, height: 300 };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

// Add an event listener to the form's submit event
form.addEventListener("submit", function (event) {
  // Prevent the form from submitting
  event.preventDefault();

  PlaySound = function () {
    var audio = new Audio("../assets/audio/receipt print.mp3");
    audio.loop = false;
    audio.play();
  };

  var searchInput = document.getElementById("search-bar").value;
  //the selected currency
  var currency = document.getElementById("displayCurrency").value;

  // gathering income information and removing commas in the input field
  var incomeComma = (income = document
    .getElementById("yearly_income")
    .value.replace(",", ""));

  var income = (parseFloat(incomeComma) * 0.8) / 12;
  //the number of members in the household
  var members = document.getElementById("members").value;

  //the percentage of time spent eating in restaurants
  // var restaurantsPercentage =
  //   document.getElementById("restaurants_percentage").value * 8.68;

  //the percentage of time choosing inexpensive restaurants
  var inexpensiveRestaurantsPercentage =
    document.getElementById("inexpensive_restaurants_percentage").value * 2.953;

  //the frequency of going out
  var goingOutMonthly =
    document.getElementById("going_out_monthly").value * 2.1682;

  //the level of alcoholic beverage consumption
  var alcoholicDrinks =
    document.getElementById("alcoholic_drinks").value * 0.5757;

  //  gym membership value
  var gymMembership = document.getElementById("gym_memberships").value * 0.2889;

  //   vacation frequency value
  var vacation = document.getElementById("vacation").value * 2.156;
  //   the amount to add for clothe and shoe shopping
  var clothesAndShoes =
    document.getElementById("clothing_and_shoes").value * 0.6413;

  //the amount of childern in the home
  var childCount = document.getElementById("child_count").value;

  // amount of pets in a home
  var dogCount = document.getElementById("dog_count").value * 125;

  var catCount = document.getElementById("cat_count").value * 100;

  // Output the values
  console.log("Currency:", currency);
  console.log("Members of household:", members);
  // console.log("Restaurants percentage:", restaurantsPercentage);
  console.log(
    "Inexpensive restaurants percentage:",
    inexpensiveRestaurantsPercentage
  );
  console.log("Going out monthly :", goingOutMonthly + "$");
  console.log("Alcoholic drinks: ", alcoholicDrinks + "$");
  console.log("alcoholic drinks: ", alcoholicDrinks + "$");
  console.log("gym membership: ", gymMembership + "$");
  console.log("vacation cost: " + vacation + "$");

  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${geoapiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      inputName = data[0].name;
      console.log(inputName);
      inputLat = data[0].lat;
      inputLon = data[0].lon;
      // fetching all relevant data from api usihg the lon and lat from geocode api

      // map java script
      mapboxgl.accessToken =
        "pk.eyJ1Ijoiam9zaHVhdmFuZXBzIiwiYSI6ImNsaTQ0N3FvZzE0emEzZW8wbmMwdmNwbHYifQ.hha62sCgSu3bcZlJbj89gg";
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/navigation-day-v1", // style URL
        center: [inputLon, inputLat], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
      console.log(map);
      // adding location to the map title

      $(".map-title").children("strong").html("");

      $(".map-title")
        .children("strong")
        .append("Current Location: " + inputName);

      // Perform any additional processing or calculations here
      fetch(
        `https://www.numbeo.com/api/city_cost_estimator?api_key=${apiKey}&query=${inputLat},${inputLon}&members=${members}&children=${childCount}&include_rent=true&currency=${currency}`
      )
        .then((response) => response.json())
        .then((data) => {
          var groceries =
            (data.breakdown[2].estimate * members) / 4 -
            inexpensiveRestaurantsPercentage;
          var utilites = (data.breakdown[6].estimate * members) / 4;
          var averageRent = (data.breakdown[8].estimate * members) / 4;
          var transportation = (data.breakdown[4].estimate * members) / 4;
          let singleCostOfLiving = data.overall_estimate / 4;
          let trueCostOfLiving = singleCostOfLiving * members;
          let totalCost =
            trueCostOfLiving +
            inexpensiveRestaurantsPercentage +
            goingOutMonthly +
            alcoholicDrinks +
            vacation +
            gymMembership +
            clothesAndShoes +
            dogCount +
            catCount;

          let exactCost =
            averageRent +
            +inexpensiveRestaurantsPercentage +
            goingOutMonthly +
            alcoholicDrinks +
            vacation +
            transportation +
            groceries +
            utilites +
            gymMembership +
            clothesAndShoes +
            dogCount +
            catCount;

          let breakDown = data.breakdown;
          console.log(breakDown);
          console.log(exactCost);

          let badBudget = totalCost - income;

          // resutlts cost of living in your city
          var generalCost = document.getElementById("city-cost");
          var cityTitle = document.getElementById("city-title");
          cityTitle.textContent =
            "The Average Cost of Living In Your City is: ";
          generalCost.innerHTML = trueCostOfLiving.toFixed(0) + currency;
          // child count formula to redefine our values
          if (childCount > 0) {
            childCare = (data.breakdown[9].estimate * members) / 4;
          } else {
            childCare = 0;
          }

          // results personal cost
          if (income > totalCost) {
            let excessFunds = income - totalCost;
            let safeSavings = excessFunds / 2;
            var personalCost = document.getElementById("personal-cost");
            var personalTitle = document.getElementById("personal-title");
            personalTitle.textContent = "Your Personal Cost of Living Is: ";
            personalCost.innerHTML = totalCost.toFixed(0) + currency;
            // savings and budget
            var personalSaving = document.getElementById("personal-saving");
            var savingTitle = document.getElementById("saving-title");
            savingTitle.textContent = "Your Recommended Monthly Saving Is: ";
            personalSaving.innerHTML = safeSavings.toFixed(0) + currency;

            console.log(
              "your general cost of living: " + trueCostOfLiving + "$"
            );
            console.log("your customized cost of living: " + totalCost + "$");
            console.log("your monthly income: " + income + "$");
            console.log(
              "budget buddy recommends you to save:  " + safeSavings + "$"
            );

            // cost breakdown pie chart
            google.charts.load("current", { packages: ["corechart"] });
            google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
              var data = google.visualization.arrayToDataTable([
                ["Cost", "Percent of Budget"],
                ["Gym", gymMembership],
                ["Eating Out", inexpensiveRestaurantsPercentage],
                ["tranportation", transportation],
                ["Leisure Expenses", goingOutMonthly],
                ["Clothing & Shoes", clothesAndShoes],
                ["Drinking at Home", alcoholicDrinks],
                ["Vacation Budget", vacation],
                ["groceries", groceries],
                ["Utilites", utilites],
                ["Pet Budget", dogCount + catCount],
                ["Childcare", childCare],
                ["rent", averageRent],
              ]);

              var options = {
                title: "Cost Breakdown",
                is3D: false,
              };

              var chart = new google.visualization.PieChart(
                document.getElementById("piechart_3d")
              );
              chart.draw(data, options);
            }

            // budget pie chart
            google.charts.load("current", { packages: ["corechart"] });
            google.charts.setOnLoadCallback(drawDonutChart);

            function drawDonutChart() {
              var data = google.visualization.arrayToDataTable([
                ["Budget", "Monthly"],
                ["Cost of Living", totalCost],
                ["Saving Budget", safeSavings],
                ["Spending Budget", safeSavings],
              ]);

              // chart options can choose height, width, hole size, spacing, color, and more
              var options = {
                title: "Monthly Budget",
                pieHole: 0.4,
              };

              var chart = new google.visualization.PieChart(
                document.getElementById("donutChart")
              );
              chart.draw(data, options);
            }
          } else {
            var personalCost = document.getElementById("personal-cost");
            personalCost.innerHTML =
              badBudget.toFixed(0) + "$ Over Your Monthly Income";

            var personalSaving = document.getElementById("personal-saving");
            personalSaving.innerHTML =
              "budget buddy recommends you should look for  more affordable place to move within your budget";
            console.log(
              "budget buddy recommends you should look for  more affordable place to move within your budget"
            );
            console.log("your monthly income is : " + income);
            console.log("your monthly cost is : " + totalCost);
          }
        });
    });
});

//observers to load elements on the bottom of the page when scrolled to
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("instructions-animation");
    }
  });
});

observer.observe(document.querySelector(".instructions"));
observer.observe(document.querySelector("form"));


//added dark function for mobile layout//
function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}