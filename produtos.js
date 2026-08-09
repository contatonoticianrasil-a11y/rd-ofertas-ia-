import axios from 'axios';

export async function buscarProdutos() {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=promoção&sort=sold_quantity_desc';

  const res = await axios.get(url);

  return res.data.results.slice(0, 5).map(p => ({
    titulo: p.title,
    preco: p.price,
    link: p.permalink
  }));
}
