  <div align="center">
    <img src="https://user-images.githubusercontent.com/93298872/199025317-c9f3a736-1398-476e-9b70-8f77acfe7451.svg" alt="logo" width="400px"/>
  </div><br>
  
  <p align="center">
    <img src="https://img.shields.io/static/v1?label=docs&message=100%&color=orange&labelColor=121214" alt="Docs">
    <img src="https://img.shields.io/github/stars/ErickRodriguesfh/xmarket?label=stars&message=MIT&color=orange&labelColor=121214" alt="Stars">
  <img src="https://img.shields.io/github/forks/ErickRodriguesfh/xmarket?label=forks&message=MIT&color=orange&labelColor=121214" alt="Forks">
  <br><br>
    <a href="#-visão-geral-do-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-quadro-organizacional-e-de-planejamento-no-notion">Quadro Organizacional e de Planejamento</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-como-rodar-a-aplicação">Rodar a aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-tecnologias-utilizadas">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-documentação">Documentação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  </p>
  
  ---

## 💻 Visão Geral do Projeto
Projeto final do programa Araujo Tech, consiste em uma aplicação no qual foi desenvolvido um e-commerce para a venda de produtos.
Este projeto foi desenvolvido pelo grupo 2 formado pelos seguintes integrantes:

<br>

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/matheuscaua"><img src="https://user-images.githubusercontent.com/93298872/199026288-0ab819a3-e27c-441e-ab61-47b0be3522ed.JPG" width="100px;" alt=""/><br/><b>Matheus Caua</b><br><sub><b>Desenvolvedor Backend<br>Validação, certificação e segurança</b></sub></a></td>
    <td align="center"><a href="https://github.com/ErickRodriguesfh"><img src="https://user-images.githubusercontent.com/93298872/199026392-76c0acc2-db35-475a-bd80-01085f638c9f.JPG" width="100px;" alt=""/><br /><b>Erick Rodrigues</b><br><sub><b>Desenvolvedor Backend</b><br>Lógica da api e relatório em excel</b></sub></a></td>
    <td align="center"><a href="https://github.com/gabrielhirano"><img src="https://user-images.githubusercontent.com/93298872/199026430-c8cf091c-1b5d-45f2-a25c-25e05b481196.JPG" width="100px;" alt=""/><br /><b>Gabriel Hirano</b><br><sub><b>Desenvolvedor FullStack<br>Desenvolvimento frontend </b></sub></a></td>
    <td align="center"><a href="https://github.com/DiogaoRecode"><img src="https://user-images.githubusercontent.com/93298872/199026582-71a9d67e-c598-44ec-9b28-cb330b25ea47.JPG" width="100px;" alt=""/><br /><b>Diogo Reis</b><br><sub><b>Desenvolvedor Backend</b><br>Banco de dados e relatórios com JasperReports</sub></a></td>

</table>

<br>



## 💻 Quadro Organizacional e de Planejamento no Notion 
### (Bastidores)

Para apresentação final (31/10/2022), criamos um Quadro Kanban de Desenvolvimento no mesmo que mostram as mudanças cruciais que ocorreram durante o  planejamento e desenvolvimento, e na implementação das modificações sugeridas no feedback do Conselho de Avaliação da GamaAcademy. Além do quadro também segue em anexo o link do slide da apresentação do projeto e o link do figma.

Notion: <https://www.notion.so/Grupo-2-c191defacfef4f6ab078437732e1a816/> <br>
Canva: <https://www.canva.com/design/DAFQhvViMQQ/ykLI8aNhBjvJMT6KFSNTXA/view?utm_content=DAFQhvViMQQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton/> <br>
Figma: <https://www.figma.com/file/xZAaQqgoiA8hKleSFQHc38/Untitled?node-id=0%3A1>



## 💻 Como rodar a aplicação

Inicialmente deve-se clonar ou baixar a aplicação, abrir o projeto com uma IDE Java como Eclipse ou Intelij no diretório xmarket/backend, após isso ir no arquivo POM.XML e clicando com o botão direito.
Selecionar a opção update project, é nescessário ter um SGBD Mysql instalado no seu computador e com um banco de dados criado com o nome xmarket(será nescessário
a atualização do usuário e senha de acordo com as configurações do seu banco de dados, está atualização pode ser feita no arquivo application.properties que se
encontra na pasta resources)
Após a execução da api abrir no VisualStudioCode o diretório frontend/xmarket-front e com o plugin live server instalado no seu vscode, rodar a aplicação
e acessar o arquivo html home-page.
Com o servidor frontend inicializado, abrir outra instância do VisualStudioCode na pasta imagens-produtos e inicializar o live server(neste diretório
serão salvas as imagens dos produtos inicializar a o liveserver nessa pasta apenas após ter feito o passo anterior de inicializar o servidor frontend),
após isso utilizar a aplicação normalmente em seu computador.


## 💻 Tecnologias Utilizadas

![Slide Xmarket](https://user-images.githubusercontent.com/93298872/199038331-650c322c-be28-4a57-b959-5fc1ee50b829.jpg)


## 💻 Documentação
Toda a documentação do app se encontra no link abaixo:


PDF: https://drive.google.com/file/d/1jFT9QS6nllMNe4XQFHtmRIFKm0ppGqEV/view?usp=sharing


Swagger: https://localhost/swagger-ui/index.html <br>
Obs: Executar o link, quando a aplicação estiver sendo feita no back-end.


