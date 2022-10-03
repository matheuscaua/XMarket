package br.com.seguranca.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeControlador {

    @GetMapping("/home")
    public String home(){
        return "Essa é a pagina principal";
    }

    @GetMapping("/admin")
    public String admin(){
        return "Essa é a pagina de admin";
    }

}
