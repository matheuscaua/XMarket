import Cliente from "../Cliente.js";
import Produto from "../Produto.js";

import manipuladorDasFuncionalidades from "./controladores/manipuladorDasFuncionalidades.js";
import manipuladorDosCampos from "./controladores/manipuladorDosCampos.js";

import request_API from "../services/request_API.js";
import request_API_imagem from "../services/service_imagem.js";
import mensagemValidacao from "../services/mensagemValidacao.js"

// opção selecionada por padrão é a home
localStorage.setItem("option", "home");

manipuladorDasFuncionalidades();

// Painel onde as informações entrarão
let panel = document.getElementById("panel");

// Formularios de Cliente
var cadastroCliente = document.querySelector(".cadastrar-cliente");
var modificarCliente = document.querySelector(".modificar-cliente");
var removerCliente = document.querySelector(".remover-cliente");

// Formularios de Produto
var cadastroProduto = document.querySelector(".cadastrar-produto");
var modificarProduto = document.querySelector(".modificar-produto");
var removerProduto = document.querySelector(".remover-produto");

var listar = document.querySelector(".listar");

//const camposModificarProduto = manipuladorDosCampos.modificarProduto();
const camposCadastrarCliente = manipuladorDosCampos.cadastrarCliente;
const camposModificarCliente = manipuladorDosCampos.modificarCliente;
const camposRemoverCliente = manipuladorDosCampos.removerCliente;

const camposCadastrarProduto = manipuladorDosCampos.cadastrarProduto;
const camposModificarProduto = manipuladorDosCampos.modificarProduto;
const camposRemoverProduto = manipuladorDosCampos.removerProduto;



const nomeAdm = document.getElementById("nome-dinamico")
const cargoAdm = document.getElementById("cargo-dinamico")

const adm = JSON.parse(localStorage.administrador);


nomeAdm.innerHTML = adm.nome
cargoAdm.innerHTML = adm.cargo




let closeBtn = document.getElementById("close");
function fecharTudo() {
    panel.style.display = "none";

    cadastroCliente.style.display = "none";
    modificarCliente.style.display = "none";
    removerCliente.style.display = "none";


    cadastroProduto.style.display = "none";
    modificarProduto.style.display = "none";
    removerProduto.style.display = "none";

    listar.style.display = "none";
    listContent.innerHTML = null;
    headerTable.innerHTML = null;

    manipuladorDosCampos.limparCampos(camposCadastrarCliente);
    manipuladorDosCampos.limparCampos(camposModificarCliente);
    manipuladorDosCampos.limparCampos(camposRemoverCliente);


    manipuladorDosCampos.limparCampos(camposCadastrarProduto);
    manipuladorDosCampos.limparCampos(camposModificarProduto);
    manipuladorDosCampos.limparCampos(camposRemoverProduto);

    unblockInputs(false, camposModificarProduto);

    document.getElementById("imagem-modificar-produto-preview").src = "http://127.0.0.1:5500/default.png";
    document.getElementById("imagem-modificar-produto-preview").name = "default.png";

    document.getElementById("imagem-cadastrar-produto-preview").src = "http://127.0.0.1:5500/default.png"; //
    document.getElementById("imagem-cadastrar-produto-preview").name = "default.png";

    document.getElementById("imagem-remover-produto-preview").src = "http://127.0.0.1:5500/default.png"; //
    document.getElementById("imagem-remover-produto-preview").name = "default.png";
}
closeBtn.addEventListener("click", fecharTudo);
//

function monstrarPainel(opcaoCliente, opcaoProduto) {
    
    panel.style.display = "inline";


    if (localStorage.getItem("option") == "clientes") {
        opcaoCliente.style.display = "inline";
    }
    if (localStorage.getItem("option") == "produtos") {
        opcaoProduto.style.display = "inline";
    }
}

document.getElementById("opcao-cadastrar").addEventListener("click", function () {

    monstrarPainel(cadastroCliente, cadastroProduto);
});

document.getElementById("opcao-modificar").addEventListener("click", function () {

    monstrarPainel(modificarCliente, modificarProduto);
});

