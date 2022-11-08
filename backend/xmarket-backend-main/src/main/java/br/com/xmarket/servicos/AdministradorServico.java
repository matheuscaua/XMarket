package br.com.xmarket.servicos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.xmarket.modelo.Administrador;
import br.com.xmarket.modelo.LoginAdmin;
import br.com.xmarket.repositorio.AdministradorRepositorio;

@Service
public class AdministradorServico {
	
	@Autowired
	private AdministradorRepositorio adminRepositorio;
	
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	public Administrador cadastrar(Administrador administrador) {	
	     String encoder = this.passwordEncoder.encode(administrador.getSenha()); /* Criptografa a senha */
	     administrador.setSenha(encoder);/* Seta a senha criptografada */
	     return adminRepositorio.save(administrador);
	}
	
	public boolean validarLogin(LoginAdmin login) {
		Administrador administrador = adminRepositorio.getByCodigo(login.getCodigo());
		if(administrador == null) {
			 return false;
		}
			String senha = adminRepositorio.getByCodigo(login.getCodigo()).getSenha(); /* Filtra pelo email, se caso email existir pega a senha */
		    boolean valid = passwordEncoder.matches(login.getSenha(), senha); /* Compara a senha digitada com a senha do banco de dados criptografada */
		    return valid;
	}
	
	
	
	
	
	
	
	//Método para verificar se exitem email,cpf e rg já cadastrados no banco de dados
    public boolean validarEmail(Administrador administrador) {
        Administrador admin = adminRepositorio.getByEmail(administrador.getEmail());
        if(admin == null) {
            return true;
        }
        return false;
    }
    
    public boolean validarCpf(Administrador administrador) {
    	Administrador admin = adminRepositorio.getByCpf(administrador.getCpf());
    	 if(admin == null) {
             return true;
         }
         return false;
    }
    
    public boolean validarRg(Administrador administrador) {
    	 Administrador admin = adminRepositorio.getByRg(administrador.getRg());
    	 if(admin == null) {
             return true;
         }
         return false;
    }
    
    public boolean validacaoGeral(Administrador administrador) {
    	if(validarCpf(administrador) && validarEmail(administrador) && validarRg(administrador)) {
    		return true;
    	}
    	return false;
    }

	public Administrador buscarPorMatricula(String matricula){
		Administrador administrador = adminRepositorio.getByCodigo(matricula);
		if(administrador != null){
			return administrador;
		}
		return null;
	}
}
