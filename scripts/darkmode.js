function darkMode() {
  let element = document.body;
  element.classList.toggle("dark-mode");

  let formBG = document.getElementById("options")
  formBG.classList.toggle("dark-form")

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

  mapboxgl.accessToken =
      "pk.eyJ1Ijoiam9zaHVhdmFuZXBzIiwiYSI6ImNsaTQ0N3FvZzE0emEzZW8wbmMwdmNwbHYifQ.hha62sCgSu3bcZlJbj89gg";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/navigation-night-v1", // style URL
      center: [inputLon, inputLat], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
}