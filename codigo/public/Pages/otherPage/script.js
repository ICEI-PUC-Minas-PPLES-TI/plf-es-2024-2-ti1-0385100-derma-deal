import { deleteFavoriteItem, getFavoriteItems, postFavoriteItem } from '../../assets/js/favoriteService.js';
import { getProductById } from '../../assets/js/productService.js'; // Importa o serviço de produtos

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogadoDiv = document.getElementById('usuario-logado');
    const userIdInput = document.getElementById('userIdInput');
    const confirmUserIdButton = document.getElementById('confirmUserId');
    const usuarioInfoDiv = document.getElementById('usuarioInfo');
    const getFavoriteItemsButton = document.getElementById('getFavoriteItems');
    const favoriteItemsDiv = document.getElementById('favoriteItems');
    const checkProductSection = document.getElementById('checkProductSection');
    const productIdInput = document.getElementById('productIdInput');
    const confirmProductIdButton = document.getElementById('confirmProductId');
    const productInfoDiv = document.getElementById('productInfo');
    const favoriteActionsDiv = document.getElementById('favoriteActions');
    const removeFavoriteButton = document.getElementById('removeFavorite');
    const addFavoriteButton = document.getElementById('addFavorite');

    // Verifica se o usuário está logado
    const currentUser = sessionStorage.getItem('usuarioCorrente');
    if (currentUser) {
        const usuarioCorrente = JSON.parse(currentUser);
        usuarioLogadoDiv.textContent = `USUARIO LOGADO: ${usuarioCorrente.login} ${usuarioCorrente.id}`;
    } else {
        usuarioLogadoDiv.textContent = 'USUARIO LOGADO: nenhum';
    }

    // Confirma o ID do usuário
    confirmUserIdButton.addEventListener('click', () => {
        const userId = userIdInput.value;
        if (userId) {
            usuarioInfoDiv.textContent = `Usuário: ${userId}`;
            checkProductSection.style.display = 'block';
            favoriteActionsDiv.style.display = 'none'; // Esconder ações de favoritos inicialmente
        } else {
            usuarioInfoDiv.textContent = 'ID de usuário inválido.';
        }
    });

    // Obter itens favoritos
    getFavoriteItemsButton.addEventListener('click', async () => {
        const userId = userIdInput.value;
        if (userId) {
            const produtosFavoritos = await getFavoriteItems(userId);
            favoriteItemsDiv.innerHTML = ''; // Limpa o conteúdo anterior

            if (produtosFavoritos.length > 0) {
                produtosFavoritos.forEach(produto => {
                    const itemDiv = document.createElement('div');
                    itemDiv.textContent = `ID: ${produto.itemId}, Nome: ${produto.name}`;
                    favoriteItemsDiv.appendChild(itemDiv);
                });
            } else {
                favoriteItemsDiv.textContent = 'Nenhum item favorito encontrado.';
            }
        } else {
            favoriteItemsDiv.textContent = 'ID de usuário inválido.';
        }
    });

    // Confirma o ID do produto
    confirmProductIdButton.addEventListener('click', async () => {
        const productId = productIdInput.value;
        const userId = userIdInput.value; // Captura o ID do usuário

        if (productId && userId) {
            // Verifica se o produto existe usando o productService
            const produtoEncontrado = await getProductById(productId);

            productInfoDiv.innerHTML = ''; // Limpa o conteúdo anterior

            if (produtoEncontrado) {
                productInfoDiv.textContent = `Produto encontrado: ID: ${produtoEncontrado.id}, Nome: ${produtoEncontrado.name}`;
                favoriteActionsDiv.style.display = 'block'; // Exibir ações de favoritos

                // Obter os favoritos do usuário para verificar se o produto já está lá
                const produtosFavoritos = await getFavoriteItems(userId);
                const isFavorito = produtosFavoritos.some(produto => produto.itemId === produtoEncontrado.id);
                console.log({produtoEncontrado})
                // Ação para remover o favorito
                removeFavoriteButton.onclick = async () => {
                    if (isFavorito) {
                        await deleteFavoriteItem(userId, produtoEncontrado.id); // Chame a função para remover
                        alert(`Produto ${produtoEncontrado.name} removido dos favoritos.`);
                    } else {
                        alert(`Erro: Produto ${produtoEncontrado.name} não está nos favoritos.`);
                    }
                };

                // Ação para adicionar o favorito
                addFavoriteButton.onclick = async () => {
                    if (!isFavorito) {
                        await postFavoriteItem(userId, produtoEncontrado); // Chame a função para adicionar
                        alert(`Produto ${produtoEncontrado.name} adicionado aos favoritos.`);
                    } else {
                        alert(`Erro: Produto ${produtoEncontrado.name} já está nos favoritos.`);
                    }
                };
            } else {
                productInfoDiv.textContent = 'Produto não existe.';
                favoriteActionsDiv.style.display = 'none'; // Esconder ações se o produto não existir
            }
        } else {
            productInfoDiv.textContent = 'ID do produto ou ID do usuário inválido.';
        }
    });
});
