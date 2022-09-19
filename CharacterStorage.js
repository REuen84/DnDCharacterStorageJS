let content = document.getElementById("content");
let url = window.location.href;
let currentUser = url.split("=")[1];
let homeButton = document.getElementById("home");
let lookupButton = document.getElementById("classLookup");
let searchButton = document.getElementById("characterSearch");
let manageButton = document.getElementById("characterManagement");
let slideIndex = 1;
lookupButton.addEventListener("click", classLookup);
searchButton.addEventListener("click", characterSearch);
manageButton.addEventListener("click", characterManagement);

async function apiGetActors(){
    console.log("button clicked");
    let response = await fetch("http://20.169.50.220:9000/characters");
    response = await response.json();
    loadActors(response);
}

async function loadActors(response){
    content.innerHTML = "";
    console.log(response);
    let actorList = document.createElement("ul");

    for(let i = 0; i < response.length; i++){
        let actorCard = document.createElement("li");
        let actorName = document.createElement("a");
        actorName.innerText = response[i].name;
        let actorClass = document.createElement("p");
        actorClass.innerText = response[i].cla;
        actorCard.appendChild(actorName);
        actorCard.appendChild(actorClass);
        actorList.appendChild(actorCard);
    }
    content.appendChild(actorList);
}

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }

async function classLookup(){
    location.href="file:///C:/Users/Ri/Documents/Revature/PR1/ClassDisplay.html#user="+currentUser;
}

async function characterSearch(){
    location.href="file:///C:/Users/Ri/Documents/Revature/PR1/CharacterSearch.html#user="+currentUser;
}

async function characterManagement(){
    location.href="file:///C:/Users/Ri/Documents/Revature/PR1/CharacterManagement.html#user="+currentUser;
}