document.getElementById("opcao-listar").addEventListener("click", async function () {
    let opcao = localStorage.getItem("option");
    let response;

    panel.style.display = "inline";
    listar.style.display = "inline";

    if (opcao == "clientes") {

        let endPoint = "https://localhost/administrador/clientes";
        response = await request_API("GET", endPoint);

        if (response.status == 200 || response.status == 201) {
            const dados = await response.json();
            console.log(dados)
            listarClientes(dados);
        } else {
            mostrarMensagem("Erro ao listar Clientes!");
        }

    }
    if (opcao == "produtos") {

        let endPoint = "https://localhost/administrador/estoque";
        response = await request_API("GET", endPoint);

        if (response.status == 200 || response.status == 201) {
            const dados = await response.json();
            listarProdutos(dados);
        } else {
            mostrarMensagem("Erro ao listar Produtos!");
        }
    }

});
document.getElementById("opcao-remover").addEventListener("click", function () {
    monstrarPainel(removerCliente, removerProduto);
});


let listContent = document.getElementById("list-content");
let headerTable = document.getElementById("header-table");

function listarProdutos(dados) {

    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");
    let th4 = document.createElement("th");
    let th5 = document.createElement("th");


    th1.appendChild(document.createTextNode("Id"))
    th2.appendChild(document.createTextNode("Nome"))
    th3.appendChild(document.createTextNode("Marca"))
    th4.appendChild(document.createTextNode("Preço"))
    th5.appendChild(document.createTextNode("Quantidade"))

    headerTable.appendChild(th1);
    headerTable.appendChild(th2);
    headerTable.appendChild(th3);
    headerTable.appendChild(th4);
    headerTable.appendChild(th5);

    dados.forEach((element) => {
        let produto = new Produto(element);

        let row = produto.listarParaTabela();
        listContent.appendChild(row);

    });
}

function listarClientes(dados) {
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");
    let th4 = document.createElement("th");
    let th5 = document.createElement("th");
    let th6 = document.createElement("th");
    let th7 = document.createElement("th");

    th1.style.width = "2%";
    th2.style.width = "10%";
    th3.style.width = "10%";
    th4.style.width = "10%";
    th5.style.width = "10%";
    th6.style.width = "10%";

    th1.appendChild(document.createTextNode("Id"));
    th2.appendChild(document.createTextNode("Nome"));
    th3.appendChild(document.createTextNode("Email"));
    th4.appendChild(document.createTextNode("Cpf"));
    th5.appendChild(document.createTextNode("Rg"));
    th6.appendChild(document.createTextNode("Telefone"));
    th7.appendChild(document.createTextNode("Endereço"));

    headerTable.appendChild(th1);
    headerTable.appendChild(th2);
    headerTable.appendChild(th3);
    headerTable.appendChild(th4);
    headerTable.appendChild(th5);
    headerTable.appendChild(th6);
    headerTable.appendChild(th7);

    dados.forEach((element) => {
        let cliente = new Cliente(element);
        
        if(element.usuarioAtivo == false) return;

        let row = cliente.listarParaTabela();
        listContent.appendChild(row);

    });
}

/*
let canvaMensagemValidacao = document.querySelector(".canva-mensagem");

let mensagemValidacao = document.querySelector(".mensagem");

let fecharCanva = document.getElementById("fechar-mensagem");
fecharCanva.addEventListener("click", function () {
    canvaMensagemValidacao.style.display = "none";

    fecharTudo();

    //limpar mensagem
    let mensagem = document.getElementById("mensagem-validacao");
    mensagemValidacao.removeChild(mensagem);

})
*/



let canvaMensagemValidacao = document.querySelector(".canva-mensagem");
let mensagemValidacaoAdmin = document.querySelector(".mensagem-adm");

function mostrarMensagem(dialog) {
    let mensagens = document.querySelectorAll("#mensagem-validacao");

    if (mensagens.length == 0) {
        let mensagem = document.createElement("h4");
        mensagem.setAttribute("id", "mensagem-validacao");
        mensagem.appendChild(document.createTextNode(dialog));

        mensagemValidacaoAdmin.appendChild(mensagem);

        canvaMensagemValidacao.style.display = "inline";
    }


}

//-----------------------ID - modificar -----------------------

