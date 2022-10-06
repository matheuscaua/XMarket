package br.com.seguranca.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.seguranca.model.Login;
import br.com.seguranca.model.Usuario;

@Repository
public interface UsuarioRepositorio extends JpaRepository <Usuario, Long> {


    Usuario getByEmail(String email);
    

}
