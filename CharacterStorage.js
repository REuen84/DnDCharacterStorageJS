let content = document.getElementById("content");
let url = window.location.href;
let currentUser = url.split("=")[1];
let loadButton = document.getElementById("loadButton");
let titleInput = document.getElementById("nameInput");
let classInput = document.getElementById("classInput");
let submitButton = document.getElementById("submitButton");
let lookupInput = document.getElementById("classLookup");
loadButton.addEventListener("click", apiGetActors);
//submitButton.addEventListener("click", apiPostActor);
lookupInput.addEventListener("click", classLookup);

async function apiGetActors(){
    console.log("button clicked");
    let response = await fetch("http://localhost:9000/characters");
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

async function classLookup(){
    console.log("button clicked");
    location.href="file:///C:/Users/Ri/Documents/Revature/PR1/ClassDisplay.html#user="+currentUser;
}
