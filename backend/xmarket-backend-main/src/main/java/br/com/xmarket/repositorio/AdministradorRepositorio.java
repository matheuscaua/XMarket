package br.com.xmarket.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.xmarket.modelo.Administrador;


@Repository
public interface AdministradorRepositorio extends JpaRepository<Administrador, Long>{

	Administrador getByCodigo(String codigo);
	Administrador getByCpf(String cpf);
	Administrador getByRg(String rg);
	Administrador getByEmail(String email);
}
