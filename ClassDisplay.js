let content = document.getElementById("content");
let url = window.location.href;
let currentUser = url.split("=")[1];
let classInput = document.getElementsByName('className');
let submitButton = document.getElementById("submitButton");
let homeInput = document.getElementById("home");
submitButton.addEventListener("click", apiGetDescription);
homeInput.addEventListener("click", home);


async function apiGetDescription(){
    content.innHTML = "";
    for(i = 0; i < classInput.length; i++){
        if(classInput[i].checked)
        var className = classInput[i].value;
        console.log(className);
    }
    let response = await fetch("http://localhost:9000/description/"+className);
    console.log(response);
    response = await response.json();
    console.log(response);
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
    let descCard = document.createElement("a");
    descCard.innerText = response.desc;
    content.appendChild(descCard);
}

async function home(){
    location.href="file:///C:/Users/Ri/Documents/Revature/PR1/CharacterStorage.html#user="+currentUser;
}