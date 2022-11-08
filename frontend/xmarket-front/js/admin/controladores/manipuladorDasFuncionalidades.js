import manipuladorDosCampos from "./manipuladorDosCampos.js";

export default function adicionandoEventos() {
    let hamburger = document.querySelector(".hamburger");
    let setting = document.querySelector(".settings-logo");

    const optionsSideBar = Array.from(document.getElementsByClassName('disable'));

    let closeBtn = document.getElementById("close");

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


    // Tela de mensagem de validação
    let canvaMensagemValidacao = document.querySelector(".canva-mensagem");
    let mensagemValidacao = document.querySelector(".mensagem");
    let fecharCanva = document.getElementById("fechar-mensagem");

    // Content list
    let listContent = document.getElementById("list-content");
    let headerTable = document.getElementById("header-table");
    hamburger.addEventListener("click", function () {

        document.querySelector("body").classList.toggle("active");
    });

    setting.addEventListener("click", function () {
        let content = document.querySelector(".settings-content");

        if (content.style.display === "none" || content.style.display === "") {
            content.style.display = "inline-grid";

        } else {
            content.style.display = "none";

        }
    });
    //closeBtn.addEventListener("click", fecharTudo);


    fecharCanva.addEventListener("click", function () {
        canvaMensagemValidacao.style.display = "none";

        //fecharTudo();

        //limpar mensagem
        let mensagens = document.querySelectorAll("#mensagem-validacao");
        
        mensagens.forEach(mensagem => {
            mensagemValidacao.removeChild(mensagem);
        })
        

    })

    optionsSideBar.forEach(option => {
        option.addEventListener("click", function () {
            // Defino a opção da opção em localStorage
            localStorage.setItem("option", option.id);

            // Busca a opção ativa e desativa ela
            let active = document.querySelector(".active");
            active.classList.remove("active");
            active.classList.add('disable');

            // Ativa a opção selecionada
            option.classList.remove('disable');
            option.classList.add('active');


            // Define titulo da tela selecionada
            let title = document.getElementById("title");
            title.innerHTML = localStorage.getItem("option");

            // Mostrar as funcionalidades;
            visualizarFuncionalidades();
        })
    });


    function fecharTudo() {
        panel.style.display = "none";

        cadastroCliente.style.display = "none";
        modificarCliente.style.display = "none";

        cadastroProduto.style.display = "none";
        modificarProduto.style.display = "none";
        removerProduto.style.display = "none";

        listar.style.display = "none";
        listContent.innerHTML = null;
        headerTable.innerHTML = null;

        //unblockInputs(false);
    }
    function visualizarFuncionalidades() {
        let element = document.getElementById("main-content");
        let relatorio = document.querySelector(".panel-relatorio");
        let infoAdm = document.getElementById("info-painel-adm");

        if (localStorage.getItem("option") == "home") {
            element.style.display = "none";
            relatorio.style.display = "none";
            infoAdm.style.display = "inline";
        } else if(localStorage.getItem("option") == "relatorios"){ //panel-relatorio
            relatorio.style.display = "inline";
            element.style.display = "none";
            infoAdm.style.display = "none";
        }

        else {
            element.style.display = "flex";
            relatorio.style.display = "none";
            infoAdm.style.display = "none";
        }
    }


    const cpf = manipuladorDosCampos.cadastrarCliente.cpf;
    cpf.addEventListener('keyup', function (event) { //pega o evento de precionar uma tecla
        console.log("TESTE")
        if (event.keyCode != 46 && event.keyCode != 8) {//verifica se a tecla precionada nao e um backspace e delete
            var posicao = cpf.value.length; //aqui pega o tamanho do input
    
            switch (posicao) {
                case 3:
                case 7:
                    cpf.value = cpf.value + ".";
                    break;
                case 11:
                    cpf.value = cpf.value + "-";
            }
        }
    });
    

    const telefone = manipuladorDosCampos.cadastrarCliente.telefone;

    telefone.addEventListener('keydown', function (event) { //pega o evento de precionar uma tecla
    
        if (event.keyCode != 46 && event.keyCode != 8) {//verifica se a tecla precionada nao e um backspace e delete
            var posicao = telefone.value.length; //aqui pega o tamanho do input
    
            switch (posicao) {
                case 0:
                    telefone.value = "(";
                    break;
                case 3:
                    telefone.value = telefone.value + ")";
                    break;
                case 9:
                    telefone.value = telefone.value + "-";
            }
        }
    });
    
    const cepCadastro = manipuladorDosCampos.cadastrarCliente.cep;
    cepCadastro.addEventListener('keydown', function (event) { //pega o evento de precionar uma tecla
    
        if (event.keyCode != 46 && event.keyCode != 8) {//verifica se a tecla precionada nao e um backspace e delete
            var posicao = cepCadastro.value.length; //aqui pega o tamanho do input
    
            switch (posicao) {
                case 2:
                    cepCadastro.value = cepCadastro.value + ".";
                    break;
                case 6:
                    cepCadastro.value = cepCadastro.value + "-";
                    break;
            }
        }
    });
    const cepModificar = manipuladorDosCampos.modificarCliente.cep;
    cepModificar.addEventListener('keydown', function (event) { //pega o evento de precionar uma tecla
    
        if (event.keyCode != 46 && event.keyCode != 8) {//verifica se a tecla precionada nao e um backspace e delete
            var posicao = cepModificar.value.length; //aqui pega o tamanho do input
    
            switch (posicao) {
                case 2:
                    cepModificar.value = cepModificar.value + ".";
                    break;
                case 6:
                    cepModificar.value = cepModificar.value + "-";
                    break;
            }
        }
    });
    const botaoPesquisarCepCadastrar = document.getElementById("botao-pesquisar-cadastrar");
    botaoPesquisarCepCadastrar.addEventListener("click", function(){
        const endereco = manipuladorDosCampos.cadastrarCliente.endereco;
        const cep = manipuladorDosCampos.cadastrarCliente.cep;
        manipuladorDosCampos.buscarCep(cep.value, endereco)
    })

    const botaoPesquisarCepModificar = document.getElementById("botao-pesquisar-modificar");
    botaoPesquisarCepModificar.addEventListener("click", function(){
        const endereco = manipuladorDosCampos.modificarCliente.endereco;
        const cep = manipuladorDosCampos.modificarCliente.cep;

        manipuladorDosCampos.buscarCep(cep.value, endereco)
    })


}