import {
    deleteFavoriteItem,
    getFavoriteItems,
    postFavoriteItem,
} from "../../assets/js/favoriteService.js";
import { getProducts } from "../../assets/js/productService.js";

let allProducts = []; 
let favoriteItems = []; 
let usuarioCorrente = null; 

async function carregarProdutos() {
    const currentUser = sessionStorage?.getItem("usuarioCorrente");
    usuarioCorrente = JSON.parse(currentUser); 
    const userId = usuarioCorrente?.id ?? 1; // GAMBIARRA risk**

    favoriteItems = await getFavoriteItems(userId); 
    allProducts = await getProducts(); 

    renderizarProdutos(allProducts); 
    configurarBarraDePesquisa(); 
}

// Função para renderizar os produtos na tela
function renderizarProdutos(produtos) {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; // Limpa os produtos anteriores

    produtos.forEach((produto) => {
        const col = document.createElement("div");
        col.className = "col-md-3 col-sm-6 mb-4";

        const card = document.createElement("div");
        card.className = "card product-card";

        const img = document.createElement("img");
        img.src = produto.imagem;
        img.className = "card-img-top";
        img.alt = produto.name;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body text-center";

        const title = document.createElement("h5");
        title.className = "card-title product-title";
        title.textContent = produto.id + " " + produto.name;

        const buttonRow = document.createElement("div");
        buttonRow.className = "d-flex justify-content-between mt-3";

        const compareButton = document.createElement("button");
        compareButton.className = "btn btn-outline-primary btn-sm";
        compareButton.textContent = "Comparar";

        const favoriteButton = document.createElement("button");
        favoriteButton.className = "btn btn-sm";

        const isFavorito = favoriteItems.some((fav) => fav.itemId === produto.id);
        updateFavoriteButtonState(favoriteButton, isFavorito);

        favoriteButton.addEventListener("click", async () => {
            const isCurrentlyFavorito = favoriteItems.some(
                (fav) => fav.itemId === produto.id
            );

            if (isCurrentlyFavorito) {
                await deleteFavoriteItem(usuarioCorrente.id, produto.id);
                favoriteItems = favoriteItems.filter(
                    (fav) => fav.itemId !== produto.id
                );
                updateFavoriteButtonState(favoriteButton, false);
            } else {
                await postFavoriteItem(usuarioCorrente.id, produto);
                favoriteItems.push({ itemId: produto.id });
                updateFavoriteButtonState(favoriteButton, true);
            }
        });

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

// Função para atualizar o estado do botão favorito
function updateFavoriteButtonState(button, isFavorito) {
    if (isFavorito) {
        button.classList.remove("btn-outline-danger");
        button.classList.add("btn-danger");
        button.textContent = "Favoritos";
    } else {
        button.classList.remove("btn-danger");
        button.classList.add("btn-outline-danger");
        button.textContent = "Favoritos";
    }
}

// Função para configurar a barra de pesquisa
function configurarBarraDePesquisa() {
    const searchBar = document.getElementById("search-bar");

    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value.toLowerCase();
        const produtosFiltrados = allProducts.filter(produto =>
            produto.name.toLowerCase().includes(searchTerm)
        );
        renderizarProdutos(produtosFiltrados); // Renderiza de novo os produtos =D
    });
}

document.addEventListener("DOMContentLoaded", carregarProdutos);
