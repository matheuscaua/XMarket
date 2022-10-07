package br.com.seguranca.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.seguranca.dto.UsuarioDTO;
import br.com.seguranca.model.Login;
import br.com.seguranca.model.Usuario;
import br.com.seguranca.repositories.UsuarioRepositorio;

@Service
public class UsuarioServico {

	@Autowired
	private UsuarioRepositorio usuarioRepository;

	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	
	//Método para verificar se exitem email,cpf e rg já cadastrados no banco de dados
	public boolean validarCadastro(UsuarioDTO usuarioDTO) {
		String email = usuarioRepository.findByEmail(usuarioDTO.getEmail());
		BeanUtils.copyProperties(usuarioDTO.getEmail(), email);
		if(email == null) {
			return true;
		}
		return false;
				
	}
	
	public boolean cadastrarUsuario(UsuarioDTO usuarioDTO) {
		if(validarCadastro(usuarioDTO)) {
			String encoder = this.passwordEncoder.encode(usuarioDTO.getSenha()); /* Criptografa a senha */
			usuarioDTO.setSenha(encoder);/* Seta a senha criptografada */
			Usuario usuario = new Usuario();/* Instancia um objeto usuario */
			BeanUtils.copyProperties(usuarioDTO, usuario); /*Passa as propriedades de DTO para o objeto*/
			usuarioRepository.save(usuario);
			return true;//Salva o objeto com a senha criptograda
		}else {
			return false;//Caso tenha atributos ja existentes, retorna false e nao cadastra usuário
		}
	
	}

	public boolean validarLogin(Login login) {
		Usuario usuario = usuarioRepository.getByEmail(login.getEmail());//Verifica se o existe usuario com o email digitado, caso nao exista ele retorna false
		if (usuario == null) { /*Caso o objeto seja nulo ou vazio retorna um false*/
			return false;
		} else {
			String senha = usuarioRepository.getByEmail(login.getEmail()).getSenha(); /* Filtra pelo email, se caso email existir pega a senha */
			boolean valid = passwordEncoder.matches(login.getSenha(), senha); /* Compara a senha digitada com a senha do banco de dados criptografada */
			return valid; /*Se as senhas coíncidem retorna true, senão, retorna false*/
		}

	}

	public Usuario buscarPeloId(Long id) {
		return usuarioRepository.findById(id).get();
	}

}
