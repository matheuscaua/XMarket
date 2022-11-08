export default class Cliente {

    constructor(cliente) {
        if (typeof cliente == "object") {
            this._id = cliente["id"];
            this._nome = cliente["nome"];
            this._cpf = cliente["cpf"];
            this._rg = cliente["rg"];
            this._email = cliente["email"];
            this._telefone = cliente["telefone"];
            this._endereco = cliente["endereco"];
            this._senha = cliente["senha"];

            
        }
    }

    cadastrar(){
        const body = {
            "nome": this._nome,
            "cpf": this._cpf,
            "rg": this._rg,
            "email": this._email,
            "telefone": this._telefone,
            "endereco": this._enderecoJunto(this._endereco),
            "senha": this._senha
        }
        return body;
    }
    
    cadastrarPeloCliente(){
        const body = {
            "nome": this._nome,
            "cpf": this._cpf,
            "rg": this._rg,
            "email": this._email,
            "telefone": this._telefone,
            "endereco": this._endereco,
            "senha": this._senha
        }
        return body;
    }
    modificar(){
        const body = {
            "id": this._id,
            "nome": this._nome,
            "cpf": this._cpf,
            "rg": this._rg,
            "email": this._email,
            "telefone": this._telefone,
            "endereco": this._enderecoJunto(this._endereco),
            "senha": this._senha
        }
        return body;
    }

    _criarDadoTabela(informacao) {
        const dado = document.createElement("td");
        dado.appendChild(document.createTextNode(informacao));

        return dado;
    }

    listarParaTabela() {
        const row = document.createElement("tr");

        row.appendChild(this._criarDadoTabela(this._id));
        row.appendChild(this._criarDadoTabela(this._nome));
        row.appendChild(this._criarDadoTabela(this._email));
        row.appendChild(this._criarDadoTabela(this._cpf));
        row.appendChild(this._criarDadoTabela(this._rg));
        row.appendChild(this._criarDadoTabela(this._telefone));
        row.appendChild(this._criarDadoTabela(this._endereco));

        return row;
    }
    _enderecoJunto(valoresCampos){
        console.log("🚀 ~ file: Cliente.js ~ line 64 ~ Cliente ~ enderecoJunto ~ valoresCampos", valoresCampos)
        
        let endereco = "";

        // Concatenar o endereco em uma string
        for (let key in valoresCampos) {
            endereco = endereco + valoresCampos[key] + ", ";
            
        }
        console.log(endereco)
        return endereco;
    }
    enderecoSeparado(){
        var split = this._endereco.split(',');

        return {
            rua: split[0],
            numero: split[1],
            bairro: split[2],
            municipio: split[3],
            estado: split[4]
        }
    }

    set id(id){
        this._id = id;
    }
    set nome(nome){
        this._nome = nome;
    }
    set cpf(cpf){
        this._cpf = cpf;
    }
    set rg(rg){
        this._rg = rg;
    }
    set email(email){
        this._email = email;
    }
    set telefone(telefone){
        this._telefone = telefone;
    }
    set endereco(endereco){
        this._endereco = endereco;
    }

    set senha(senha){
        this._senha = senha;
    }

    get id(){
        return this._id;
    }
    get nome(){
        return this._nome;
    }
    get cpf(){
        return this._cpf;
    }
    get rg(){
        return this._rg;
    }
    get email(){
        return this._email;
    }
    get telefone(){
        return this._telefone;
    }
    get endereco(){
        return this._endereco;
    }
    get senha(){
        return this._senha;
    }
}