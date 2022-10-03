package br.com.seguranca.model;

import br.com.seguranca.dto.ProdutoDTO;
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
	private String marca;
	private String imagemUrl;



	public ProdutoDTO toProdutoDTO (){

		return new ProdutoDTO(

				this.nome,
				this.preco,
				this.marca,
				this.imagemUrl
		);

	}

	
	
	
	
}
