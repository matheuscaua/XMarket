package br.com.seguranca.repositories;

import br.com.seguranca.model.Carrinho;
import br.com.seguranca.model.Produto;
import br.com.seguranca.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Repository
public interface CarrinhoRepositorio extends JpaRepository<Carrinho, Long> {


    public Carrinho findByUsuarioAndProduto(Usuario usuario, Produto produto);

    public List<Carrinho> findByUsuario(Usuario usuario);


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM tabela_carrinho WHERE id_produto =?1 AND id_usuario = ?2", nativeQuery = true)
    public void deletarProduto(Long idProduto , Long idUsuario);



}
