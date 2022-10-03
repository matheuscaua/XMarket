package br.com.seguranca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.seguranca.dto.ProdutoDTO;
import br.com.seguranca.services.ProdutoServico;

@RestController
@RequestMapping("/admin/produtos")
public class ProdutoControlador {

	@Autowired
	private ProdutoServico produtoService;
	@GetMapping("/listarProdutos")
	public ResponseEntity<List<ProdutoDTO>> buscarTodos(){
		List<ProdutoDTO> produtos = produtoService.listarProdutos();
		return ResponseEntity.status(200).body(produtos);
	}


}
