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

import br.com.xmarket.modelo.Produto;

public class ExportarExcelProdutos extends ExportadorAbstrato {

    private XSSFWorkbook workbook;
    private XSSFSheet sheet;


    public ExportarExcelProdutos() {
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


        createCell(row, 0, "Código", cellStyle);
        createCell(row, 1, "Produto", cellStyle);
        createCell(row, 2, "Marca", cellStyle);
        createCell(row, 3, "Preço", cellStyle);
        createCell(row, 4, "Quantidade", cellStyle);
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


    public void exportar(List<Produto> listaProdutos, HttpServletResponse response) throws IOException {
        super.setResponseHeader(response, "application/octet-stream", ".xlsx", "Produtos");

        escreverLinhaHeader();
        escreverLinhasProdutos(listaProdutos );

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();

    }

    private void escreverLinhasProdutos(List<Produto> produtos) {



        int rowIndex = 1;


        XSSFCellStyle cellStyle = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        // font.setBold(true);
        font.setFontHeight(16);
        cellStyle.setFont(font);

        for (Produto p : produtos) {

            XSSFRow row = sheet.createRow(rowIndex++);
            int columnIndex = 0;

            createCell(row, columnIndex++, String.valueOf(p.getId()), cellStyle);
            createCell(row, columnIndex++, (p.getNome()), cellStyle);
            createCell(row, columnIndex++, (p.getMarca()), cellStyle);
            createCell(row, columnIndex++, String.valueOf(p.getPreco()), cellStyle);
            createCell(row, columnIndex++, String.valueOf(p.getQuantidade()), cellStyle);



        }




    }


}