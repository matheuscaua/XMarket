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
	
    public Usuario salvarUsuario(UsuarioDTO usuarioDTO){
    	String encoder = this.passwordEncoder.encode(usuarioDTO.getSenha()); /* Criptografa a senha */
		usuarioDTO.setSenha(encoder);
		/* Seta a senha criptografada */
        Usuario usuario = new Usuario();
        BeanUtils.copyProperties(usuarioDTO, usuario);
        return usuarioRepository.save(usuario);
    }

    public Usuario validandoUsuario(Login login){
        Usuario newObj = new Usuario();
        newObj =  usuarioRepository.findByUsuario(login.getUsuario());
        return newObj;
    }
    
    public boolean validarSenha(Login login) {
		String senha = usuarioRepository.findByUsuario(login.getUsuario()).getSenha();/* Valida a senha para login */
		boolean valid = passwordEncoder.matches(login.getSenha(), senha);
		return valid;
	}

}
