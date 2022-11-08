package br.com.xmarket.modelo;

import br.com.xmarket.dto.ProdutoDTO;
import br.com.xmarket.dto.RetornoUsuarioDTO;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "tabela_carrinho")
public class Carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Produto produto;


    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Cliente usuario;

    private Integer quantidade;

    private Double valorTotal;


    public RetornoUsuarioDTO toRetornoUsuarioDTO() {

        RetornoUsuarioDTO usuarioDTO = new RetornoUsuarioDTO(
                usuario.getId(), usuario.getNome(), usuario.getTelefone(), usuario.getEndereco()

        );

        return usuarioDTO;

    }


    public ProdutoDTO toProdutoDTO() {

        ProdutoDTO produtoDTO = new ProdutoDTO(
                produto.getId(), produto.getNome(), produto.getPreco(), produto.getMarca(), produto.getQuantidade(),
                produto.getImagemUrl(), produto.getCategoria()
        );

        return produtoDTO;

    }


}
