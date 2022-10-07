package br.com.seguranca.controller;



import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.seguranca.dto.UsuarioDTO;
import br.com.seguranca.model.Login;
import br.com.seguranca.services.UsuarioServico;

@RestController
public class UsuarioControlador {

	@Autowired
	private UsuarioServico usuarioService;

	
	//END POINT para cadastrar usuário
	@PostMapping("/cadastrar")
	public ResponseEntity<UsuarioDTO> inserirUsuario(@Valid @RequestBody UsuarioDTO usuarioDTO) {
		usuarioService.salvarUsuario(usuarioDTO);
		return ResponseEntity.status(201).build(); //Caso cadastrar retorna um HTTPStatus (201)
	}

	
	//END POINT para realizar login de usuário
	@PostMapping("/login")//Rota
	public ResponseEntity<?> login(@Valid @RequestBody Login login) { //Recebe um objeto Login
		boolean valid = usuarioService.validar(login); //Método para validar os atributos do objeto
		if (valid) { //Se usuario e senha forem válidos, retorna HTTPStatus (200)
			return ResponseEntity.status(200).build();
		}
		return ResponseEntity.status(401).build(); //Se não autenticar, retorna NÃO AUTORIZADO (UNAUTHORIZED), HTTPStatus (401)
	}
	
	
	
	
	//Mapeia as Exceções (400)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationException(MethodArgumentNotValidException e){
		Map<String, String> errors = new HashMap<>();
		
		e.getBindingResult().getAllErrors().forEach((error) ->{
				String fieldName = ((FieldError) error).getField();
				String errorMessage = error.getDefaultMessage();
				
				
				errors.put(fieldName, errorMessage);
		});
		
		return errors;
	}
	
	
}
