function darkMode() {
    let element = document.body;
    element.classList.toggle("dark-mode");
    
    let formBG = document.getElementById("options")
    formBG.classList.toggle("dark-form")
    let formColor=document.getElementsByClassName("questions")
    formColor.classList.toggle(".p-dark")
 }
 