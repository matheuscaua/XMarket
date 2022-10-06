package br.com.seguranca.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

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
    @NotBlank(message = "O campo nome é obrigatório!")
    @Column(name = "usuario", length = 100)
    private String usuario;
    
    @Email(message = "Insira um email válido!")
    @NotBlank(message = "O campo email é obrigatório!")
    @Column(name = "email",unique = true, nullable = false)
    private String email;
    
    @NotBlank(message = "O campo senha é obrigatório!")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres!")
    @Column(name = "senha")
    private String senha;
    
    @Column(name = "role")
    private String role;
 
    @NotBlank(message = "O campo cpf é obrigatório!")
    @Column(name = "cpf" , length = 11)
    private String cpf;

    @Column(name = "telefone",length = 11)
    private String telefone;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "rg", length = 7)
    private String rg;




}
