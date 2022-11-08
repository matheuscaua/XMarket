package br.com.xmarket.servicos;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.xmarket.dto.CarrinhoDTO;
import br.com.xmarket.dto.ProdutoDTO;
import br.com.xmarket.dto.RetornoUsuarioDTO;
import br.com.xmarket.modelo.Carrinho;
import br.com.xmarket.modelo.Cliente;
import br.com.xmarket.modelo.Produto;
import br.com.xmarket.repositorio.CarrinhoRepositorio;


@Service
public class CarrinhoServico {

    @Autowired
    private CarrinhoRepositorio carrinhoRepositorio;

    @Autowired
    private ProdutoServico produtoServico;

    @Autowired
    private ClienteServico usuarioServico;

    public Carrinho adicionarCarrinho(Long idProduto, Long idUsuario) {

		Produto produto = produtoServico.buscarPeloId(idProduto);
		Cliente usuario = usuarioServico.buscarPeloId(idUsuario);
		Carrinho carrinho = carrinhoRepositorio.findByUsuarioAndProduto(usuario, produto);
		Integer quantidadeAtualizada = 1;

		if (carrinho != null) {
			quantidadeAtualizada = carrinho.getQuantidade() + 1;
			carrinho.setQuantidade(quantidadeAtualizada);
			carrinho.setProduto(produto);
			carrinho.setUsuario(usuario);
			carrinho.setValorTotal(carrinho.getQuantidade() * carrinho.getProduto().getPreco());
			carrinhoRepositorio.save(carrinho);
		} else {
			carrinho = new Carrinho();
			carrinho.setUsuario(usuario);
			carrinho.setProduto(produto);
			carrinho.setQuantidade(quantidadeAtualizada);
			carrinho.setValorTotal(carrinho.getQuantidade() * carrinho.getProduto().getPreco());
			carrinhoRepositorio.save(carrinho);
		}

		return carrinho;
	}

	public List<CarrinhoDTO> buscarCarrinho(Long id) {

		List<CarrinhoDTO> carrinhos = new ArrayList<>();
		RetornoUsuarioDTO usuarioDTO = new RetornoUsuarioDTO();
		ProdutoDTO produtoDTO = new ProdutoDTO();

		List<Carrinho> carrinho = carrinhoRepositorio.findByUsuario(id);
		
		for (Carrinho c : carrinho) {
			usuarioDTO = c.toRetornoUsuarioDTO();
			produtoDTO = c.toProdutoDTO();
			carrinhos.add(new CarrinhoDTO(produtoDTO, usuarioDTO, c.getQuantidade(), c.getValorTotal()));
		}

		return carrinhos;

	}

	public boolean removerProduto(Long idProduto, Long idUsuario) {
		carrinhoRepositorio.deletarProduto(idProduto, idUsuario);
		return true;
	}

	//Função para fechar venda

	public void aumentarItemCarrinho( Long idProduto, Long idUsuario){

		carrinhoRepositorio.incrementarUmItemCarrinho(idProduto, idUsuario);

   }

   public void diminuirItemCarrinho( Long idProduto, Long idUsuario){

	   carrinhoRepositorio.diminuirUmItemCarrinho(idProduto, idUsuario);

   }


	public void removerCarrinho(Long idCliente){
		carrinhoRepositorio.limparCarrinho(idCliente);
	}


	public List<Carrinho> buscarPorUsuario(Long idCliente){

		return carrinhoRepositorio.findByUsuario(idCliente);

	}

	public void limparCarrinho(Long idUsuario){
	carrinhoRepositorio.limparCarrinho(idUsuario);
	}



}
