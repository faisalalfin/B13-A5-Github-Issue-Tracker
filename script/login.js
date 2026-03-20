console.log("Login Successful")

document.getElementById("login-btn").addEventListener("click", function(){
    //1- get the username

    const nameInput = document.getElementById("input-name");
    const username = nameInput.value;
    console.log(username);

    //2- get the password
    const passInput = document.getElementById("input-pass");
    const password = passInput.value;
    console.log(password);

    //3- match username and password

    if (username == "admin" && password == "admin123"){
        alert("login success");

        window.location.assign("/home.html");
    }

    else {
        alert("login failed");
        return;
    }


})