package br.com.xmarket.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.xmarket.modelo.ItemVenda;

@Repository
public interface ItemVendaRepositorio extends JpaRepository<ItemVenda, Long> {

}




