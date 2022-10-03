async function getCredentials(){
    let endPoint = "http://localhost:8080/login";

    let usuario = {
        "usuario": document.getElementById("inputEmail").value,
        "senha": document.getElementById("inputPassword").value
    }

    let init = {    
        method: "POST",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(usuario)
    }


    let response = await fetch(endPoint, init);
    console.log(response);

    if(response.status == 200){
        localStorage.setItem("logado", true);
        window.location.href="home-page.html";
       //window.open("home-page.html")
    }
}
localStorage.setItem("logado", false);
let btnEvent = document.getElementById("submit");


btnEvent.addEventListener('click', getCredentials);