package br.com.xmarket.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.xmarket.dto.ProdutoDTO;
import br.com.xmarket.servicos.ProdutoServico;


@CrossOrigin("*")
@RestController
@RequestMapping("/produtos")
public class ProdutoControlador {


	@Autowired
	private ProdutoServico produtoService;

	
	@GetMapping
	public ResponseEntity<List<ProdutoDTO>> buscarTodos(){

		List<ProdutoDTO> produtoDTOS = produtoService.listarProdutos();

		if(produtoDTOS.isEmpty()){
			return ResponseEntity.status(204).build();
		}

		return ResponseEntity.status(200).body(produtoDTOS);

	}

	@GetMapping("/categoria")
	public ResponseEntity<List<ProdutoDTO>> buscarPorCategoria(@RequestParam("categoria") String categoria){

		List<ProdutoDTO> produtos = produtoService.buscarPorCategoria(categoria);

		if(produtos.isEmpty()){
			return ResponseEntity.status(204).build();
		}

		return ResponseEntity.status(200).body(produtos);
	}










}
