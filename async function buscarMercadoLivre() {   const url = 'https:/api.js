async function buscarMercadoLivre() {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=fone+bluetooth&sort=sold_quantity_desc';

  const res = await fetch(url);
  const data = await res.json();

  return data.results.slice(0, 5).map(p => ({
    titulo: p.title,
    preco: p.price,
    link: p.permalink,
    imagem: p.thumbnail
  }));
}

buscarMercadoLivre().then(console.log);
