package br.com.seguranca.model;

import br.com.seguranca.enums.EnumPagamento;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tabela_venda")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private EnumPagamento enumPagamento;

    @ManyToOne
    private Usuario usuario;

    private LocalDateTime dataVenda;

    @ManyToOne
    private Produto produto;

    private Double valorUnitario;

    private Double valorTotal;



}
