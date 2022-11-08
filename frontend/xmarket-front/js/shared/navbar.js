import request_API from "../services/request_API.js"

const servidor_imagem = "http://127.0.0.1:5500/";


let botaoCarrinho = document.getElementById("cart-button");
let botaoConfiguracao = document.getElementById("setting-button");
let campoQuantidade = document.getElementById("canva-quantidade-carrinho");
let botaoDeslogar = document.getElementById("deslogar");
let botaoLogar = document.getElementById("botao-logar");

let pedidosOpcao = document.getElementById("pedidos")
let vendaEspecifica = document.getElementById("fechar-venda-especifica")
let vendaGeral = document.getElementById("fechar-venda-geral")

let conteudoPrincipal = document.getElementById("conteudo-da-pagina");
let pedidoHistorico = document.getElementById("pedido-historico");
let areaHistorico = document.getElementById("area-pedidos");

let areaPedidoHistorico = document.getElementById("area-pedidos-historico");



let logado = localStorage.logado;
let quantidadeProdutos = 0;
let idUsuario;

if (localStorage.cliente) idUsuario = JSON.parse(localStorage.cliente).id;


if (logado == "true") {
    botaoConfiguracao.style.display = "flex";
    botaoLogar.style.display = "none";

} else if (logado == "false" || logado == undefined) {
    botaoConfiguracao.style.display = "none";
    botaoLogar.style.display = "flex";

}


botaoLogar.addEventListener("click", function () {
    localStorage.redirecionamento = localStorage.ultimaPagina
    window.location.href = "login.html"
})

botaoDeslogar.addEventListener("click", () => {
    localStorage.clear();
    localStorage.setItem("logado", false);
    window.location.href = "home-page.html";
})

botaoConfiguracao.addEventListener("click", function () {
    const modalConfiguracao = document.getElementById("area-configuracoes");
    if (modalConfiguracao.style.display == "" || modalConfiguracao.style.display == "none") {
        modalConfiguracao.style.display = "flex";
    } else {
        modalConfiguracao.style.display = "none";
    }
})


pedidosOpcao.addEventListener("click", function () {
    const modalConfiguracao = document.getElementById("area-configuracoes")
    modalConfiguracao.style.display = "none";
    areaHistorico.style.display = "block";
    conteudoPrincipal.style.display = "none";

})

vendaEspecifica.addEventListener("click", function () {
    pedidoHistorico.style.display = "none";
})

vendaGeral.addEventListener("click", function () {
    areaHistorico.style.display = "none";
    conteudoPrincipal.style.display = "block";
})

campoQuantidade.addEventListener("click", () => {
    window.location.href = "carrinho.html";
})

botaoCarrinho.addEventListener("click", () => {
    window.location.href = "carrinho.html";
})


alterarQuantidade();
async function alterarQuantidade() {
    let canvaQuantidadeCarrinho = document.getElementById("canva-quantidade-carrinho");
    let quantidadeCarrinho = document.getElementById("quantidade-carrinho");

    let response;
    let dados;

    if (logado == "true") {
        botaoConfiguracao.style.display = "flex";
        botaoLogar.style.display = "none";


        response = await request_API("GET", `https://localhost/carrinho/${idUsuario}`);

        if (response.status == 200)
            dados = await response.json();

    }

    if (logado == "false" || logado == undefined) {
        botaoConfiguracao.style.display = "none";
        botaoLogar.style.display = "flex";


        if (localStorage.carrinho)
            dados = JSON.parse(localStorage.carrinho);

    }

    for (let element in dados) {
        quantidadeProdutos = quantidadeProdutos + dados[element].quantidade;
    }

    localStorage.setItem("quantidade-carrinho", quantidadeProdutos);

    

    if (localStorage.getItem("quantidade-carrinho") != 0 && localStorage.getItem("quantidade-carrinho") != undefined) {
        canvaQuantidadeCarrinho.style.display = "flex";
        quantidadeCarrinho.innerHTML = localStorage.getItem("quantidade-carrinho");
    } else if (localStorage.getItem("quantidade-carrinho") == 0) {
        canvaQuantidadeCarrinho.style.display = "none";
    }
}