let idModificarProduto = camposModificarProduto.id;
idModificarProduto.addEventListener("keydown", async function (evt) {
    if (evt.key == "Enter" && Number(idModificarProduto.value)) {
        var endPoint = `https://localhost/administrador/estoque/buscar/${idModificarProduto.value}`;
        var response = await request_API("GET", endPoint);

        if (response.status == 200) {
            const dados = await response.json();
            console.log("🚀 ~ file: homePage.js ~ line 232 ~ dados", dados)

            var produto = new Produto(dados);

            camposModificarProduto.nome.value = produto.nome;
            camposModificarProduto.marca.value = produto.marca;
            camposModificarProduto.preco.value = produto.preco;
            camposModificarProduto.categoria.value = produto.categoria;
            camposModificarProduto.quantidade.value = produto.quantidade;
            //camposModificarProduto.imagemUrl.name = produto.imagemUrl;

            let preview = document.getElementById("imagem-modificar-produto-preview");
            preview.src = `http://127.0.0.1:5500/${produto.imagemUrl}`;
            preview.name = `${produto.imagemUrl}`;

            unblockInputs(true, camposModificarProduto);
        }
        if(response.status == 404){
            mensagemValidacao("Produto não encontrado na base de dados!", "Por favor verificar o id e tentar novamente.", "erro", true);
        }
    }
})

let idRemoverProduto = manipuladorDosCampos.removerProduto.id;
idRemoverProduto.addEventListener("keydown", async function (evt) {
    if (evt.key == "Enter" && Number(idRemoverProduto.value)) {

        var endPoint = `https://localhost/administrador/estoque/buscar/${idRemoverProduto.value}`;

        var response = await request_API("GET", endPoint);

        if (response.status == 200 || response.status == 201) {
            const dados = await response.json();

            var produto = new Produto(dados);

            manipuladorDosCampos.removerProduto.nome.value = produto.nome;
            manipuladorDosCampos.removerProduto.marca.value = produto.marca;
            manipuladorDosCampos.removerProduto.preco.value = produto.preco;
            manipuladorDosCampos.removerProduto.quantidade.value = produto.quantidade;

            let preview = document.getElementById("imagem-remover-produto-preview");
            preview.src = `http://127.0.0.1:5500/${produto.imagemUrl}`;
            preview.name = `${produto.imagemUrl}`;

            unblockInputs(true, camposModificarProduto);
        } else {
            mostrarMensagem("Erro: Produto não encontrado");
        }



    }
})
/*
imagem-cadastrar-preview
imagem-modificar-preview
*/


// input de cadastrar imagem
const cadastrarImagem = document.getElementById("imagem-cadastrar-produto")
var imagemUpada = "";
cadastrarImagem.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        imagemUpada = reader.result;
        document.getElementById("imagem-cadastrar-produto-preview").src = imagemUpada;

    })

    reader.readAsDataURL(this.files[0]);
    console.log("🚀 ~ file: homePage.js ~ line 334 ~ cadastrarImagem.addEventListener ~ this.files[0]", this.files[0])
})


const modificarImagem = document.getElementById("modificar-produto-imagem")
var imagemUpada = "";
modificarImagem.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        imagemUpada = reader.result;
        document.getElementById("imagem-modificar-produto-preview").src = imagemUpada;
        document.getElementById("imagem-modificar-produto-preview").name = this.files[0].name;


    })
    reader.readAsDataURL(this.files[0]);
})

//const camposModificarCliente = manipuladorDosCampos.modificarCliente();
let idModificarCliente = camposModificarCliente.id;
idModificarCliente.addEventListener("keydown", async function (evt) {
    if (evt.key == "Enter" && Number(idModificarCliente.value)) {
        preencherInformacoesCliente(idModificarCliente, camposModificarCliente);
    }
})

//const camposRemoverCliente = manipuladorDosCampos.removerCliente();
let idRemoverCliente = camposRemoverCliente.id;
idRemoverCliente.addEventListener("keydown", async function (evt) {
    if (evt.key == "Enter" && Number(idRemoverCliente.value)) {
        preencherInformacoesCliente(idRemoverCliente, camposRemoverCliente);
    }
})


