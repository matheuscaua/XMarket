package br.com.xmarket.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.xmarket.modelo.Cliente;

@Repository
public interface ClienteRepositorio extends JpaRepository <Cliente, Long> {

   
    Cliente getByEmail(String email);
    Cliente getByCpf(String cpf);
    Cliente getByRg(String rg);

    Cliente getById(Long id);

}