requisicaoHistorico();
async function requisicaoHistorico(){
    const areaPedidos = document.getElementById("area-pedidos");

    var endPoint = `https://localhost/venda/historico/${idUsuario}`;
    var response = await request_API("GET", endPoint);

    if(response.status == 200){
        var dados = await response.json();
        var historico = {};
        dados.forEach((element, id) =>{
            if(historico[`${element.codigo_venda}`] == undefined){
                historico[`${element.codigo_venda}`] = [];
            }

            console.log(typeof historico[`${element.codigo_venda}`])
            console.log(historico[`${element.codigo_venda}`])
            if(typeof historico[`${element.codigo_venda}`] == "object"){
                var listCodigo = historico[`${element.codigo_venda}`];

                listCodigo.push([element]);

                historico[`${element.codigo_venda}`] = listCodigo;
     
            }
            
           
        })
        //console.log(historico)
        var listaPedidos = [];
        for(var id in historico){
            var pedido = historico[id];

            for(var id in pedido){
                var item = pedido[id];
                var produto = item[0];


                if(!listaPedidos.includes(produto.codigo_venda)){
                    console.log("----")
                    console.log(produto.codigo_venda)
                    listaPedidos.push(produto.codigo_venda);
                    const codigo = produto.codigo_venda;

                    const precoPedido = getPedidoPreco(codigo, historico);
                    const quantidadePedido = getPedidoQuantidade(codigo, historico);

                    var cardProduto = card_historico(produto, precoPedido);
                    cardProduto.addEventListener("click", ()=>{  
                        var pedido = getPedido(codigo, historico);
                        document.getElementById("pedido-historico").style.display = "block";
                        areaPedidoHistorico.innerHTML = null;
                        pedido.forEach(produto_venda =>{
                            const nome = document.getElementById("nome-comprador");
                            const metodoCompra =document.getElementById("metodo-compra-historico");
                            const enderecoCompra =document.getElementById("endereco-compra-historico");
                            const data = document.getElementById("data-venda");
                            const total = document.getElementById("total-geral-pedido");
                            const quantidade = document.getElementById("total-geral-quantidade");


                            nome.style.textTransform = "captalize";
                            nome.innerHTML = produto.nome;
                            metodoCompra.innerHTML = produto.forma_pagamento;
                            enderecoCompra.innerHTML = produto.endereco;
                            data.innerHTML = produto.data;
                            quantidade.innerHTML = quantidadePedido;
                            total.innerHTML = precoPedido.toFixed(2);

                            var produtos_venda = card_historico_produto(produto_venda);

                            areaPedidoHistorico.appendChild(produtos_venda);

                            localStorage.produtoSelecionado = produto;
                        })
                        console.log(pedido)
                        
                    })

                    areaPedidos.appendChild(cardProduto);
                }
            }
        }
    }
}

function getPedido(codigoPedido, historico){
    var pedido = [];
    for(var i in historico){
        var list = historico[i];
        for(var produto in list){
            if(list[produto][0].codigo_venda == codigoPedido){
                pedido.push(list[produto][0])
            }
        }
    }
    return pedido;
}

function getPedidoPreco(codigoPedido, historico){
    var precoPedido = 0;
    for(var i in historico){
        var list = historico[i];
        for(var produto in list){
            if(list[produto][0].codigo_venda == codigoPedido){
                console.log(list[produto][0].totalPorProduto)
                precoPedido = Number(list[produto][0].totalPorProduto) + precoPedido;
            }
        }
    }
    return precoPedido;
}

function getPedidoQuantidade(codigoPedido, historico){
    var precoQuantidade = 0;
    for(var i in historico){
        var list = historico[i];
        for(var produto in list){
            if(list[produto][0].codigo_venda == codigoPedido){
                console.log(list[produto][0].totalPorProduto)
                precoQuantidade = Number(list[produto][0].quantidade) + precoQuantidade;
            }
        }
    }
    return precoQuantidade;
}

