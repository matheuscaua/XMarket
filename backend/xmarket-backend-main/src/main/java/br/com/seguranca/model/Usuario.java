package br.com.seguranca.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tabela_usuarios")
public class Usuario {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String usuario;
    @Column(name = "email", unique = true) 
    private String email;
    
    @Column(name = "senha", unique = true)
    private String senha;
    
    private String role;
 
    @Column(name = "cpf", length = 14)
    private String cpf;

    private String telefone;

    private String endereco;
    
    private String rg;




}
