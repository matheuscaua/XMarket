package br.com.xmarket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDTO {

    @NotEmpty
    private String nome;

    @Email(message = "Insira um email válido!")
    @NotEmpty(message = "O campo email é obrigatório!")
    private String email;

    @NotEmpty(message = "Senha obrigatória")
    @Size(min = 6, max = 16)
    private String senha;

    @CPF(message = "Cpf Inválido!")
    @NotEmpty
    private String cpf;

    @NotEmpty(message = "Telefone obrigatório!")
    @Size(min = 11, max = 11)
    private String telefone;
    @NotEmpty(message = "Endereco Obrigatório")
    private String endereco;

    @NotEmpty(message = "RG Obrigatório")
    private String rg;

    private boolean usuarioAtivo = true;


}

