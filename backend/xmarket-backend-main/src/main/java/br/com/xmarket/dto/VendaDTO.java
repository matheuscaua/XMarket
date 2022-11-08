package br.com.xmarket.dto;

import br.com.xmarket.enums.EnumPagamento;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VendaDTO {



    EnumPagamento enumPagamento;

    Double valorTotal;








}
