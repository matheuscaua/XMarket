import Produto from "../Produto.js";
import request_API from "../services/request_API.js";
import mensagemValidacao from "../services/mensagemValidacao.js"

localStorage.ultimaPagina = "carrinho.html"
let idUsuario;
let dados;

if (localStorage.cliente) idUsuario = JSON.parse(localStorage.cliente).id;


let finalizarCompra = document.getElementById("finalizar-compra");
let cleanCart = document.getElementById("button-clean-cart");
let returnToProduto = document.getElementById("button-return");

//
let totalProdutos = document.getElementById("total-somado");
//

const quantidadeCarrinho = document.getElementById("quantidade-carrinho");


const servidorImagens = "http://127.0.0.1:5500/"
let logado = localStorage.logado;

if (logado == "false" || logado == "" || logado == undefined) {

    popular_carrinho_deslogado();
} else if (logado == "true") {

    popular_carrinho_logado();
}


finalizarCompra.addEventListener('click', comprar_agora);

returnToProduto.addEventListener('click', () => {
    window.location.href = "produtos.html";
});


function popular_carrinho_deslogado() {
    if (localStorage.carrinho == undefined || localStorage.carrinho == ""){
        mensagemValidacao("Carrinho vazio!", "voce será redirecionado para pagina princiapal", "erro", true);
        setTimeout(function () {
            window.location.href = "home-page.html"
        }, 3000)
        return;
    }
    let carrinhoLocal = JSON.parse(localStorage.carrinho);

    if (carrinhoLocal != undefined && carrinhoLocal != "") {
        console.log(carrinhoLocal);
        for (let id in carrinhoLocal) {
            const item = carrinhoLocal[id];

            if(item.quantidade > item.produto.quantidade){
                mensagemValidacao("Voce possui algum produto com quantidade maior do que a disponivel!", "Verique seus produtos.", "erro", true)
            }

            let produto = new Produto(item.produto);
            console.log("🚀 ~ file: carrinho.js ~ line 193 ~ produto", produto.imagemUrl)
            
            const imagemReferencia =produto.imagemUrl;
            if(!imagemReferencia.includes(servidorImagens)){
                produto.imagemUrl = servidorImagens + produto.imagemUrl;
            }



            card_item(item.quantidade, produto);
            lista_produtos_calculo(produto, item.quantidade);

            // Input da quantidade do produto
            let qtdProduto = document.getElementById(`input-qtd-${id}`);

            // Botoes de controle do produto
            let btnLess = document.getElementById(`less-qtd-${id}`);
            let btnMore = document.getElementById(`more-qtd-${id}`);
            let deleteButton = document.getElementById(`delete-button-${id}`);
            let inputQuantidade = document.getElementById(`input-qtd-${id}`);

            // Adicionando funções aos botões
            btnLess.addEventListener('click', () => {
                if (parseInt(qtdProduto.value) > 1) {
                    qtdProduto.value = parseInt(qtdProduto.value) - 1;

                    let precoProduto = document.getElementById(`preco-produto-${produto.id}`); //quantidade-produto
                    let quantidadeProduto = document.getElementById(`quantidade-produto-${produto.id}`);

                    precoProduto.innerHTML = (produto.preco * inputQuantidade.value).toFixed(2);
                    quantidadeProduto.innerHTML = inputQuantidade.value;

                    quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) - 1;
                    

                    carrinhoLocal[`${id}`] = {
                        "produto": produto.salvarCarrinho(),
                        "quantidade": carrinhoLocal[`${id}`].quantidade - 1
                    };
                    localStorage.carrinho = JSON.stringify(carrinhoLocal);
                    calcular_soma()
                }
            });

            btnMore.addEventListener('click', () => {
                if (parseInt(qtdProduto.value) < 20 && parseInt(qtdProduto.value) < item.produto.quantidade) {
                    qtdProduto.value = parseInt(qtdProduto.value) + 1;

                    let precoProduto = document.getElementById(`preco-produto-${produto.id}`);
                    let quantidadeProduto = document.getElementById(`quantidade-produto-${produto.id}`);

                    precoProduto.innerHTML = (produto.preco * inputQuantidade.value).toFixed(2);
                    quantidadeProduto.innerHTML = inputQuantidade.value;

                    quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) + 1;
                    localStorage.setItem("quantidade-carrinho", quantidadeCarrinho.innerHTML);
                    

                    carrinhoLocal[`${id}`] = {
                        "produto": produto.salvarCarrinho(),
                        "quantidade": carrinhoLocal[`${id}`].quantidade + 1
                    };
                    localStorage.carrinho = JSON.stringify(carrinhoLocal);

                    calcular_soma();
                    //window.location.href = "carrinho.html";
                }
            });

            deleteButton.addEventListener('click', () => {
                delete carrinhoLocal[`${produto.id}`];
                console.log(carrinhoLocal);
                localStorage.carrinho = JSON.stringify(carrinhoLocal);
                window.location.href = "carrinho.html";
            });
        }
        // calcular soma apos preencher os produtos
        cleanCart.addEventListener('click', function () {
            delete localStorage.carrinho;
            window.location.href = "produtos.html";
        })
        calcular_soma();
    } 

}

