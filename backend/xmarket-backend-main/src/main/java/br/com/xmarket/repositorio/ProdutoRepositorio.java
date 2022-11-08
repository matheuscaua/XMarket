package br.com.xmarket.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.xmarket.modelo.Produto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProdutoRepositorio extends JpaRepository<Produto, Long>{
    
    @Query(value="SELECT quantidade from tabela_produtos where id = ?1", nativeQuery = true)
    Integer buscarQuantidade(Long id);



    @Query(value = "SELECT * FROM tabela_produtos WHERE categoria = ?1", nativeQuery = true)
    List<Produto> buscarPorCategoria(String categoria);

    @Modifying
    @Transactional
    @Query(value = "UPDATE tabela_produtos SET quantidade = ?1 WHERE id = ?2", nativeQuery = true)
    Integer atualizarQuantidade(Integer quantidade, Long idProduto);


}
