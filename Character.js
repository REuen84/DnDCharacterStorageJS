let content = document.getElementById("content");
let content2 = document.getElementById("content2");
let url = window.location.href;
let chaID = url.split("=")[1];
let updateButton = document.getElementById("update");
let deleteButton = document.getElementById("delete");
let newLevel = document.getElementById("newLevel");
let updateButton2 = document.getElementById("update2");
let updateButton3 = document.getElementById("update3");
let updateButton4 = document.getElementById("update4");
let newArt = document.getElementById("newArt");
let confirmButton = document.getElementById("confirm");
let denyButton = document.getElementById("deny");
document.getElementById("updateCha").style.display = "none";
document.getElementById("updateArt").style.display = "none";
document.getElementById("deleteCha").style.display = "none";
loadCharacter();

updateButton.addEventListener("click", updateVisible);
updateButton2.addEventListener("click", apiUpdateCharacter);
updateButton3.addEventListener("click", updateArtVisible);
updateButton4.addEventListener("click", apiUpdateCharacterArt);
deleteButton.addEventListener("click", deleteVisible);
confirmButton.addEventListener("click", apiDeleteCharacter);
denyButton.addEventListener("click", deleteHide);

async function loadCharacter(){
    let response = await fetch("http://20.169.50.220:9000/characters/chaID/"+chaID);
    response = await response.json();
    let chaName = document.createElement("h1");
    chaName.innerText = response.name;
    let chaInfo = document.createElement("h2");
    chaInfo.innerText = "Level "+response.level+" "+response.cla;
    let image = document.createElement("img");
    image.src = response.url;
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
    content.appendChild(chaName);
    content.appendChild(chaInfo);
    content.appendChild(image);

}

async function updateVisible(){
    updateButton.style.display="none";
    document.getElementById("updateCha").style.display="block";
}

async function apiUpdateCharacter(){
    inputCharacter = {
        actorID:chaID,
        newLevel:newLevel.value
    }
    let response = await fetch("http://20.169.50.220:9000/update", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
    },
    body:JSON.stringify(inputCharacter)
});
document.getElementById("updateCha").innerHTML = "Level updated!";
loadCharacter();
}

async function updateArtVisible(){
    updateButton.style.display="none";
    document.getElementById("updateArt").style.display="block";
}

async function apiUpdateCharacterArt(){
    inputCharacter = {
        actorID:chaID,
        newUrl:newArt.value
    }
    let response = await fetch("http://20.169.50.220:9000/updateArt", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
    },
    body:JSON.stringify(inputCharacter)
});
document.getElementById("updateArt").innerHTML = "Art updated!";
loadCharacter();
}

async function deleteVisible(){
    deleteButton.style.display="none";
    document.getElementById("deleteCha").style.display="block";
}

async function deleteHide(){
    deleteButton.style.display="block";
    document.getElementById("deleteCha").style.display="none";
}

async function apiDeleteCharacter(){
    let responseA = await fetch("http://20.169.50.220:9000/characters/chaID/"+chaID);
    responseA = await responseA.json();
  /*  let inputCharacter = {
        name:responseA.name,
        level:responseA.level,
        cla:responseA.cla,
        actorID:responseA.actorID,
        userID:responseA.userID
    } */
    let responseB = await fetch("http://20.169.50.220:9000/delete", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
    },
    body:JSON.stringify(responseA)
});
document.getElementById("deleteCha").style.display="none";
document.getElementById("content2").innerHTML = "Very well, this character has been deleted. Please navigate back to the management page with the back button."
    }
