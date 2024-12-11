const apiUrl = 'http://localhost:3000';

async function getFavoriteItems(userId) {
  try {
    const response = await fetch(`${apiUrl}/users/${userId}`);
    const userData = await response.json();
    
    if (userData && userData.favoriteItems) {
      return userData.favoriteItems;
    } else {
      throw new Error("Nenhum item favorito encontrado.");
    }
  } catch (error) {
    console.error('Erro ao buscar itens favoritos:', error);
  }
}

async function postFavoriteItem(userId, newItem) {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}`);
      const userData = await response.json();
  
      if (userData && userData.favoriteItems) {
        // Verifica se o item já está nos favoritos
        const itemExists = userData.favoriteItems.some(item => item.itemId === newItem.id);
  
        if (!itemExists) {
          // Cria um novo item favorito com itemId
          const favoriteItem = {
            favoriteItemId: Date.now(), // Gera um ID único com base no timestamp
            itemId: newItem.id,      // Adiciona o itemId aqui
            name: newItem.name,
            entryDate: newItem.entryDate,
            exitDate: null,              // Null porque o item não foi removido
            typeId: newItem.typeId,
            price: newItem.price,
            imagem: newItem.imagem
          };
  
          userData.favoriteItems.push(favoriteItem);
  
          await fetch(`${apiUrl}/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          });
  
          console.log('Item favoritado com sucesso!');
        } else {
          console.log('Este item já está nos favoritos.');
        }
      } else {
        throw new Error("Erro ao adicionar item favorito.");
      }
    } catch (error) {
      console.error('Erro ao adicionar item favorito:', error);
    }
  }
  

  async function deleteFavoriteItem(userId, itemId) {
    try {
        const response = await fetch(`${apiUrl}/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados do usuário: ${response.statusText}`);
        }

        const userData = await response.json();

        // Verifica se o usuário tem favoritos
        if (userData && userData.favoriteItems) {
          const sexo = userData.favoriteItems
            // Filtra os itens favoritos, removendo o item que queremos deletar
            const updatedFavorites = userData.favoriteItems.filter(item => item.itemId !== itemId);
            console.log({updatedFavorites,sexo,itemId})
            // Atualiza a lista de favoritos no objeto do usuário
            userData.favoriteItems = updatedFavorites;

            // Enviando a atualização de volta ao servidor
            const updateResponse = await fetch(`${apiUrl}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            // Verifique se a atualização foi bem-sucedida
            if (!updateResponse.ok) {
                throw new Error(`Erro ao atualizar os favoritos: ${updateResponse.statusText}`);
            }

            console.log('Item removido dos favoritos com sucesso!');
        } else {
            throw new Error("Nenhum item favorito encontrado para este usuário.");
        }
    } catch (error) {
        console.error('Erro ao remover item favorito:', error);
    }
}



export { deleteFavoriteItem, getFavoriteItems, postFavoriteItem };

