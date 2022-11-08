package br.com.xmarket.controlador;

import java.io.IOException;
import java.sql.Date;
import java.util.List;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.xmarket.excel.ExportarExcelProdutos;
import br.com.xmarket.excel.ExportarExcelVendas;
import br.com.xmarket.modelo.ItemVenda;
import br.com.xmarket.modelo.Produto;
import br.com.xmarket.servicos.JasperServico;
import br.com.xmarket.servicos.ProdutoServico;
import br.com.xmarket.servicos.VendaServico;

@CrossOrigin("*")
@RestController
@RequestMapping("/relatorio")
public class JasperControlador {

    @Autowired
    private JasperServico service;

    @Autowired
    private VendaServico vendaServico;

    @Autowired
    private ProdutoServico produtoServico;

    @GetMapping("/pdf/{code}")
    public ResponseEntity<?> relatorioPdfVendasProdutos(@PathVariable("code") String code, HttpServletResponse response) throws IOException {

        //Gera o relatório em pdf de vendas geral (01), e produtos (02)

        if(code.equals("01")) {
            byte[] bytes = service.exportarPDF(code);
            response.setContentType(MediaType.APPLICATION_PDF_VALUE);
            response.getOutputStream().write(bytes);
            return ResponseEntity.status(200).build();
        }
        if(code.equals("07")){
            byte[] bytes = service.exportarPDF(code);
            response.setContentType(MediaType.APPLICATION_PDF_VALUE);
            response.getOutputStream().write(bytes);
            return ResponseEntity.status(200).build();

        }

            return ResponseEntity.status(404).body("Não foi possível gerar o relatório");
    }


    //Relatório de vendas com filtro por data
    @GetMapping("/pdf/filtro/data")
    public ResponseEntity<?> relatorioPdfVendaFiltroData(
                                  @RequestParam(name="data_inicio",required =false) Date data_inicio,
                                  @RequestParam(name="data_final",required =false) Date data_final,
                                  HttpServletResponse response) throws IOException {

        service.addParams("DATA_INICIO", data_inicio);
        service.addParams("DATA_FIM", data_final);
        byte[] bytes = service.exportarPDF("02");

        if(bytes.length == 0){
            return ResponseEntity.status(404).build();
        }


        response.setHeader("Content-disposition","inline;filename=relatorio-"+"02"+".pdf");
        response.setContentType(MediaType.APPLICATION_PDF_VALUE);
        response.getOutputStream().write(bytes);
        return ResponseEntity.status(200).build();
    }


    //Metodos responsaveis por preencher a lista
    @ModelAttribute("data_inicio")
    public List<String> getDataInicio(){
        return vendaServico.getDataInicio();
    }

    @ModelAttribute("data_final")
    public List <String> getDataFinal(){
        return vendaServico.getDataFinal();
    }


    @GetMapping("/excel/produtos")
    public ResponseEntity<?> exportarParaExcelProdutos(HttpServletResponse response) throws IOException{

        List<Produto> produtos = produtoServico.buscarTodos();

        if(produtos.isEmpty()){
            return ResponseEntity.status(404).body("Erro ao gerar o relatório");
        }
        ExportarExcelProdutos exportarExcelProdutos = new ExportarExcelProdutos();
        exportarExcelProdutos.exportar(produtos, response);
        return ResponseEntity.status(200).build();
    }


    @GetMapping("/excel/vendas")
    public ResponseEntity<?> exportarParaExcelVendas(HttpServletResponse response) throws  IOException{
      List<ItemVenda> itensVendas =  vendaServico.buscarItemVenda();

      if(itensVendas.isEmpty()){
          return ResponseEntity.status(404).body("Erro ao gerar o relatório");
      }

      ExportarExcelVendas exportarVendas = new ExportarExcelVendas();
      exportarVendas.exportar(itensVendas,  response);
      return ResponseEntity.status(200).build();

    }






}
