var isValidate = localStorage.getItem("logado");
console.log("Puxando")
if(isValidate == "false"){
    window.location.href="login.html";
}

setTimeout(sair, 86400000);

function sair(){
    localStorage.setItem("logado", "false")
    window.location.href="login.html";
}