async function preencherInformacoesCliente(idCliente, campos) {
    var endPoint = `https://localhost/administrador/clientes/buscar/${idCliente.value}`; // trocar end point
    var response = await request_API("GET", endPoint);

    if (response.status == 200) {
        const dados = await response.json();
        var cliente = new Cliente(dados);

        campos.preencherCampos(cliente);
    } 
    if(response.status == 404) {
        mensagemValidacao("Cliente não encontrado na base de dados!", "Por favor verificar o id e tentar novamente.", "erro", true);
    }

}
//-----------------------------------------------------------------------

//-------------------------Area de botoes submit --------------------------

// -------------------------CLIENTES----------------------

let botaoCadastrarCliente = document.getElementById("botao-cadastrar-cliente");
botaoCadastrarCliente.addEventListener("click", async function () {
    let senha = manipuladorDosCampos.cadastrarCliente.senha.value;
    let confirmarSenha =  manipuladorDosCampos.cadastrarCliente.confirmarSenha.value;

    if(senha =! confirmarSenha){

        mensagemValidacao("Senhas não coincidem!", "Por favor digite novamente.", "erro", true);
        manipuladorDosCampos.cadastrarCliente.confirmarSenha.focus();
        return;
    }

    for(var element in manipuladorDosCampos.cadastrarCliente){
        let input = manipuladorDosCampos.cadastrarCliente[element];

        if(typeof input == "object")
            if(input.value == ""){
                mensagemValidacao("Alguns campos estão vazios!", "Por favor preencher todos os campos.", "erro");
                input.focus();
                return;
            }
    }



    const valoresCamposCadastrarCliente = manipuladorDosCampos.cadastrarCliente.todosValores();
    let cliente = new Cliente(valoresCamposCadastrarCliente);

    console.log("🚀 ~ file: homePage.js ~ line 332 ~ cliente.cadastrar()", cliente.cadastrar())

    const endPoint = "https://localhost/administrador/clientes/cadastrar";
    const response = await request_API("POST", endPoint, cliente.cadastrar());

    console.log(response)

    if (response.status == 201) {
        mensagemValidacao("Cliente cadastrado com sucesso!", "", "sucesso", false);
        fecharTudo();
    } 
    if(response.status == 422){
        mensagemValidacao("Cliente já cadastrado no sistema!", "Verique email, cpf e rg", "erro", true);
    }

})

let botaoModificarCliente = document.getElementById("botao-modificar-cliente");
botaoModificarCliente.addEventListener("click", async function () {
    const cliente = new Cliente(camposModificarCliente.todosValores());
    const endPoint = "https://localhost/administrador/clientes/editar";
    const response = await request_API("PUT", endPoint, cliente.modificar());

    if (response.status == 200 || response.status == 201) {
        mostrarMensagem(`Cliente ${cliente.id} \nmodificado com sucesso!`);
        fecharTudo();
    } else {
        mostrarMensagem("Erro: Incapaz de modificar cliente!");
    }


    manipuladorDosCampos.limparCampos(camposModificarCliente);
})

let botaoRemoverCliente = document.getElementById("botao-remover-cliente");
botaoRemoverCliente.addEventListener("click", async function () {
    confirmarOperacao(removaCliente)
})

async function removaCliente() {
    const idCliente = camposRemoverCliente.todosValores().id;

    const endPoint = `https://localhost/administrador/clientes/deletar/${idCliente}`;
    const response = await request_API("PUT", endPoint);

    if (response.status == 200 || response.status == 201) {
        mostrarMensagem(`Cliente ${idCliente} \nremovido do sistema!`);
        fecharTudo();
    } else {
        mostrarMensagem("Erro: Incapaz de Remover cliente!");
    }

    manipuladorDosCampos.limparCampos(camposRemoverCliente);
}


