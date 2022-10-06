package br.com.seguranca.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@Setter
@Getter
public class CarrinhoDTO implements Serializable {




    private ProdutoDTO produtoDTO;

    private RetornoUsuarioDTO retornoUsuarioDTO;

    private Integer quantidade;

    private Double valorTotal;





}
