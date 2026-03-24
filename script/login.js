console.log("Login Successful")

document.getElementById("login-btn").addEventListener("click", function(){

    // get username
    const nameInput = document.getElementById("input-name");
    const username = nameInput.value;

    // get password
    const passInput = document.getElementById("input-pass");
    const password = passInput.value;

    // match credentials
    if (username == "admin" && password == "admin123"){

        alert("login success");

        // FIXED PATH
        window.location.href = "./home.html";

    }

    else {

        alert("login failed");
        return;

    }

})