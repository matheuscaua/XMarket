package br.com.seguranca.services;

import javax.validation.Valid;

import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.seguranca.dto.UsuarioDTO;
import br.com.seguranca.model.Login;
import br.com.seguranca.model.Usuario;
import br.com.seguranca.repositories.UsuarioRepositorio;

@Service
public class UsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepository;
   
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
    public Usuario salvarUsuario(@Valid UsuarioDTO usuarioDTO){
    	String encoder = this.passwordEncoder.encode(usuarioDTO.getSenha()); /* Criptografa a senha */
		usuarioDTO.setSenha(encoder);
		/* Seta a senha criptografada */
        Usuario usuario = new Usuario();
        BeanUtils.copyProperties(usuarioDTO, usuario);
        return usuarioRepository.save(usuario);
    }

    public boolean validandoUsuario(@Valid Login login){
        String email =  usuarioRepository.getByEmail(login.getEmail()).getEmail();
        if(email == null) {
        	return false;
        }else {
        	return true;
        }
    }
    
    public boolean validarSenha(@Valid Login login) {
		String senha = usuarioRepository.getByEmail(login.getEmail()).getSenha();/* Valida a senha para login */
		boolean valid = passwordEncoder.matches(login.getSenha(), senha);
		return valid;
	}

    public Usuario buscarPeloId(Long id){
        return usuarioRepository.findById(id).get();
    }



}
