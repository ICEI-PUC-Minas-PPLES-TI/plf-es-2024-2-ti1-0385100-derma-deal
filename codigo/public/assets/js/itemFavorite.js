// itemFavorite.js

function favoriteItem(product) {
    // Obtém o usuário corrente do sessionStorage
    const usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    const usuarioCorrente = JSON.parse(usuarioCorrenteJSON);

    console.log('Usuário atual:', usuarioCorrente); // Log para verificar o usuário corrente

    // Verifica se o usuário está logado
    if (!usuarioCorrente) {
        alert('Você precisa estar logado para adicionar itens aos favoritos.');
        return;
    }

    // Faz uma requisição para obter os dados atuais do usuário do servidor
    fetch(`/users/${usuarioCorrente.id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar usuário');
            }
            return response.json();
        })
        .then(data => {
            // Certifique-se de que o favoriteItems está definido, caso contrário inicializa como um array vazio
            if (!data.favoriteItems) {
                data.favoriteItems = []; // Inicializa o array se não existir
            }

            // Cria o objeto do item a ser adicionado aos favoritos
            const favoriteItem = {
                id: data.favoriteItems.length + 1, // ID único para o item favorito
                itemId: product.id,
                name: product.name,
                entryDate: product.entryDate,
                exitDate: null, // Pode ser definido como null ou outra lógica conforme sua necessidade
                typeId: product.typeId,
                price: product.price
            };

            console.log('Item a ser adicionado aos favoritos:', favoriteItem); // Log para verificar o item

            // Verifica se o item já não está nos favoritos
            if (!data.favoriteItems.some(item => item.itemId === favoriteItem.itemId)) {
                // Adiciona o item aos favoritos
                data.favoriteItems.push(favoriteItem);
                console.log('Atualizando favoritos:', data.favoriteItems); // Log para verificar os favoritos

                // Envie os dados atualizados de volta para o servidor
                return fetch(`/users/${usuarioCorrente.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), // Envie os dados completos do usuário
                });
            } else {
                alert('Produto já está nos favoritos');
                throw new Error('Produto já está nos favoritos');
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Produto adicionado aos favoritos com sucesso!');
                console.log('Favoritos atualizados com sucesso');
            } else {
                throw new Error('Falha ao atualizar favoritos');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao adicionar produto aos favoritos');
        });
}
