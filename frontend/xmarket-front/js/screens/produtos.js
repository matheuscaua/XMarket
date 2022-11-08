import request_API from "../services/request_API.js";
import Produto from "../Produto.js";
import mensagemValidacao from "../services/mensagemValidacao.js"



localStorage.ultimaPagina = "produtos.html";

let idUsuario;

const logado = localStorage.logado;
if (logado == "true") {
    idUsuario = JSON.parse(localStorage.cliente).id;
}

// Variaveis para controlar icone no carrinho
const canvaQuantidadeCarrinho = document.getElementById("canva-quantidade-carrinho");
const quantidadeCarrinho = document.getElementById("quantidade-carrinho");


popular_produtos();


async function popular_produtos() {
    let endPoint;
    let areaProdutos;
    let response;
    let dados;

    endPoint = "https://localhost/produtos";

    areaProdutos = document.getElementById("product-container");
    areaProdutos.innerHTML = "";

    response = await request_API("GET", endPoint);
    console.log(response)
    if (response.status != 200) {
        mensagemValidacao("Estamos com instabilidade no sistema!", "Por favor tente novamente mais tarde.", "erro", true);
        return
    }

    dados = await response.json()

    document.getElementById("numero-ocorrencias").innerHTML = Object.keys(dados).length;

    console.log(Object.keys(dados).length)

    dados.forEach((produtoDto) => {
        if (produtoDto.quantidade > 0) {

            let produto = new Produto(produtoDto);
            let id = produto.id;
            console.log(id)
            let cardProduto = produto.criarCardProduto();

            areaProdutos.appendChild(cardProduto)

            //product_produto(produto, id)

            let btnEvent = document.getElementById(`submit-${id}`);

            btnEvent.addEventListener('click', () => {
                if (logado == "true") {
                    adicionar_produto_carrinho(produto["id"], idUsuario, 1)

                }
                if (logado == "false" || logado == "" || logado == undefined) {
                    let carrinhoLocal = localStorage.carrinho;

                    if (carrinhoLocal == undefined || carrinhoLocal == "") {
                        let carrinho = {};
                        carrinho[`${id}`] = {
                            "produto": produto.salvarCarrinho(),
                            "quantidade": 1
                        };


                        localStorage.carrinho = JSON.stringify(carrinho);

                        canvaQuantidadeCarrinho.style.display = "flex";
                        quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) + 1;

                        mensagemValidacao("Produto adicionado no carrinho", "Confira no seu carrinho.", "sucesso", false)

                    } else {

                        if (!carrinhoLocal) return;

                        var carrinho = JSON.parse(carrinhoLocal);
                        if (carrinho[`${id}`]) {
                            carrinho[`${id}`] = {
                                "produto": produto.salvarCarrinho(),
                                "quantidade": carrinho[`${id}`].quantidade + 1
                            };

                        } else {
                            carrinho[`${id}`] = {
                                "produto": produto.salvarCarrinho(),
                                "quantidade": 1
                            };
                        }

                        localStorage.carrinho = JSON.stringify(carrinho);

                        canvaQuantidadeCarrinho.style.display = "flex";
                        quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) + 1;

                        mensagemValidacao("Produto adicionado no carrinho", "Confira no seu carrinho.", "sucesso", false)

                    }
                }

            });
        }
    });
}

async function adicionar_produto_carrinho(id_produto, id_usuario, quantidade) {
    let endPoint = `https://localhost/carrinho/${id_usuario}/adicionar/${id_produto}`;

    await request_API("POST", endPoint);


    quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) + 1;

    canvaQuantidadeCarrinho.style.display = "flex";
    quantidadeCarrinho.style.display = "flex";

    mensagemValidacao("Produto adicionado no carrinho", "Confira no seu carrinho.", "sucesso", false)

}
