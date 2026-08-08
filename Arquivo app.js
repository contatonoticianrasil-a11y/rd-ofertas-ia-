async function carregar(){
  const res = await fetch('produtos.json');
  const produtos = await res.json();

  const lista = document.getElementById('lista');

  produtos.forEach(p => {
    lista.innerHTML += `
      <div class="card">
        <h3>${p.titulo}</h3>
        <p class="preco-antigo">De R$ ${p.precoDe}</p>
        <p class="preco">R$ ${p.precoPor}</p>
        <a href="${p.link}" target="_blank">
          <button>Comprar agora</button>
        </a>
      </div>
    `;
  });
}

carregar();
