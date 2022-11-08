package br.com.xmarket.servicos;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.xmarket.dto.ClienteDTO;
import br.com.xmarket.modelo.Cliente;
import br.com.xmarket.modelo.Login;
import br.com.xmarket.repositorio.ClienteRepositorio;
import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class ClienteServico {

    @Autowired
    private ClienteRepositorio usuarioRepository;
   
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public Cliente cadastrarCliente(ClienteDTO usuarioDTO) {
        Cliente usuario = new Cliente();/* Instancia um objeto usuario */
        String encoder = this.passwordEncoder.encode(usuarioDTO.getSenha()); /* Criptografa a senha */
        usuarioDTO.setSenha(encoder);/* Seta a senha criptografada */
        BeanUtils.copyProperties(usuarioDTO, usuario); /*Passa as propriedades de DTO para o objeto*/
        return usuarioRepository.save(usuario);//Salva o objeto com a senha criptograda
    }

    public boolean validarLogin(Login login) {
        Cliente usuario = usuarioRepository.getByEmail(login.getEmail());//Verifica se o existe usuario com o email digitado, caso nao exista ele retorna false
        if (usuario == null) { /*Caso o objeto seja nulo ou vazio retorna um false*/
            return false;
        } else {
            String senha = usuarioRepository.getByEmail(login.getEmail()).getSenha(); /* Filtra pelo email, se caso email existir pega a senha */
            boolean valid = passwordEncoder.matches(login.getSenha(), senha); /* Compara a senha digitada com a senha do banco de dados criptografada */
            return valid; /*Se as senhas coíncidem retorna true, senão, retorna false*/
        }

    }
    public Cliente buscarClientePorEmail(Login login){
        Cliente usuario = usuarioRepository.getByEmail(login.getEmail());
        return usuario;
    }
    
    public Cliente buscarPeloId(Long id) {
		return usuarioRepository.findById(id).orElse(null);
	}
    
	public List<Cliente> listarClientes() {
		List<Cliente> clientes = usuarioRepository.findAll();
		return clientes;
	}
	
	public Boolean alterarCliente(Cliente cliente) {
        Cliente obj = buscarPeloId(cliente.getId());
        if(obj != null){
            usuarioRepository.save(cliente);
            return true;
        }
		return false;
	}


	//Criptografa os dados do cliente //
		public boolean deletarCliente(Long id) {
			Cliente cliente = buscarPeloId(id);
			if (cliente != null) {
				String cpfCriptografado = this.passwordEncoder.encode(cliente.getCpf());
				cliente.setCpf(cpfCriptografado);
				String rgCriptografado = this.passwordEncoder.encode(cliente.getRg());
				cliente.setRg(rgCriptografado);
				String enderecoCriptografado = this.passwordEncoder.encode(cliente.getEndereco());
				cliente.setEndereco(enderecoCriptografado);
				String emailCriptografado = this.passwordEncoder.encode(cliente.getCpf());
				cliente.setEmail(emailCriptografado);
                cliente.setUsuarioAtivo(false);
				usuarioRepository.save(cliente);
				return true;
			}
			return false;
		}
    
    
    
  
  //Método para verificar se exitem email,cpf e rg já cadastrados no banco de dados
    public boolean validarEmail(String email) {
        Cliente cliente = usuarioRepository.getByEmail(email);
        if(cliente == null) {
            return true;
        }
        return false;
    }
    
    public boolean validarCpf(String cpf) {
    	Cliente cliente = usuarioRepository.getByCpf(cpf);
    	 if(cliente == null) {
             return true;
         }
         return false;
    }
    
    public boolean validarRg(String rg) {
    	Cliente cliente = usuarioRepository.getByRg(rg);
    	 if(cliente == null) {
             return true;
         }
         return false;
    }
    
    public boolean validacaoGeral(ClienteDTO clienteDTO) {
    	if(validarCpf(clienteDTO.getCpf()) && validarEmail(clienteDTO.getEmail()) && validarRg(clienteDTO.getRg())) {
    		return true;
    	}
    	return false;
    }


}
