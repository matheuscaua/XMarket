package br.com.seguranca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.seguranca.dto.UsuarioDTO;
import br.com.seguranca.model.Login;
import br.com.seguranca.model.Usuario;
import br.com.seguranca.services.UsuarioServico;

@RestController
public class UsuarioControlador {

	@Autowired
	private UsuarioServico usuarioService;

	@PostMapping("/cadastrar")
	public ResponseEntity<Usuario> inserirUsuario(@RequestBody UsuarioDTO usuarioDTO) {
		usuarioService.salvarUsuario(usuarioDTO);
		return ResponseEntity.status(201).build();//Caso cadastrar retorna um HTTPStatus (201)
	}

	
	
	@PostMapping("/login")
	public ResponseEntity<Usuario> login(@RequestBody Login login) {
		Usuario cliente = usuarioService.validandoUsuario(login);
		boolean valid = usuarioService.validarSenha(login);
		
		if (login.getUsuario().equals(cliente.getUsuario()) && valid) { //Se usuario e senha forem válidos, retorna HTTPStatus (200)
			return ResponseEntity.status(200).build();
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); //Se não autenticar, retorna NÃO AUTORIZADO (UNAUTHORIZED), HTTPStatus (401)
	}
	

}
