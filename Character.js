let content = document.getElementById("content");
let content2 = document.getElementById("content2");
let url = window.location.href;
let chaID = url.split("=")[1];
let updateButton = document.getElementById("update");
let deleteButton = document.getElementById("delete");
let newLevel = document.getElementById("newLevel");
let updateButton2 = document.getElementById("update2");
let confirmButton = document.getElementById("confirm");
let denyButton = document.getElementById("deny");
document.getElementById("updateCha").style.display = "none";
document.getElementById("deleteCha").style.display = "none";
loadCharacter();

updateButton.addEventListener("click", updateVisible);
updateButton2.addEventListener("click", apiUpdateCharacter);
deleteButton.addEventListener("click", deleteVisible);
confirmButton.addEventListener("click", apiDeleteCharacter);
denyButton.addEventListener("click", deleteHide);

async function loadCharacter(){
    let response = await fetch("http://localhost:9000/characters/chaID/"+chaID);
    response = await response.json();
    let chaName = document.createElement("a");
    chaName.innerText = response.name;
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
    content.appendChild(chaName);

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
    let response = await fetch("http://localhost:9000/update", {
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

async function deleteVisible(){
    deleteButton.style.display="none";
    document.getElementById("deleteCha").style.display="block";
}

async function deleteHide(){
    deleteButton.style.display="block";
    document.getElementById("deleteCha").style.display="none";
    document.getElementById("content2").innerHTML = "This character is once again safe... for now."
}

async function apiDeleteCharacter(){
    let responseA = await fetch("http://localhost:9000/characters/chaID/"+chaID);
    responseA = await responseA.json();
  /*  let inputCharacter = {
        name:responseA.name,
        level:responseA.level,
        cla:responseA.cla,
        actorID:responseA.actorID,
        userID:responseA.userID
    } */
    let responseB = await fetch("http://localhost:9000/delete", {
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