function validarProdutosDispoveisLocal(){
    const carrinhoLocal = JSON.parse(localStorage.carrinho);
    let todosDisponiveis = true;
    for(let id in carrinhoLocal){
        const item = carrinhoLocal[id]
        if(item.quantidade > item.produto.quantidade) todosDisponiveis = false;
    }

    return todosDisponiveis;
}

async function validarProdutosDispoveis() {
    const respose = await request_API("GET", `https://localhost/carrinho/${idUsuario}`);
    console.log(respose)
    if (respose.status != 200 && respose.status != 201) return
    dados = await respose.json();
    let todosTemEstoque = true;
    dados.forEach(item => {
        let id = item.produtoDTO.id;
        let inputQuantidade = document.getElementById(`input-qtd-${id}`);

        if (inputQuantidade.value > item.produtoDTO.quantidade) {
            todosTemEstoque = false;
            return false;

        }

    })

    return todosTemEstoque ? true : false;
}

async function popular_carrinho_logado() {
    const respose = await request_API("GET", `https://localhost/carrinho/${idUsuario}`);
    console.log(respose)
    if (respose.status == 204) {
        mensagemValidacao("Carrinho vazio!", "voce será redirecionado para pagina princiapal", "erro", true);

        setTimeout(function () {
            window.location.href = "home-page.html"
        }, 4000)
    }
    if (respose.status != 200 && respose.status != 201) return
    dados = await respose.json();

    dados.forEach(item => {
        let produto = new Produto(item.produtoDTO);
        let id = produto.id;

        console.log("🚀 ~ file: carrinho.js ~ line 310 ~ produto.imagemUrl", produto.imagemUrl)
        produto.imagemUrl = servidorImagens + produto.imagemUrl;
        console.log("🚀 ~ file: carrinho.js ~ line 312 ~ produto.imagemUrl", produto.imagemUrl)

        // Criação dinamicamente do produto no carrinho
        card_item(item.quantidade, produto);
        lista_produtos_calculo(produto, item.quantidade); //idProduto, nomeProduto, marca, quantidade, preco

        // Input da quantidade do produto
        let qtdProduto = document.getElementById(`input-qtd-${id}`);

        // Botoes de controle do produto
        let btnLess = document.getElementById(`less-qtd-${id}`);
        let btnMore = document.getElementById(`more-qtd-${id}`);
        let deleteButton = document.getElementById(`delete-button-${id}`);
        let inputQuantidade = document.getElementById(`input-qtd-${id}`);

        if (inputQuantidade.value > item.produtoDTO.quantidade) {
            mensagemValidacao("Voce possui algum produto com quantidade maior do que a disponivel!", "Verique seus produtos.", "erro", true)
        }

        // Adicionando funções aos botões
        btnLess.addEventListener('click', () => {
            if (parseInt(qtdProduto.value) > 1) {
                qtdProduto.value = parseInt(qtdProduto.value) - 1;

                let precoProduto = document.getElementById(`preco-produto-${id}`); //quantidade-produto
                let quantidadeProduto = document.getElementById(`quantidade-produto-${id}`);

                precoProduto.innerHTML = (produto.preco * inputQuantidade.value).toFixed(2);
                quantidadeProduto.innerHTML = inputQuantidade.value;
                let endPoint = `https://localhost/carrinho/${idUsuario}/alterar/${id}/DIMINUIR`;
                request_API("PUT", endPoint);

                quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) - 1;
                localStorage.setItem("quantidade-carrinho", quantidadeCarrinho.innerHTML);
                calcular_soma()
            }
        });

        btnMore.addEventListener('click', async() => {
            if (parseInt(qtdProduto.value) < 20 && parseInt(qtdProduto.value) < item.produtoDTO.quantidade) {
                qtdProduto.value = parseInt(qtdProduto.value) + 1;

                let precoProduto = document.getElementById(`preco-produto-${id}`);
                let quantidadeProduto = document.getElementById(`quantidade-produto-${id}`);

                precoProduto.innerHTML = (produto.preco * inputQuantidade.value).toFixed(2);
                quantidadeProduto.innerHTML = inputQuantidade.value;

                console.log("aumetar")
                console.log(idUsuario)
                console.log(id)
                let endPoint =`https://localhost/carrinho/${idUsuario}/alterar/${id}/AUMENTAR`;

                let response = await request_API("PUT", endPoint);

                console.log(response)

                quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) + 1;
                localStorage.setItem("quantidade-carrinho", quantidadeCarrinho.innerHTML);
                calcular_soma()
                //window.location.href = "carrinho.html";
            }
        });

        deleteButton.addEventListener('click', () => {
            let endPoint = `https://localhost/carrinho/${idUsuario}/remover-produto/${id}`;
            request_API("DELETE", endPoint)

            window.location.href = "carrinho.html";
        });
    });
    cleanCart.addEventListener('click', clean_cart);
    calcular_soma();

}




