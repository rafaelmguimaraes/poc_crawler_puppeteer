# API Crawler com Express e Puppeteer

Este projeto é uma API construída com Node.js e Express, que utiliza Puppeteer para realizar scraping de uma página de produtos, filtrando e ordenando os resultados.

## Funcionalidades

- Realiza scraping da página de testes https://webscraper.io na parte de e-commerce/computers/laptops.
 Link: https://webscraper.io/test-sites/e-commerce/static/computers/laptops com Puppeteer.
- Filtra produtos da marca "Lenovo".
- Ordena os produtos do mais barato para o mais caro.
- API com rota GET na raiz (`/`) que retorna os produtos filtrados e ordenados.

## Tecnologias utilizadas

- Node.js
- Express
- Puppeteer
- Docker
- Google Chrome (para execução do Puppeteer)

## Requisitos

- [Docker](https://www.docker.com/get-started) instalado na máquina.
- [Docker Compose](https://docs.docker.com/compose/) instalado.

## Estrutura do projeto

/app 
├── src/ 
│ └── index.js # Código principal da API 
├── Dockerfile # Configuração do Docker 
├── docker-compose.yml # Configuração do Docker Compose 
└── package.json # Dependências do projeto


## Instruções de instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-repositorio/api-crawler.git
cd api-crawler
```

### 2. Execute o Docker Compose

Este comando irá construir o container e rodar a aplicação dentro de um ambiente Docker.

```bash
docker-compose up --build
```

### 3. Acesse a aplicação
Após iniciar, a API estará disponível em:

```
http://localhost:3000/
```
A rota GET na raiz (/) retornará o resultado do scraping dos produtos.

### 4. Finalizar o container
Para parar a execução da aplicação, utilize:

```bash
docker-compose down
```

## Customização
Se necessário, ajuste o arquivo docker-compose.yml para alterar as portas ou volumes mapeados.

## Observações
Este projeto utiliza o Puppeteer configurado para usar o Google Chrome instalado no container. O Puppeteer padrão é configurado para não baixar o Chromium, uma vez que o Chrome já é instalado via apt-get.

