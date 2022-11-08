package br.com.xmarket.servicos;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.xmarket.dto.ProdutoDTO;
import br.com.xmarket.modelo.Produto;
import br.com.xmarket.repositorio.ProdutoRepositorio;

@Service
public class ProdutoServico {

	@Autowired
	private ProdutoRepositorio produtoRepository;

	public List<ProdutoDTO> listarProdutos() {

		List<Produto> produtos = produtoRepository.findAll();
		List<ProdutoDTO> produtoDTOS = new ArrayList<>();


		for (Produto p : produtos) {
			produtoDTOS.add(p.toProdutoDTO());
		}

		return produtoDTOS;
	}

	public boolean inserirSomenteProduto(ProdutoDTO produtoDTO) {

		Produto produto = new Produto();
		BeanUtils.copyProperties(produtoDTO, produto);

		if (quantidadeValida(produto)) {
			produtoRepository.save(produto);
			return true;
		}

		return false;
	}

	public String inserirSomenteImagem(MultipartFile arquivoImagem) {
		Path path = Paths.get("");

		try {

			String diretorioImagens = "..\\..\\imagens-produtos\\";
			byte[] bytes = arquivoImagem.getBytes();
			path = Paths.get(diretorioImagens + arquivoImagem.getOriginalFilename());
			Files.write(path, bytes);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return (path.toString());
	}

	public boolean excluirProduto(Long idProduto) {
		Produto produto = buscarPeloId(idProduto);
		if (produto != null) {
			produtoRepository.atualizarQuantidade(0, idProduto);
			return true;
		}
		return false;
	}

	public boolean editarProduto(Produto produto) {
		if (quantidadeValida(produto)) {
			produtoRepository.save(produto);
			return true;
		}
		return false;
	}

	public Produto buscarPeloId(Long idProduto) {
		Produto produto = new Produto();
		produto = produtoRepository.findById(idProduto).orElse(null);
		return produto;
	}

	// Validações//////////////////////////////////////////////////////
	public boolean quantidadeValida(Produto produto) {
		if (produto.getQuantidade() < 0) {
			return false;
		}
		return true;
	}

	public Integer buscarQuantidade(Long id) {
		return produtoRepository.buscarQuantidade(id);

	}

	public List<Produto> buscarTodos(){
		return produtoRepository.findAll();
	}


	public List<ProdutoDTO> buscarPorCategoria(String categoria){
		List<Produto> produtos = new ArrayList<>();
		List<ProdutoDTO> produtoDTOS = new ArrayList<>();
		produtos = produtoRepository.buscarPorCategoria(categoria);
		for (Produto p : produtos) {
			produtoDTOS.add(p.toProdutoDTO());
		}
		return produtoDTOS;
	}

	public void atualizarQuantidadeEstoque(Integer quantidade, Long idProduto){
		 produtoRepository.atualizarQuantidade(quantidade,idProduto);
	}



}


