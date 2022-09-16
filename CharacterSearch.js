let content = document.getElementById("content");
let url = window.location.href
let currentUser = url.split("=")[1];
let userInput = document.getElementById("userInput")
let submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", apiGetActors);
let homeButton = document.getElementById("home");
let lookupButton = document.getElementById("classLookup");
let searchButton = document.getElementById("characterSearch");
let manageButton = document.getElementById("characterManagement");
homeButton.addEventListener("click", goHome);
lookupButton.addEventListener("click", classLookup);
manageButton.addEventListener("click", characterManagement);

async function apiGetActors(){
    username = userInput.value;
    let response = await fetch("http://localhost:9000/view/" + username);
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

async function goHome(){
    location.href="file:///C:/Users/Ri/Documents/Revature/PR1/CharacterStorage.html#user="+currentUser;
}

async function classLookup(){
    location.href="file:///C:/Users/Ri/Documents/Revature/PR1/ClassDisplay.html#user="+currentUser;
}

async function characterManagement(){
    location.href="file:///C:/Users/Ri/Documents/Revature/PR1/CharacterManagement.html#user="+currentUser;
}