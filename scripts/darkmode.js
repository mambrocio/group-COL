const switchButton = document.querySelector("#switch-button")

function darkMode() {
    // var element = document.body;
    // element.classList.toggle("dark-mode");

    const body = document.querySelector("body")
    body.style.backgroundColor = "black";
    
    const hero = document.querySelector(".hero")
    hero.classList.remove("hero");
    hero.classList.add("dark-hero");

    const container = document.querySelector(".container")
    container.classList.remove("container");
    container.classList.add("dark-container");
 }

 switchButton.addEventListener("click", darkMode)