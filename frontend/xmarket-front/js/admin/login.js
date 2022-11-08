import request_API from "../services/request_API.js";
import mensagemValidacao  from  "../services/mensagemValidacao.js";


//localStorage.clear()

//localStorage.setItem("logado", "true")

const email = document.getElementById("inputEmail");
const senha = document.getElementById("inputPassword");

const baotaoEntrar = document.getElementById("submit");

baotaoEntrar.addEventListener("click", async function(){

    const dadosLogin = {
        codigo: email.value,
        senha: senha.value,
    }

    const endPoint = "https://localhost/administrador";
    const response = await request_API("POST", endPoint, dadosLogin)

    if(response.status == 200){
        const dados = await response.json();

        localStorage.administrador = JSON.stringify(dados);
        localStorage.administradorLogado = "true";

        window.location.href="home-page.html";


    }
    if(response.status == 401){
        mensagemValidacao("Email ou senha invalida!", "Por favor confira e tente novamente", "erro", true)
    }



    
})