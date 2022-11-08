package br.com.xmarket.modelo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "tabela_admin")
public class Administrador implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "nome")
    private String nome;
	
	@Column(name = "codigo", length = 6, unique = true)
	private String codigo;
	
	@Column(name = "cargo")
	private String cargo;
	
    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "senha")
    private String senha;

    @Column(name = "cpf", length = 14,unique = true)
    private String cpf;
    
    private String telefone;

    private String endereco;
    @Column(name = "rg", unique = true)
    private String rg;
}