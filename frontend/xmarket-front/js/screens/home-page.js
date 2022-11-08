import request_API from "../services/request_API.js";
import Produto from "../Produto.js"

localStorage.ultimaPagina = "home-page.html";

popular_ofertas_dia();
popular_mais_vendidos();

async function popular_mais_vendidos(){
    const area_produtos = document.getElementById("area-mais-vendidos");

    const endPoint = "https://localhost/produtos";
    const response = await request_API("GET", endPoint);

    if(response.status == 200){
        const dados = await response.json();

        dados.forEach((element) => {
            let produto = new Produto(element);
            area_produtos.appendChild(produto.criarCardProduto())
        });
    }
}

async function popular_ofertas_dia(){
    const area_produtos = document.getElementById("area-promocoes-dia");

    const endPoint = "https://localhost/produtos";
    const response = await request_API("GET", endPoint);

    if(response.status == 200){
        const dados = await response.json();

        dados.forEach((element) => {
            let produto = new Produto(element);
            area_produtos.appendChild(produto.criarCardProduto())
        });
    }
}


