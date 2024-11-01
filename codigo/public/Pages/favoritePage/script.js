import { getFavoriteItems } from '../../assets/js/favoriteService.js';
async function carregarProdutos() {
    const currentUser = sessionStorage?.getItem('usuarioCorrente')
    const usuarioCorrente = JSON.parse(currentUser)
    const userId = usuarioCorrente?.id ?? 1 //GAMBIARRA risk**
    console.log({userId,currentUser,usuarioCorrente})
    const produtosFavoritos = await getFavoriteItems(userId);
    //console.log(produtosFavoritos)
    const container = document.getElementById('product-container');
    produtosFavoritos.forEach(produto => {
        const col = document.createElement('div');
        col.className = 'col-md-3 col-sm-6 mb-4';

        const card = document.createElement('div');
        card.className = 'card product-card';

        const img = document.createElement('img');
        img.src = produto.imagem;
        img.className = 'card-img-top';
        img.alt = produto.name;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center';

        const title = document.createElement('h5');
        title.className = 'card-title product-title';
        title.textContent = produto.itemId + " " + produto.name ; //GAMBIARRA PRA FACILITAR O TESTE =D risk**

        const buttonRow = document.createElement('div');
        buttonRow.className = 'd-flex justify-content-between mt-3';

        const compareButton = document.createElement('button');
        compareButton.className = 'btn btn-outline-primary btn-sm';
        compareButton.textContent = 'Comparar';

        const favoriteButton = document.createElement('button');
        favoriteButton.className = 'btn btn-outline-danger btn-sm';
        favoriteButton.textContent = 'Favorito';

        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(buttonRow);
        buttonRow.appendChild(compareButton);
        buttonRow.appendChild(favoriteButton);
        col.appendChild(card);
        container.appendChild(col);
    });
}

window.onload = carregarProdutos;
