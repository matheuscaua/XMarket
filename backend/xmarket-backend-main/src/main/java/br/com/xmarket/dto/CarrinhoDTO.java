package br.com.xmarket.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class CarrinhoDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private ProdutoDTO produtoDTO;

    private RetornoUsuarioDTO retornoUsuarioDTO;

    private Integer quantidade;

    private Double valorTotal;





}
