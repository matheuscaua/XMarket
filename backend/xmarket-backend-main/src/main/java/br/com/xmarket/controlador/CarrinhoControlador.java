package br.com.xmarket.controlador;



import java.util.List;

import br.com.xmarket.modelo.Cliente;
import br.com.xmarket.servicos.ClienteServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.xmarket.dto.CarrinhoDTO;
import br.com.xmarket.modelo.Carrinho;
import br.com.xmarket.modelo.Produto;
import br.com.xmarket.servicos.CarrinhoServico;

@CrossOrigin("*")
@RestController
@RequestMapping("/carrinho")
public class CarrinhoControlador {

    @Autowired
    private CarrinhoServico carrinhoServico;

    @Autowired
    private ClienteServico clienteServico;

    @PostMapping("/{idCliente}/adicionar/{idProduto}")
    public ResponseEntity<Carrinho> AdicionarItemAoCarrinho(@PathVariable("idCliente") Long idCliente,
                                                            @PathVariable("idProduto") Long idProduto

                                                            ){

        Cliente cliente = clienteServico.buscarPeloId(idCliente);

            if(cliente != null) {
                carrinhoServico.adicionarCarrinho(idProduto, idCliente);
                return ResponseEntity.status(201).build();
            }
            return ResponseEntity.status(412).build();
    }


    // buscar carrinho pelo id do usuario
    @GetMapping("/{idUsuario}")
    public ResponseEntity<List<CarrinhoDTO>> buscarCarrinho(@PathVariable("idUsuario") Long id){
       List <CarrinhoDTO>  carrinho = carrinhoServico.buscarCarrinho(id);
       if(!carrinho.isEmpty()) {
    	   return ResponseEntity.status(200).body(carrinho);
       }else {
    	   return ResponseEntity.status(204).build();
       }

    }

       
    @DeleteMapping("deletar/{idCliente}")
    public ResponseEntity<?> removerCarrinho(@PathVariable("idCliente") Long idCliente){
        try {
            carrinhoServico.removerCarrinho(idCliente);

            return ResponseEntity.status(204).body("Carrinho removido!");
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.status(400).build();
        }
    }

    //paramos aqui
    //Diogo Implementou no Banco!!!! ///
    //Endpoint para remover um item do carrinho
    @DeleteMapping("/{idCliente}/remover-produto/{idProduto}")
    public ResponseEntity<CarrinhoDTO> removerItemCarrinho(@PathVariable("idProduto") Long idProduto,
                                                           @PathVariable("idCliente") Long idCliente){
    	if(carrinhoServico.removerProduto(idProduto, idCliente)) {
    		return ResponseEntity.status(200).build();
    	}else {
    		return ResponseEntity.status(400).build();
    	}
    }

    //Endpoint pra controlar a quantidade de itens no carrinho
    @PutMapping("/{id-cliente}/alterar/{id-produto}/{ordem}")
    public ResponseEntity<Produto> alterarQuantidadeProduto(
                                                            @PathVariable("id-cliente") Long idCliente,
                                                            @PathVariable("id-produto") Long idProduto, 
                                                            @PathVariable("ordem") String ordem){

        Cliente cliente = clienteServico.buscarPeloId(idCliente);

        if(cliente == null) return ResponseEntity.status(412).build();

        if(ordem.equals("AUMENTAR")){
            carrinhoServico.aumentarItemCarrinho(idProduto, idCliente);
        }
        if(ordem.equals("DIMINUIR")){
            carrinhoServico.diminuirItemCarrinho(idProduto, idCliente);
        }

        return ResponseEntity.status(200).build();
    }   
}
