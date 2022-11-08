package br.com.xmarket.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.xmarket.modelo.Carrinho;
import br.com.xmarket.modelo.Cliente;
import br.com.xmarket.modelo.Produto;

@Repository
public interface CarrinhoRepositorio extends JpaRepository<Carrinho, Long> {

    // buscar carrinho pelo usuario e produto
    public Carrinho findByUsuarioAndProduto(Cliente usuario, Produto produto);


    // buscar o carrinho do usuario pelo id do mesmo
    @Query(value = "SELECT * FROM tabela_carrinho WHERE id_usuario =?1", nativeQuery = true)
    public List<Carrinho> findByUsuario(Long idUsuario);



    @Modifying
    @Transactional
    @Query(value = "DELETE FROM tabela_carrinho WHERE id_produto =?1 AND id_usuario = ?2", nativeQuery = true)
    public void deletarProduto(Long idProduto, Long idUsuario);

    // Método para incrementar um item no carrinho


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM tabela_carrinho WHERE id_usuario = ?1", nativeQuery = true)
    public void limparCarrinho(Long idUsuario);

    // Método para incrementar um item no carrinho
    @Modifying
    @Transactional
    @Query(value = "UPDATE tabela_carrinho SET quantidade=(quantidade+1) WHERE id_produto=?1 AND id_usuario=?2", nativeQuery = true)
    public void incrementarUmItemCarrinho(Long idProduto, Long idUsuario);


    // Método para diminuir um item no carrinho
    @Modifying
    @Transactional
    @Query(value = "UPDATE tabela_carrinho SET  quantidade=(quantidade-1) WHERE id_produto=?1 AND id_usuario=?2", nativeQuery = true)
    public void diminuirUmItemCarrinho(Long idProduto, Long idUsuario);

}