//const camposCadastrarProduto = manipuladorDosCampos.cadastrarProduto().todosValores();
// ---------------------------PRODUTOS----------------------------------
let botaoCadastrarProduto = document.getElementById("botao-cadastrar-produto");
botaoCadastrarProduto.addEventListener("click", async function () {
    const valoresCamposCadastrarCliente = camposCadastrarProduto.todosValores();
    const produto = new Produto(valoresCamposCadastrarCliente);
    const formData = new FormData();


    produto.imagemUrl = valoresCamposCadastrarCliente.imagemUrl.name;
    formData.append("arquivoImagem", valoresCamposCadastrarCliente.imagemUrl);

    const endPoint = "https://localhost/administrador/estoque/cadastrar-imagem";

    let response = await request_API_imagem(endPoint, formData);


    if (response.status == 201) {
        const endPoint = "https://localhost/administrador/estoque/cadastrar";
        let response = await request_API("POST", endPoint, produto.cadastrar());

        if (response.status == 200 || response.status == 201) {
            mostrarMensagem("Produto cadastrado com sucesso!");
            fecharTudo();
        } else {
            mostrarMensagem("Erro: Sistema incapaz cadastrar produto!");
        }
    } else {
        mostrarMensagem("Erro: Imagem incapaz de ser enviada!");
    }
    console.log("Cadastrado")
    manipuladorDosCampos.limparCampos(camposCadastrarProduto);
});

//const camposModificarProduto = manipuladorDosCampos.modificarProduto().todosValores();
let botaoModificarProduto = document.getElementById("botao-modificar-produto");
botaoModificarProduto.addEventListener("click", async function () {
    const valoresCamposModificarProduto = camposModificarProduto.todosValores();

    valoresCamposModificarProduto.imagemUrl = document.getElementById("imagem-modificar-produto-preview").name;

    const produto = new Produto(valoresCamposModificarProduto);
    const endPoint = "https://localhost/administrador/estoque/editar";
    const response = await request_API("PUT", endPoint, produto.modificar());


    if (response.status == 200 || response.status == 201) {
        const formData = new FormData();

        formData.append("arquivoImagem", camposModificarProduto.imagemUrl.files[0]);

        const endPoint = "https://localhost/administrador/estoque/cadastrar-imagem";
        let response = await request_API_imagem(endPoint, formData);

        mostrarMensagem(`Produto ${produto.id} \nmodificado com sucesso!`);
        fecharTudo();
    } else {
        mostrarMensagem("Erro: Incapaz de modificar produto!");
    }


    manipuladorDosCampos.limparCampos(camposModificarProduto);
})

let botaoRemoverProduto = document.getElementById("botao-remover-produto");
botaoRemoverProduto.addEventListener("click", function () {
    confirmarOperacao(removaProduto)
});

async function removaProduto() {
    const idProduto = camposRemoverProduto.id.value;


    const endPoint = `https://localhost/administrador/estoque/deletar/${idProduto}`;
    const response = await request_API("DELETE", endPoint);

    if (response.status == 200 || response.status == 201) {
        mostrarMensagem("Produto Removido com sucesso!");
        fecharTudo();
    } else {
        mostrarMensagem("Erro: Produto inexistente!");
        //fecharTudo();
    }

    manipuladorDosCampos.limparCampos(camposRemoverProduto);
}
const canva = document.querySelector(".canva-validacao");
const confirmar = document.getElementById("confirmar-operacao");
const cancelar = document.getElementById("cancelar-operacao");

async function confirmarOperacao(funcaoRemover) {

    canva.style.display = "inline";

    confirmar.addEventListener("click", () => {

        funcaoRemover();
        canva.style.display = "none";

    })
    cancelar.addEventListener("click", () => {
        canva.style.display = "none";

    })
}

const deslogar = document.getElementById("deslogar");

deslogar.addEventListener("click", logout)

function logout() {
    localStorage.administradorLogado = "false";
    window.location.href = "login.html";
}

function unblockInputs(confirm, formulario) {
    for (let key in formulario) {
        if (typeof formulario[key] == "object") {
            if (confirm) {

                formulario[key].removeAttribute('readonly');
            } else {
                if (formulario[key].id != "modificar-produto-id") {
                    formulario[key].setAttribute('readonly', true);
                }

            }
        }
    }
}


const tipoRelatorio = document.getElementById("tipo-relatorio");
const extencaoRelatorio = document.getElementById("extencao-relatorio");
const filtroRelatorio = document.getElementById("filtro-relatorio");

const areaFiltro = document.getElementById("area-filtro");

