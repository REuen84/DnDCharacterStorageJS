let content = document.getElementById("content");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", apiCheckAccountInfo);

/* async function apiCheckLoginInfo(){
    let inputCredentials = {
        username:usernameInput.value,
        password:passwordInput.value
    }
    console.log(inputCredentials);
let response = await fetch("http://localhost:9000/user/", {
    method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body:JSON.stringify(inputCredentials)
});
return response.json();
console.log(response);
let result = await response.text();
console.log(result);
} */

async function apiCheckAccountInfo(){
    let username = usernameInput.value;
    let password = passwordInput.value;
    let response = await fetch("http://20.169.50.220:9000/users/" + username + "/" +password);
    response = await response.json();
    console.log(response);
    if(response.created){
        location.href = "file:///C:/Users/Ri/Documents/Revature/PR1/CharacterStorage.html"+"#user="+username;
    } else{
        content.innerHTML = "Please check your credentials and try again."
    }
}