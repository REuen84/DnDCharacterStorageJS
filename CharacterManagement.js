let content = document.getElementById("content");
let url = window.location.href
let currentUser = url.split("=")[1];
document.addEventListener("DOMContentLoaded", apiGetActors);
let homeButton = document.getElementById("home");
let lookupButton = document.getElementById("classLookup");
let searchButton = document.getElementById("characterSearch");
let manageButton = document.getElementById("characterManagement");
let addButton = document.getElementById("addButton");
document.getElementById("addCharacter").style.display = "none";
let nameInput = document.getElementById("nameInput");
let classInput = document.getElementById("classInput");
let levelInput = document.getElementById("levelInput");
let submitButton = document.getElementById("submitButton");
var userID = 0;

homeButton.addEventListener("click", goHome);
lookupButton.addEventListener("click", classLookup);
searchButton.addEventListener("click", characterSearch);
addButton.addEventListener("click", addVisible);
submitButton.addEventListener("click", apiGetUserID);

async function apiGetActors(){
    let response = await fetch("http://20.169.50.220:9000/view/" + currentUser);
    response = await response.json();
    loadActors(response);
}

async function apiGetActorsNoLoad(){
    let response = await fetch("http://20.169.50.220:9000/view/" + currentUser);
    response = await response.json();
    console.log(userID);
    apiAddActor(response);
}
async function loadActors(response){
    content.innerHTML = "";
    console.log(response);
    let actorList = document.createElement("ul");

    for(let i = 0; i < response.length; i++){
        let actorCard = document.createElement("li");
        let actorName = document.createElement("a");
        let actorSpace = document.createElement("p");
        actorSpace.innerHTML = "";
        actorName.href = "file:///C:/Users/Ri/Documents/Revature/PR1/Character.html#chaID="+response[i].actorID;
        actorName.innerText = response[i].name;
        actorCard.appendChild(actorName);
        actorList.appendChild(actorCard);
        actorList.appendChild(actorSpace);
    }
    content.appendChild(actorList);
}

async function addVisible(){
    addButton.style.display="none";
    document.getElementById("addCharacter").style.display="block";
}

async function apiGetUserID(){
    console.log(currentUser);
    let u = await fetch("http://20.169.50.220:9000/userID/"+currentUser);
    u = await u.json();
    userID = u.userID;
    apiGetActorsNoLoad();
}

async function apiAddActor(response){
    let unique = true;
    let name = nameInput.value;
    let cla = classInput.value;
    let level = levelInput.value;
    for(let i = 0; i < response.length; i++){
        if(name == response[i].name){
            unique = false;
            break;
        }
    }
    if(unique){
        let inputActor = {
            name:name,
            cla:cla,
            level:level,
            userID:userID
        }
        let response = await fetch("http://20.169.50.220:9000/actors", {
            method:'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(inputActor)
        });
        apiGetActors();
    }
}

async function goHome(){
    location.href="file:///C:/Users/Ri/Documents/Revature/PR1/CharacterStorage.html#user="+currentUser;
}

async function classLookup(){
    location.href="file:///C:/Users/Ri/Documents/Revature/PR1/ClassDisplay.html#user="+currentUser;
}

async function characterSearch(){
    location.href="file:///C:/Users/Ri/Documents/Revature/PR1/CharacterSearch.html#user="+currentUser;
}