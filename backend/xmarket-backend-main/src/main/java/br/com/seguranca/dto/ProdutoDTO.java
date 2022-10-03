package br.com.seguranca.dto;

import br.com.seguranca.model.Produto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoDTO {

    private String nome;
    private Double preco;
    private String marca;
    private String imagemUrl;


}
