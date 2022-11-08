import request_API from "../services/request_API.js";
import mensagemValidacao from "../services/mensagemValidacao.js"

// Area de botoes
let botaoLogar = document.getElementById("login");
let botaoCadastrar = document.getElementById("cadastrar");

botaoLogar.addEventListener('click', async function () {
    let cliente;
    let endPoint;
    let response;

    cliente = {
        "email": document.getElementById("email").value,
        "senha": document.getElementById("senha").value
    }
    endPoint = "https://localhost/cliente/logar";
    response = await request_API("POST", endPoint, cliente)

    console.log(response)

    if (response.status == 200) {
        const cliente = await response.json();

        const redirecionamento = localStorage.redirecionamento;

        localStorage.logado = true;
        localStorage.cliente = JSON.stringify(cliente);

        await adicionar_no_carrinho(cliente.id);

        window.location.href = redirecionar(redirecionamento);
    }

    if (response.status == 401) {
        console.log("aqui")
        mensagemValidacao("Usuario ou Senha invalida!", "Por favor tente novamente.", "erro", true)
    }

    if (response.status == 500) {
        mensagemValidacao("Estamos com instabilidade no sistema!", "Por favor tente novamente mais tarde.", "erro", true);
    }
});

botaoCadastrar.addEventListener('click', function () {
    window.location.href = "cadastro.html";
})



function redirecionar(pagina) {
    switch (pagina) {
        case "finalizar-compra.html":
            return pagina;

        default:
            if (localStorage.ultimaPagina)
                return localStorage.ultimaPagina

            return "home-page.html";
    }
}

async function adicionar_no_carrinho(idCliente) {
    if (localStorage.carrinho != undefined) {
        let carrinhoLocal = JSON.parse(localStorage.carrinho);

        for (let id in carrinhoLocal) {
            const item = carrinhoLocal[id]
            const produto = item.produto;
            let quantidade = item.quantidade;

            while (quantidade > 0) {
                const endPoint = `https://localhost/carrinho/${idCliente}/adicionar/${produto.id}/`;
                let response = await request_API("POST", endPoint);

                quantidade = quantidade - 1;
            }
        }

        localStorage.removeItem("carrinho");
    }
}