tipoRelatorio.addEventListener("change", function(e){

    switch(tipoRelatorio.value){
        case "Vendas":
            if(extencaoRelatorio.value == "Pdf"){
                areaFiltro.style.display = "inline";

            }

            break;
        case "Produtos":
            areaFiltro.style.display = "none";


            break;
    }
    
})


extencaoRelatorio.addEventListener("change", function(e){
    const tipoRelatorio = document.getElementById("tipo-relatorio");

    switch(extencaoRelatorio.value){
        case "Pdf":
            if(tipoRelatorio.value == "Vendas"){
                areaFiltro.style.display = "inline";
            }
            break;
        case "Excel":
            areaFiltro.style.display = "none";
            break;
    }
})

filtroRelatorio.addEventListener("change", function(e){
    let dataInicio = document.getElementById("area-data-inicio");
    let dataFim = document.getElementById("area-data-fim");
    let areaFiltros = document.getElementById("cabecalho-relatorios-filtro");


    switch(filtroRelatorio.value){
        case "Data":
            dataInicio.style.display = "inline";
            dataFim.style.display = "inline";
            areaFiltros.style.marginTop = "0";
            break;
        default:
            dataInicio.style.display = "none";
            dataFim.style.display = "none";
            areaFiltros.style.marginTop = "-20px";
            break;
    }
    
})

let gerarRelatorioPdf = document.getElementById("gerar-relatorio");
gerarRelatorioPdf.addEventListener("click", async function () {
    let endPoint;
    let funcao;
    switch(tipoRelatorio.value){
        case "Vendas":
            if(extencaoRelatorio.value == "Pdf"){
                endPoint = "https://localhost/relatorio/pdf/01";
                funcao = showFile;

                if(filtroRelatorio.value == "Data"){
                    const dataInicio = document.getElementById("data-inicio");
                    const dataFim = document.getElementById("data-fim");

                    endPoint =  `https://localhost/relatorio/pdf/filtro/data?data_inicio=${dataInicio.value}&data_final=${dataFim.value}`;
                    funcao = showFile;
                }

            }
            
            if( extencaoRelatorio.value == "Excel"){
                endPoint = "https://localhost/relatorio/excel/vendas";
                funcao = showFileExcelVendas;

 
            }
            
            break;
        case "Produtos":

            if(extencaoRelatorio.value == "Pdf"){
                endPoint = "https://localhost/relatorio/pdf/07";
                funcao = showFile;

            }
            if(extencaoRelatorio.value == "Excel"){
                endPoint = "https://localhost/relatorio/excel/produtos";
                funcao = showFileExcel;

                
            }
            break;
    }

    let response = request_API("GET", endPoint)

    response
        .then(r => r.blob())
        .then(funcao)
})



function showFileDate(blob) {


    var newBlob = new Blob([blob], { type: "application/octec-stream" })

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }

    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;

   
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    
    

    link.download=`relatorio-produtos-${today.toLocaleDateString()}.pdf`;
    link.click();
    setTimeout(function () {
        // Firefox demnanda o delay
        window.URL.revokeObjectURL(data);
    }, 100);
}



function showFile(blob) {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([blob], { type: "application/pdf" })

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);



    var link = document.createElement('a');


    link.href = data;
    console.log(data)



    //window.open(data)
    PDFObject.embed(data, "#my-container");

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    

    // link.download=`relatorio-produtos-${today.toLocaleDateString()}.pdf`;

    // //window.open(link)
    // link.click();
    // setTimeout(function () {
    //     // For Firefox it is necessary to delay revoking the ObjectURL
    //     //window.URL.revokeObjectURL(data);
    // }, 100);
}



function showFileExcel(blob) {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([blob], { type: "application/octec-stream" })

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toLocaleDateString()
    
    link.download = `relatorio-Produtos-${today.toLocaleDateString()}.xlsx`
    link.click();
    setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
    }, 100);
}

function showFileExcelVendas(blob) {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([blob], { type: "application/octec-stream" })

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toLocaleDateString()
    
    link.download = `relatorio-Vendas-${today.toLocaleDateString()}.xlsx`
    link.click();
    setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
    }, 100);
}