async function comprar_agora() {
    let todosTemEstoque;
    if(localStorage.logado == "true"){
        todosTemEstoque = await validarProdutosDispoveis();
    }
    if(localStorage.logado == "false" || localStorage.logado == undefined){
        todosTemEstoque = validarProdutosDispoveisLocal();
    }



    if (todosTemEstoque == false) {
        mensagemValidacao("Voce possui algum produto com quantidade maior do que a disponivel!", "Verique seus produtos.", "erro", true);
        return
    }

    if (logado == "true") {
        window.location.href = "finalizar-compra.html";
        localStorage.totalVenda = totalProdutos.innerHTML;
    }
    if (logado == "false" || localStorage.logado == undefined) {
        window.location.href = "login.html";
        localStorage.redirecionamento = "finalizar-compra.html";
    }
}


// Falta arrumar a questao de limpar carrinho quando esta logado!!
async function clean_cart() {
    let endPoint = `https://localhost/carrinho/deletar/${idUsuario}`;
    let response = await request_API("DELETE", endPoint);
    if (response.ok == true)
        window.location.href = "produtos.html";
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
            totalProdutosCarrinho = totalProdutosCarrinho + parseFloat(element.lastChild.lastChild.innerHTML);
        }
    });

    totalProdutos.innerHTML = 0;

    totalProdutos.innerHTML = (totalProdutosCarrinho).toFixed(2);

    //produtos-somados
}


function card_item(quantidade, produtoDTO) {

    let product_item = document.createElement("div");
    product_item.setAttribute("class", "products-item");

    let f_infos = first_infos(produtoDTO);
    let s_infos = second_infos(quantidade, produtoDTO);

    product_item.appendChild(f_infos);
    product_item.appendChild(s_infos);

    document.getElementById("products-area").appendChild(product_item);
}

