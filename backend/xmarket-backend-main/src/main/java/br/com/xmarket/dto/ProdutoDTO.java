package br.com.xmarket.dto;

import br.com.xmarket.modelo.Produto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoDTO {

    private Long id;
    private String nome;
    private Double preco;
    private String marca;
    private Integer quantidade;
    private String imagemUrl;

    private String categoria;



    public ProdutoDTO(Produto produto){
        this.setNome(produto.getNome());
        this.setPreco(produto.getPreco());
        this.setMarca(produto.getMarca());
        this.setQuantidade(produto.getQuantidade());
        this.setId(produto.getId());

    }


    public Produto toProduto (){

        return new Produto(
                this.id,
                this.nome,
                this.preco,
                this.categoria,
                this.marca,
                this.imagemUrl,
                this.quantidade





        );

    }

}