function card_historico(produto, precoPedido){
    var iconePagamento;
    //produto.pagamento = "PIX";
    switch(produto.forma_pagamento){
        case "PIX":
            iconePagamento = "../assets/images/metodos-pagamento/icone-pix.svg";
            break;
        case "BOLETO":
            iconePagamento = "../assets/images/metodos-pagamento/icone-boleto.svg";
            break;
        case "CARTAO":
            iconePagamento = "../assets/images/metodos-pagamento/icone-cartao.svg";
            break;
    }


    var card_principal = document.createElement("div");
    card_principal.setAttribute("class", "card-historico");

    var img = document.createElement("img");
    img.setAttribute("class", "imagem-historico");
    img.src = servidor_imagem + produto.nome_imagem;

    var informacao_historico = document.createElement("div");
    informacao_historico.setAttribute("class", "informacao-historico");

    var area_numero_pedido = document.createElement("div"); 
    area_numero_pedido.setAttribute("class", "area-numero-pedido");

        var titulo_pedido = document.createElement("h4"); 
        titulo_pedido.appendChild(document.createTextNode("Numero do pedido:"));

        var numero_pedido = document.createElement("h4");
        numero_pedido.style.marginLeft = "10px";
        numero_pedido.setAttribute("id", "numero-pedido-dinamico");
        numero_pedido.appendChild(document.createTextNode(produto.codigo_venda));


    area_numero_pedido.appendChild(titulo_pedido);
    area_numero_pedido.appendChild(numero_pedido);

    var data_pedido = document.createElement("h5");
    data_pedido.setAttribute("class", "data-pedido-dinamico");
    data_pedido.appendChild(document.createTextNode(produto.data));

    var metodo_pagamento = document.createElement("p");
    metodo_pagamento.appendChild(document.createTextNode("Método de pagamento:"));

    var area_pagamento =  document.createElement("div");
    area_pagamento.setAttribute("class", "metodo-pagemento");
        var image_svg = document.createElement("object");
        image_svg.setAttribute("type", "image/svg+xml");
        image_svg.setAttribute("data", iconePagamento);
        image_svg.width = "20px";
        image_svg.height = "20px";
        var metodo_dinamico = document.createElement("p");
        metodo_dinamico.setAttribute("id", "metodo-pagemento-dinamico");
        metodo_dinamico.appendChild(document.createTextNode(produto.forma_pagamento))
    area_pagamento.appendChild(image_svg);
    area_pagamento.appendChild(metodo_dinamico);


    var endereco = document.createElement("div");
    endereco.setAttribute("class", "endereco-pedido");
        var enderecoDinamico = document.createElement("p");
        enderecoDinamico.setAttribute("id", "endereco-pedido-dinamico");
        enderecoDinamico.appendChild(document.createTextNode(produto.endereco)); // endereco aqui
    endereco.appendChild(enderecoDinamico);

    var valorPedido = document.createElement("div");
    valorPedido.setAttribute("class", "valor-pedido");
        var cifrao = document.createElement("h6");
        cifrao.appendChild(document.createTextNode("R$"));
        var valorTotal = document.createElement("h6");
        valorTotal.appendChild(document.createTextNode(precoPedido.toFixed(2)));
    valorPedido.appendChild(cifrao);
    valorPedido.appendChild(valorTotal);

    informacao_historico.appendChild(area_numero_pedido)
    informacao_historico.appendChild(data_pedido)
    informacao_historico.appendChild(metodo_pagamento)
    informacao_historico.appendChild(area_pagamento)
    informacao_historico.appendChild(endereco)
    informacao_historico.appendChild(valorPedido)
    



    card_principal.appendChild(img)
    card_principal.appendChild(informacao_historico)

    return card_principal;

}   



function card_historico_produto(produto){

    var card_principal = document.createElement("div");
    card_principal.setAttribute("class", "card-historico");

    var img = document.createElement("img");
    img.setAttribute("class", "imagem-historico");
    img.src = servidor_imagem + produto.nome_imagem;

    var informacao_historico = document.createElement("div");
    informacao_historico.setAttribute("class", "informacao-historico");

    var area_numero_pedido = document.createElement("div"); 
    area_numero_pedido.setAttribute("class", "area-numero-pedido");

        var titulo_pedido = document.createElement("h4"); 
        titulo_pedido.appendChild(document.createTextNode(produto.produto));



    area_numero_pedido.appendChild(titulo_pedido);

    var area_quantidade = document.createElement("div");
    area_quantidade.setAttribute("class", "area-quantidade-historico");

        var quantidade = document.createElement("h6");
        quantidade.appendChild(document.createTextNode(produto.quantidade))
        var unidades = document.createElement("p");
        unidades.style.marginLeft = "10px";
        unidades.appendChild(document.createTextNode("Unidades"))
    area_quantidade.appendChild(quantidade)
    area_quantidade.appendChild(unidades)


    var endereco = document.createElement("div");
    endereco.setAttribute("class", "endereco-pedido");
        var enderecoDinamico = document.createElement("p");
        enderecoDinamico.setAttribute("id", "endereco-pedido-dinamico");
        enderecoDinamico.appendChild(document.createTextNode("Total por produto")); // endereco aqui
    endereco.appendChild(enderecoDinamico);

    var valorPedido = document.createElement("div");
    valorPedido.setAttribute("class", "valor-pedido");
        var cifrao = document.createElement("h6");
        cifrao.appendChild(document.createTextNode("R$"));
        var valorTotal = document.createElement("h6");
        valorTotal.appendChild(document.createTextNode(Number(produto.totalPorProduto).toFixed(2)));
    valorPedido.appendChild(cifrao);
    valorPedido.appendChild(valorTotal);

    informacao_historico.appendChild(area_numero_pedido)
    informacao_historico.appendChild(area_quantidade)
    informacao_historico.appendChild(endereco)
    informacao_historico.appendChild(valorPedido)
    



    card_principal.appendChild(img)
    card_principal.appendChild(informacao_historico)

    return card_principal;

}   