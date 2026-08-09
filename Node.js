async function buscarMercadoLivre() {
  const r = await fetch(
    'https://api.mercadolibre.com/sites/MLB/search?q=promoção&sort=sold_quantity_desc'
  );
  const d = await r.json();
  return d.results.slice(0, 20);
}

async function buscarShopee() {
  // usa o feed oficial de afiliados da Shopee
  const r = await fetch('https://seu-feed-shopee');
  const d = await r.json();
  return d.items.slice(0, 20);
}

async function gerarLote() {
  const ml = await buscarMercadoLivre();
  const shopee = await buscarShopee();

  const todos = [...ml, ...shopee];

  // IA escolhe os 5 melhores
  return todos.slice(0, 5);
}
