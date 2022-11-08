package br.com.xmarket.modelo;

public class MensagemEmail {
	 
	public String msgCadastro(String nome) {

		String msgCadastro = String.format("<body style='color:black'>"
				+ "<h1 style='color:black'>Olá %s, seja bem vindo! </h1>" 
				+ "<div style='text-align:justify'>"
				+ "<p style='font-size:16px'>A empresa XMarket tem o prazer de lhe dar as boas vindas e lhe parabenizar pela sua inclusão em nosso portfólio de clientes</p>"
				+ "<p style='font-size:16px'>Trabalharemos com afinco para lhe oferecer a cada dia os melhores produtos e serviços, buscando sempre a costumeira excelência no atendimento e qualidade!</p>"
				+ "</div>"
				+ "<h3>Atenciosamente,</h3>" + "<br>" + "<h3>XMarket</h3>" + "</body>", nome);

		return msgCadastro;
	}
	public String msgVenda(String nome) {
	
	String msgVenda = String.format("<body style='color:black'>"
			+ "<h3>Olá %s, </h3>%n"
			+ "<p style='font-size:16px'> Obrigado por confiar em nós, sua compra foi finalizada com sucesso!</p> %n"
			+ "<br>"
			+ "<h3>Atenciosamente,</h3>" + "<br>" + "<h3>XMarket</h3>" + "</body>", nome);
	
	return msgVenda;
	
	}
	
	public String codigoConfirmacao(){
		
		String codigo = "";

		for(int i = 0; i < 5; i++){
			int number = (int)(Math.random() * 10);

			codigo = codigo +" "+  Integer.toString(number);
		}

		return codigo;

	}
}
