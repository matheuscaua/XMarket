var isValidate = localStorage.getItem("logado");

if(isValidate == "false"){
    window.location.href="login.html";
}

setTimeout(sair, 86400)//86400
function sair(){
    localStorage.setItem("logado", "false")
    window.location.href="login.html";
}
