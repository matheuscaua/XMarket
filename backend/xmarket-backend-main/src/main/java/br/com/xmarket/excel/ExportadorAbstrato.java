package br.com.xmarket.excel;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ExportadorAbstrato {


    public void setResponseHeader(HttpServletResponse response, String contentType, String extension, String name)
            throws IOException{

        DateFormat dateFormatter = new SimpleDateFormat(("yyyy-MM-dd"));
        String timeStamp = dateFormatter.format(new Date());
        String fileName = name + timeStamp + extension;

        response.setContentType(contentType);

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename= " +fileName;
        response.setHeader(headerKey, headerValue);

    }




}
