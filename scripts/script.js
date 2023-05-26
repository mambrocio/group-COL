const apiKey = "7lki27i8glz6d0";
var searchBtn = $(".btn");
var form = document.getElementById("options");

// // pull the search input from index page and give it a variable in our Java Script
// var urlParams = new URLSearchParams(window.location.search);
// var searchQuery = urlParams.get("searchQuery");
// console.log(searchQuery);
// // Get a reference to the form
//
// // click eevent for search/submit button
// $(function () {
//   searchBtn.on("click", function (event) {
//     event.preventDefault();

//     searchInput = document.getElementById("input").value;
//     console.log(searchInput);
//     console.log("button Clicked");
//     // fetching longitude and lattude of input city
//   });
// });

// Add an event listener to the form's submit event
form.addEventListener("submit", function (event) {
  // Prevent the form from submitting
  event.preventDefault();

  var searchInput = document.getElementById("search-bar").value;
  //the selected currency
  var currency = document.getElementById("displayCurrency").value;

  // gathering income information and removing commas in the input field
  var incomeComma = (income = document
    .getElementById("yearly_income")
    .value.replace(",", ""));

  var income = parseFloat(incomeComma) / 12;
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

  var rent = document.getElementById("rent").value;
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

  // Perform any additional processing or calculations here
  fetch(
    `https://www.numbeo.com/api/city_cost_estimator?api_key=${apiKey}&query=${searchInput}&houesehold_members=${members}&children=${childCount}&include_rent=${rent}&currency=${currency}`
  )
    .then((response) => response.json())
    .then((data) => {
      let singleCostOfLiving = data.overall_estimate / 4;
      let trueCostOfLiving = singleCostOfLiving * members;
      let totalCost =
        trueCostOfLiving +
        inexpensiveRestaurantsPercentage +
        goingOutMonthly +
        gymMembership +
        clothesAndShoes;

      var generalCost = document.getElementById("city-cost");
      generalCost.innerHTML =
        "The Cost of Living In Your City is:" + totalCost.toFixed(0) + "$";

      if (income > totalCost) {
        let excessFunds = income - totalCost;
        let safeSavings = excessFunds / 2;
        var personalCost = document.getElementById("personal-cost");
        personalCost.innerHTML =
          "your customized cost of living: " + totalCost + "$";

        var personalSaving = document.getElementById("personal-saving");
        personalSaving.innerHTML =
          "budget buddy recommends you to save: " + safeSavings + "$";

        console.log("your general cost of living: " + trueCostOfLiving + "$");
        console.log("your customized cost of living: " + totalCost + "$");
        console.log("your monthly income: " + income + "$");
        console.log(
          "budget buddy recommends you to save: " + safeSavings + "$"
        );
      } else {
        var personalCost = document.getElementById("personal-cost");
        personalCost.innerHTML =
          "your customized cost of living: " + totalCost + "$";

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
