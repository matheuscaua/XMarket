package br.com.seguranca.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {

    private String usuario;

    private String senha;

    private String role;

    private String cpf;

    private String telefone;

    private String endereco;

    private String rg;


}

