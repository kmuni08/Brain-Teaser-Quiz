function login() {
    let user = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let payload = {
        username: user,
        password: password
    }

    $.ajax({
        url: "/user/login",
        type: "POST",
        data: payload,
        complete: (data) => {
            console.log("status: " + data.status)
            if(data.status == 404) {
                alert(data.responseJSON.message);
                return;
            }
            else if (data.status == 500) {
                alert(data.responseJSON.error);
                return;
            }
            let token = data.responseJSON.token;
            window.localStorage.setItem("token", token);
            window.location.replace("/quiz_game.html");
        }
    });

}
