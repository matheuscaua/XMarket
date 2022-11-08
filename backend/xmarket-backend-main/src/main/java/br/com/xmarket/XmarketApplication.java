package br.com.xmarket;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@OpenAPIDefinition(
		info = @Info(title = "Api XMarket", version = "2.0.0", description = "API Para uso interno do e-commerce"),
		servers = {
				@Server(url = "https://localhost/")
		}
)
public class XmarketApplication {

	public static void main(String[] args) {
		SpringApplication.run(XmarketApplication.class, args);
	}

}
