package br.com.xmarket.excel;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import br.com.xmarket.modelo.ItemVenda;

public class ExportarExcelVendas extends ExportadorAbstrato {


    private XSSFWorkbook workbook;
    private XSSFSheet sheet;


    public ExportarExcelVendas() {
        workbook = new XSSFWorkbook();
    }

    private void escreverLinhaHeader() {
        sheet = workbook.createSheet("Vendas");
        XSSFRow row = sheet.createRow(0);

        XSSFCellStyle cellStyle = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        cellStyle.setFont(font);

        createCell(row, 0, "Produto", cellStyle);
        createCell(row, 1, "Quantidade", cellStyle);
        createCell(row, 2, "Preço Unitário", cellStyle);
        createCell(row, 3, "Código Venda", cellStyle);
        createCell(row, 4, "Cliente", cellStyle);
        createCell(row, 5, "Data Venda", cellStyle);
        createCell(row, 6, "Pagamento", cellStyle);
        createCell(row, 7, "Total", cellStyle);
        createCell(row, 8, "Categoria", cellStyle);

    }

    private void createCell(XSSFRow row, int columnIndex, Object value, CellStyle style) {
        XSSFCell cell = row.createCell(columnIndex);
        sheet.autoSizeColumn(columnIndex);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else {

            cell.setCellValue((String) value);
        }

        cell.setCellStyle(style);

    }


    public void exportar(List<ItemVenda> itens, HttpServletResponse response) throws IOException {
        super.setResponseHeader(response, "application/octet-stream", ".xlsx", "Vendas");

        escreverLinhaHeader();
        escreverLinhasProdutos(itens);

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();

    }

    private void escreverLinhasProdutos(List<ItemVenda> itens) {

        int rowIndex = 1;


        XSSFCellStyle cellStyle = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(16);
        cellStyle.setFont(font);


        for (ItemVenda i : itens) {

            XSSFRow row = sheet.createRow(rowIndex++);
            int columnIndex = 0;


            createCell(row, columnIndex++, String.valueOf(i.getProduto().getNome()), cellStyle);
            createCell(row, columnIndex++, String.valueOf(i.getQuantidade()), cellStyle);
            createCell(row, columnIndex++, String.valueOf(i.getProduto().getPreco()), cellStyle);
            createCell(row, columnIndex++, String.valueOf(i.getVenda().getIdVenda()), cellStyle);
            createCell(row, columnIndex++, String.valueOf(i.getVenda().getUsuario().getNome()), cellStyle);
            createCell(row, columnIndex++, String.valueOf(i.getVenda().getDataVenda()), cellStyle);
            createCell(row, columnIndex++, String.valueOf(i.getVenda().getFormaPagamento()), cellStyle);
            createCell(row, columnIndex++, String.valueOf(i.getVenda().getValorTotal()), cellStyle);
            createCell(row, columnIndex++, String.valueOf(i.getProduto().getCategoria()), cellStyle);



        }



    }


}
