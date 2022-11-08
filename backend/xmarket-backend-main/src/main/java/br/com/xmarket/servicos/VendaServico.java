package br.com.xmarket.servicos;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;

import br.com.xmarket.dto.HistoricoVendaDTO;
import br.com.xmarket.dto.VendaDTO;
import br.com.xmarket.modelo.Carrinho;
import br.com.xmarket.modelo.Cliente;
import br.com.xmarket.modelo.Email;
import br.com.xmarket.modelo.ItemVenda;
import br.com.xmarket.modelo.MensagemEmail;
import br.com.xmarket.modelo.Venda;
import br.com.xmarket.repositorio.VendaRepositorio;


@Service
public class VendaServico {

    @Autowired
    EmailServico emailServico;

    @Autowired
    private VendaRepositorio vendaRepositorio;

    @Autowired
    private ClienteServico clienteServico;

    @Autowired
    private ProdutoServico produtoServico;

    @Autowired
    private ItemVendaServico itemVendaServico;

    @Autowired
    private CarrinhoServico carrinhoServico;


    public void criarVenda (Long idCliente, VendaDTO vendaDTO) {

        Venda venda = new Venda();
        Cliente cliente = clienteServico.buscarPeloId(idCliente);

        List<Carrinho> carrinho = carrinhoServico.buscarPorUsuario(idCliente);
        List<ItemVenda> itens = new ArrayList<>();

        for (Carrinho c : carrinho) {

            int quantidadeNoBanco = produtoServico.buscarQuantidade(c.getProduto().getId());

            if (quantidadeNoBanco >= c.getQuantidade()) {

                ItemVenda itemVenda = new ItemVenda();

                itemVenda.setProduto(c.getProduto());
                itemVenda.setVenda(venda);
                itemVenda.setPrecoUnitario(c.getProduto().getPreco());
                itemVenda.setQuantidade(c.getQuantidade());

                itens.add(itemVenda);
            }
        }
        //Setando a venda
        venda.setDataVenda(LocalDateTime.now());
        venda.setItens(itens);
        venda.setUsuario(cliente);
        venda.setValorTotal(vendaDTO.getValorTotal());
        venda.setFormaPagamento(vendaDTO.getEnumPagamento());

        vendaRepositorio.save(venda);
        atualizarEstoque(carrinho, idCliente);
        dispararEmailVenda(venda);
    }



    public void atualizarEstoque(List<Carrinho> carrinho, Long idCliente){
        // Atualizar itens no estoque
        for (Carrinho c : carrinho) {
            int quantidadeNoBanco = produtoServico.buscarQuantidade(c.getProduto().getId());
            if (quantidadeNoBanco >= c.getQuantidade()) {

                int novaQuantidade = quantidadeNoBanco - c.getQuantidade();
                produtoServico.atualizarQuantidadeEstoque(novaQuantidade, c.getProduto().getId());
            }
        }

        carrinhoServico.limparCarrinho(idCliente);

    }

    public void dispararEmailVenda(Venda venda){

        //Lógica para chamar a função do email
        Email email = new Email();
        MensagemEmail msg = new MensagemEmail();
        email.setRemetente(venda.getUsuario().getEmail());
        email.setMensagem(msg.msgVenda(venda.getUsuario().getNome()));

        try {
            emailServico.enviarEmailNotaFiscal(venda.getIdVenda(),email);
        }catch (Exception e){
            e.printStackTrace();
        }

    }



    public List<ItemVenda> buscarItemVenda(){
        return itemVendaServico.buscarItemVenda();
    }

    @ModelAttribute("data_inicio")
    public List<String> getDataInicio(){
        return vendaRepositorio.findDataInicio();
    }

    @ModelAttribute("data_final")
    public List <String> getDataFinal(){
        return vendaRepositorio.findDataFinal();
    }


    public  List<HistoricoVendaDTO> buscarHistoricoVenda(Long idCliente){
        return vendaRepositorio.getIdUsuario(idCliente);
    }








}
