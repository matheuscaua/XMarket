package br.com.seguranca.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.seguranca.dto.CarrinhoDTO;
import br.com.seguranca.model.Carrinho;
import br.com.seguranca.services.CarrinhoServico;

@CrossOrigin("*")
@RestController
@RequestMapping("/carrinho")
public class CarrinhoControlador {

    @Autowired
    private CarrinhoServico carrinhoServico;


    @PostMapping("/adicionar/{idProduto}/{idUsuario}/{quantidade}")
    public ResponseEntity<Carrinho> AdicionarItemAoCarrinho(@PathVariable("idProduto") Long idProduto,
                                                            @PathVariable("idUsuario") Long idUsuario,
                                                            @PathVariable("quantidade")Integer quantidade){
        carrinhoServico.adicionarCarrinho(idProduto,idUsuario,quantidade);
        return ResponseEntity.status(201).build();
    }
    
    @GetMapping("/exibirCarrinho/{idUsuario}")
    public ResponseEntity<List<CarrinhoDTO>> buscarCarrinho(@PathVariable("idUsuario") Long id){
       List <CarrinhoDTO>  carrinho = carrinhoServico.buscarCarrinho(id);
       if(!carrinho.isEmpty()) {
    	   return ResponseEntity.status(200).body(carrinho);
       }else {
    	   return ResponseEntity.status(204).build();
       }

    }

    
    
    //Diogo Implementou no Banco!!!! ///
    @DeleteMapping("/removerItem/{idProduto}/{idCliente}/{quantidade}")
    public ResponseEntity<CarrinhoDTO> removerItemCarrinho(@PathVariable("idProduto") Long idProduto, @PathVariable("idCliente") Long idCliente,
                                       @PathVariable("quantidade") Integer quantidadeProduto ){
    	if(carrinhoServico.removerProduto(idProduto, idCliente, quantidadeProduto)) {
    		return ResponseEntity.status(200).build();
    	}else {
    		return ResponseEntity.status(400).build();
    	}
    }




}
