package br.com.xmarket.repositorio;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.xmarket.dto.HistoricoVendaDTO;
import br.com.xmarket.modelo.Venda;

@Repository
public interface VendaRepositorio extends JpaRepository<Venda, Long> {

    @Modifying
    @Transactional
    @Query(value ="select v.data_venda from tabela_venda v", nativeQuery = true)
    List<String> findDataInicio();

    @Modifying
    @Transactional
    @Query(value ="select v.data_venda from tabela_venda v", nativeQuery = true)
    List<String> findDataFinal();

    @Modifying
    @Transactional
    @Query(value = 
            "select v.id_venda as codigo_venda, v.forma_pagamento as forma_pagamento, c.endereco as endereco, p.imagem_url as nome_imagem, DATE_FORMAT(v.data_venda,'%d/%m/%Y') as data,c.nome,i.quantidade,p.nome as produto,p.preco,(p.preco*i.quantidade) as totalPorProduto " +
                 "from tabela_venda as v inner join tabela_clientes as  c "+
                 "on  v.id_usuario=c.id "+
                 "inner join item_venda as i "+
                 "on v.id_venda=i.id_venda "+
                 "left outer join tabela_produtos as p "+
                 "on  i.id_produto=p.id "+
                 "where "+
                 "c.id= :idUser "
                 , nativeQuery = true)
    public List<HistoricoVendaDTO> getIdUsuario(@Param("idUser") Long idUser);

}   
