export default function mensagemValidacao(titulo, mensagem, flag, comBotao, tempoDeEspera=1500, redirecionamento){
    let background = document.createElement("div");
    let caixaMensagem = document.createElement("div");
    let tituloMensagem = document.createElement("h4");
    let corpoMensagem = document.createElement("h6");
    let botaoFecharMensagem = document.createElement("div");

    botaoFecharMensagem.setAttribute("id", "confirmar-operacao");
    botaoFecharMensagem.classList.add("btn")
    botaoFecharMensagem.classList.add("btn-primary")
    botaoFecharMensagem.appendChild(document.createTextNode("Ok"));

    if(redirecionamento){
        botaoFecharMensagem.addEventListener("click", function(){
            background.style.display = "none";
            window.location.href = redirecionamento;
        })
    }else{
        botaoFecharMensagem.addEventListener("click", function(){
            background.style.display = "none";
        })
    }


    corpoMensagem.setAttribute("id", "corpo-mensagem");
    
    tituloMensagem.setAttribute("id", "titulo-mensagem");

    if(flag == "sucesso"){
        tituloMensagem.classList.add("mensagem-sucesso");
    }else{
        tituloMensagem.classList.add("mensagem-erro");
    }

    corpoMensagem.appendChild(document.createTextNode(mensagem));
    tituloMensagem.appendChild(document.createTextNode(titulo));

    caixaMensagem.setAttribute("class", "mensagem");
    caixaMensagem.appendChild(tituloMensagem);
    caixaMensagem.appendChild(corpoMensagem);
    if(comBotao == true){
        caixaMensagem.appendChild(botaoFecharMensagem);
    }else{
        setTimeout(function(){
            background.style.display = "none";                  
        }, tempoDeEspera);
    }
    

    background.appendChild(caixaMensagem);
    background.setAttribute("class", "canva-mensagem")

    document.body.appendChild(background);

}