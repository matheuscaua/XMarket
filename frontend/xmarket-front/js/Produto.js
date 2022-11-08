export default class Produto {

    constructor(produto) {
        if (typeof produto == "object") {
            this._id = produto["id"];
            this._nome = produto["nome"];
            this._marca = produto["marca"];
            this._categoria = produto["categoria"];
            this._preco = produto["preco"];
            this._quantidade = produto["quantidade"];
            this._imagemUrl = produto["imagemUrl"];

        }
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
        row.appendChild(this._criarDadoTabela(this._marca));
        row.appendChild(this._criarDadoTabela(this._preco));
        row.appendChild(this._criarDadoTabela(this._quantidade));

        return row;
    }
    criarCardProduto() {
        let serverImage = "http://127.0.0.1:5500/";
        let element = document.createElement("div");
        element.setAttribute("class", "card-item");

        let card_item = element;
        let image_item = this._imageItem(serverImage + this._imagemUrl);
        let title_item = this._titleItem(`${this._nome} - ${this._marca} `);
        let description_item = this._descriptionItem(this._preco);
        let button_item = this._buttonItem(this.id);
    
        card_item.appendChild(image_item);
        card_item.appendChild(title_item);
        card_item.appendChild(description_item);
        card_item.appendChild(button_item);
    
        return card_item;
    }
    cadastrar(){
        const body = { 
            "imagemUrl": this._imagemUrl,
            "marca": this._marca,
            "categoria": this._categoria,
            "nome": this._nome,
            "preco": this._preco,
            "quantidade": this._quantidade,
        }
        return body;
    }
    
    modificar(){
        const body = { 
            "id": this._id,
            "imagemUrl": this._imagemUrl,
            "marca": this._marca,
            "nome": this._nome,
            "preco": this._preco,
            "quantidade": this._quantidade,
        }
        return body;
    }

    salvarCarrinho(){
        const produto = { 
            "id": this._id,
            "imagemUrl": this._imagemUrl,
            "marca": this._marca,
            "nome": this._nome,
            "preco": this._preco,
            "quantidade": this._quantidade,
        }
        return produto;

    }
    _titleItem(nomeProduto) {
        let title_item = document.createElement("div");
        let title_item_h2 = document.createElement("h4");
        let conteudo = document.createTextNode(nomeProduto);
    
        title_item_h2.appendChild(conteudo);
        title_item.appendChild(title_item_h2);
        title_item.setAttribute("class", "title-item");
    
        return title_item
    }

    _descriptionItem(price) {
        let description_item = document.createElement("div");
        let description_item_price = document.createElement("h3");
        let conteudo = document.createTextNode("R$" + price);
    
        description_item_price.appendChild(conteudo);
        description_item.appendChild(description_item_price);
        description_item.setAttribute("class", "description-item");
    
        return description_item;
    }
    _buttonItem(id) {
        let button_item = document.createElement("div");
        let button_item_title = document.createElement("h4");
        let conteudo = document.createTextNode("Adicionar");
    
        button_item_title.appendChild(conteudo);
        button_item.appendChild(button_item_title);
        button_item.setAttribute("class", "button-item");
    
        button_item.setAttribute("id", `submit-${id}`);
    
        return button_item;
    }
    _imageItem(path) {
        let image_item = document.createElement("div");
        let image = document.createElement("img");
    
        image.src = path;
        image_item.appendChild(image);
        image_item.setAttribute("class", "image-item");
    
        return image_item;
    }



    
    set id(id) {
        this._id = id;
    }
    set nome(nome) {
        this._nome = nome;
    }
    set marca(marca) {
        this._marca = marca;
    }
    set preco(preco) {
        this._preco = preco;
    }
    set quantidade(quantidade) {
        this._quantidade = quantidade;
    }
    set categoria(categoria) {
        this._categoria = categoria;
    }

    set imagemUrl(imagemUrl) {
        this._imagemUrl = imagemUrl;
    }

    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get marca() {
        return this._marca;
    }
    get categoria(){
        return this._categoria;
    }
    get preco() {
        return this._preco;
    }
    get quantidade() {
        return this._quantidade;
    }
    get imagemUrl() {
        return this._imagemUrl;
    }
}