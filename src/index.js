const express = require('express');
const puppeteer = require('puppeteer');

const server = express();

// Função para extrair dados de produtos da página atual
async function extractProducts(page) {
  const products = await page.$$('.product-wrapper.card-body');
  
  const productData = await Promise.all(products.map(async (card) => {
    const title = await card.$eval('.title', el => el.getAttribute('title'));
    const priceText = await card.$eval('.price', el => el.textContent.trim());
    const price = parseFloat(priceText.replace('$', '')); // Remove o '$' e converte para número
    const description = await card.$eval('.description', el => el.textContent.trim());
    const reviews = await card.$eval('p[data-rating]', el => el.getAttribute('data-rating'));
    const reviewCount = await card.$eval('.review-count.float-end', el => el.textContent.trim());
    return { title, price, description, reviews, reviewCount };
  }));
  
  return productData;
}

// Função para verificar se há um botão "Próxima" habilitado e, se sim, seguir o link
async function goToNextPage(page) {
  const nextButton = await page.$('li.page-item a.page-link[rel="next"]');
  
  if (nextButton) {
    const nextPageLink = await page.$eval('li.page-item a.page-link[rel="next"]', el => el.href);
    await page.goto(nextPageLink);
    return true; // Existe próxima página
  }

  return false; // Não há próxima página
}

// Função principal para coletar todos os produtos de todas as páginas
async function scrapeAllPages(page) {
  let allProducts = [];

  do {
    const products = await extractProducts(page);
    allProducts = allProducts.concat(products);
  } while (await goToNextPage(page)); // Enquanto houver próxima página, continue

  return allProducts;
}

server.get('/', async (req, res) => {
  const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox'],
  });
  const page = await browser.newPage();

  await page.goto('https://webscraper.io/test-sites/e-commerce/static/computers/laptops');

  const allProducts = await scrapeAllPages(page);

  // Filtra apenas os produtos da marca Lenovo
  const allProductsLenovo = allProducts.filter(product => product.title.includes('Lenovo'));

  // Ordena os produtos do mais barato para o mais caro
  allProductsLenovo.sort((a, b) => a.price - b.price);

  console.log('Total de produtos Lenovo:', allProductsLenovo.length);
  console.log(allProductsLenovo);
  
  await browser.close();
  res.send(allProductsLenovo);
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});