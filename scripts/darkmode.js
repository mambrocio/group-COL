// Dark Mode Toggler

function darkMode() {  // Transforms back ground and text to be replaced with a darker background 
  let element = document.body; 
  element.classList.toggle("dark-mode"); //codes like these reach out to an assigned style in the CSS and applies them 

  let formBG = document.getElementById("options") //Stylizes the form 
  formBG.classList.toggle("dark-form")


  let lightMode = document.getElementById("toggle");
  lightMode.classList.toggle("toggle-on")

  // Result block is then applied with CSS Dark Mode 
  let resultStrong = document.getElementById("city-title")
  resultStrong.classList.toggle("resultDark")

  let mapTitle = document.getElementById("location")
  mapTitle.classList.toggle("resultDark")

  let resultCost = document.getElementById("city-cost")
  resultCost.classList.toggle("resultDark")

  let resultPersonal = document.getElementById("personal-title")
  resultPersonal.classList.toggle("resultDark")

  let finalCost = document.getElementById("personal-cost")
  finalCost.classList.toggle("resultDark")

  let resultSaving = document.getElementById("saving-title")
  resultSaving.classList.toggle("resultDark")

  let finalSaving = document.getElementById("personal-saving")
  finalSaving.classList.toggle("resultDark")


  // Used map api and switched to night mode. 
  mapboxgl.accessToken =
      "pk.eyJ1Ijoiam9zaHVhdmFuZXBzIiwiYSI6ImNsaTQ0N3FvZzE0emEzZW8wbmMwdmNwbHYifQ.hha62sCgSu3bcZlJbj89gg";
    const map = new mapboxgl.Map({
      container: "map", 
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [inputLon, inputLat], 
      zoom: 9, 
    });
}