package br.com.xmarket.servicos;

import br.com.xmarket.modelo.ItemVenda;
import br.com.xmarket.repositorio.ItemVendaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemVendaServico {


    @Autowired
    private ItemVendaRepositorio itemVendaRepository;

    public List<ItemVenda> buscarItemVenda(){
        return itemVendaRepository.findAll();
    }















}
