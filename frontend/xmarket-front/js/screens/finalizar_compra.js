import Cliente from "../Cliente.js";
import Produto from "../Produto.js";
import request_API from "../services/request_API.js";
import mensagemValidacao from "../services/mensagemValidacao.js"



let idUsuario;
let opcaoSelecionada;

if (localStorage.cliente) {
    let cliente = new Cliente(JSON.parse(localStorage.cliente));
    idUsuario = cliente.id;

    let primeiraParteEndereco = document.getElementById("rua-numero-bairro");
    let segundaParteEndereco = document.getElementById("cidade-estado");

    let endereco = cliente.enderecoSeparado()

    primeiraParteEndereco.innerHTML = endereco.rua + ", " + endereco.numero + ", " + endereco.bairro;
    segundaParteEndereco.innerHTML = endereco.municipio + ", " + endereco.estado;

    preencherDados(cliente.id)
}
const pagamentoPix = document.getElementById("pix");
const pagamentoCartao = document.getElementById("cartao");
const pagamentoBoleto = document.getElementById("boleto");
const botaoFinalizarCompra = document.getElementById("finalizar-compra");

const totalProdutos = document.getElementById("total-somado");


pagamentoPix.addEventListener("click", function () {
    controleSelecao(pagamentoPix);
    opcaoSelecionada = "PIX";

});
pagamentoCartao.addEventListener("click", function () {
    controleSelecao(pagamentoCartao);
    opcaoSelecionada = "CARTAO";

});
pagamentoBoleto.addEventListener("click", function () {
    controleSelecao(pagamentoBoleto);
    opcaoSelecionada = "BOLETO";
});

botaoFinalizarCompra.addEventListener("click", function () {
    const pagamentoSelecionado = document.querySelector(".selected-payment")
    if (pagamentoSelecionado) {
        finalizar_compra();
    } else {
        mensagemValidacao("Forma de pagamento não reconhecida", "Por favor selecione uma forma de pagamento.", "erro", true);
    }
})


function controleSelecao(componente) {
    let selectedPayment = document.querySelector(".selected-payment")

    if (selectedPayment) {
        selectedPayment.removeAttribute("class");
        componente.setAttribute("class", "selected-payment");
    } else {
        componente.setAttribute("class", "selected-payment");
    }

}

async function preencherDados(idUsuario) {
    let dados;
    const response = await request_API("GET", `https://localhost/carrinho/${idUsuario}`);

    if (response.ok != true) return



    try {
        dados = await response.json();
    } catch (err) {
        mensagemValidacao("Não possui itens em seu carrinho!", "Você sera redirecionado para pagina principal, para continuar com suas compras.", "erro", true);
        const confirmar = document.getElementById("confirmar-operacao");
        confirmar.addEventListener("click", function () {
            window.location.href = "home-page.html"
        })
    }

    dados.forEach(item => {
        let produto = new Produto(item.produtoDTO);
        console.log(item.produtoDTO)
        lista_produtos_calculo(produto, item.quantidade); //idProduto, nomeProduto, marca, quantidade, preco

    });
    calcular_soma()
}




function lista_produtos_calculo(produto, quantidade) {
    let valorProduto = document.createElement("div");
    valorProduto.setAttribute("class", "valor-produto");
    valorProduto.setAttribute("id", `valor-produto-${produto.id}`);

    let previewProduto = document.createElement("div");
    let second = document.createElement("div");

    previewProduto.setAttribute("class", "preview-produto");

    let _produto = document.createElement("p");
    let _multiplicacao = document.createElement("p");
    let _quantidade = document.createElement("p");
    _quantidade.setAttribute("id", `quantidade-produto-${produto.id}`);
    second.style.width = "40px"
    second.style.display = "flex";

    _produto.appendChild(document.createTextNode(`${produto.nome} - ${produto.marca}`));
    _multiplicacao.appendChild(document.createTextNode(`x ${'\u00A0' + '\u00A0' + '\u00A0' + '\u00A0'}`));
    _quantidade.appendChild(document.createTextNode(`${quantidade}`));

    second.appendChild(_multiplicacao);
    second.appendChild(_quantidade);

    previewProduto.appendChild(_produto);
    previewProduto.appendChild(second);
    // previewProduto.appendChild(_multiplicacao);    
    // previewProduto.appendChild(_quantidade);

    let somaProduto = document.createElement("div");
    somaProduto.setAttribute("class", "soma-produto");

    let _real = document.createElement("p");
    let _preco = document.createElement("p");
    _preco.setAttribute("id", `preco-produto-${produto.id}`);

    _real.appendChild(document.createTextNode("R$"));
    _preco.appendChild(document.createTextNode((produto.preco * quantidade).toFixed(2)));

    somaProduto.appendChild(_real);
    somaProduto.appendChild(_preco);

    valorProduto.appendChild(previewProduto);
    valorProduto.appendChild(somaProduto);


    let pagamentoDeProdutos = document.getElementById("payment-products");
    pagamentoDeProdutos.appendChild(valorProduto);


}

function calcular_soma() {
    let totalProdutosCarrinho = 0;

    let maninContainer = document.getElementById("payment-products");

    maninContainer.childNodes.forEach((element) => {
        console.log(element)
        if (element.lastChild !== null) {
            console.log(element[0])
            totalProdutosCarrinho = totalProdutosCarrinho + parseFloat(element.lastChild.lastChild.innerHTML);
        }
    });

    totalProdutos.innerHTML = 0;

    totalProdutos.innerHTML = (totalProdutosCarrinho).toFixed(2);

    //produtos-somados
}

function finalizar_compra() {
    const venda = {
        "enumPagamento": opcaoSelecionada,
        "valorTotal": totalProdutos.innerHTML
    }


    let endPoint = `https://localhost/venda/${idUsuario}`;

    let response = async function () {
        const response = await request_API("POST", endPoint, venda);
        if (response.ok == true) {
            let result = await response.text();
            if (result == "") {

                mensagemValidacao("Sucesso, Obrigado pela compra!", "Comprovante enviado para email", "sucesso", false, 3000);


                setTimeout(() => {
                    window.location.href = "home-page.html"
                }, 2000);

            } else {
                console.log("codigos do produtos")
                console.log(result)
            }
        }
    }
    response()
}