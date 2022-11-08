package br.com.xmarket.modelo;

import br.com.xmarket.dto.ProdutoDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "tabela_produtos")
@NoArgsConstructor
public class Produto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private Double preco;

	private String categoria;
	private String marca;
	private String imagemUrl;
	private Integer quantidade;

	public Produto(Long id) {
		this.id = id;
	}

	public ProdutoDTO toProdutoDTO (){

		return new ProdutoDTO(
				this.id,
				this.nome,
				this.preco,
				this.marca,
				this.quantidade,
				this.imagemUrl,
				this.categoria




		);

	}

	
	
	
	
}