function first_infos(produtoDTO) {
    let first_infos = document.createElement("div");
    first_infos.setAttribute("class", "first-infos");

    let image_item = document.createElement("div");
    image_item.setAttribute("class", "image-item");

    let image = document.createElement("img");
    image.src = produtoDTO.imagemUrl;

    image_item.appendChild(image);

    let description_item = document.createElement("div");

    let container_nomes = document.createElement("div");
    let second_description = document.createElement("div");

    let _nome = document.createElement("h4");

    let _marca = document.createElement("h6");
    let _preco = document.createElement("h3");

    description_item.setAttribute("class", "description-item");
    container_nomes.setAttribute("class", "container-description");



    let conteudo_nome = document.createTextNode(produtoDTO.nome);
    let conteudo_marca = document.createTextNode(produtoDTO.marca);
    let conteudo_preco = document.createTextNode("R$" + produtoDTO.preco);

    _nome.appendChild(conteudo_nome);
    _marca.appendChild(conteudo_marca);
    _preco.appendChild(conteudo_preco);

    second_description.appendChild(_marca);
    //second_description.appendChild(_preco);
    second_description.setAttribute("class", "second-description");
    container_nomes.appendChild(_nome);
    container_nomes.appendChild(second_description);
    container_nomes.appendChild(_preco);

    description_item.appendChild(container_nomes);
    description_item.appendChild(container_nomes);
    //description_item.appendChild(_preco);

    first_infos.appendChild(image_item);
    first_infos.appendChild(description_item);

    return first_infos;
}

function second_infos(quantidade, produtoDTO) {
    let id = produtoDTO.id;

    let second_infos = document.createElement("div");
    second_infos.setAttribute("class", "second-infos");

    let btn_less = document.createElement("div");
    let btn_more = document.createElement("div");
    let form_quantidade = document.createElement("div");
    let input_quantidade = document.createElement("input");
    let control_quantidade = document.createElement("div");
    let delete_button = document.createElement("div");
    let trash_icon = document.createElement("i");
    let text_remover = document.createElement("p");

    control_quantidade.setAttribute("class", "area-control");
    delete_button.setAttribute("class", "delete-button");
    trash_icon.setAttribute("class", "fa-regular fa-trash-can"); //<i class="fa-regular fa-trash-can"></i>

    btn_less.appendChild(document.createTextNode("-"));
    btn_more.appendChild(document.createTextNode("+"));
    btn_less.setAttribute("id", `less-qtd-${id}`);
    btn_more.setAttribute("id", `more-qtd-${id}`);
    delete_button.setAttribute("id", `delete-button-${id}`);

    btn_less.setAttribute("class", "control-count");
    btn_more.setAttribute("class", "control-count");

    input_quantidade.setAttribute("class", "control-count");
    input_quantidade.setAttribute("type", "text");
    input_quantidade.setAttribute("id", `input-qtd-${id}`); //disabled="disabled"
    input_quantidade.setAttribute("disabled", 'disabled');

    input_quantidade.value = quantidade;

    form_quantidade.setAttribute("class", "form-outline"); //document.createTextNode("Remover")
    form_quantidade.style.height = "30px";

    form_quantidade.appendChild(input_quantidade);

    control_quantidade.appendChild(btn_less);
    control_quantidade.appendChild(form_quantidade);
    control_quantidade.appendChild(btn_more);

    text_remover.appendChild(document.createTextNode("Remover"))

    delete_button.appendChild(trash_icon);
    delete_button.appendChild(text_remover);
    let blocoQuantidade = document.createElement("div")
    blocoQuantidade.setAttribute("class", "quantidade-estoque")
    let quantidadeNumero = document.createElement("h6");
    quantidadeNumero.appendChild(document.createTextNode(`${produtoDTO.quantidade}`))
    let textoEmEstoque = document.createTextNode("Em estoque")

    blocoQuantidade.appendChild(quantidadeNumero);
    blocoQuantidade.appendChild(textoEmEstoque)

    second_infos.appendChild(blocoQuantidade);
    second_infos.appendChild(control_quantidade);
    second_infos.appendChild(delete_button);


    return second_infos;
}