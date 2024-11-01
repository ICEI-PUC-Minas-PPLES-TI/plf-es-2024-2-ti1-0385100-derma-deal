// productService.js

const apiUrl = 'http://localhost:3000/productItems'; // Ajuste a URL conforme necessário

// Função para obter todos os produtos
export async function getProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        return await response.json(); // Retorna a lista de produtos
    } catch (error) {
        console.error(error);
    }
}

// Função para obter um produto específico pelo ID
export async function getProductById(productId) {
    try {
        const response = await fetch(`${apiUrl}/${productId}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar o produto com ID ${productId}`);
        }
        return await response.json(); // Retorna o produto
    } catch (error) {
        console.error(error);
    }
}

// Função para adicionar um novo produto
export async function addProduct(productData) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData), // Converte o objeto do produto em uma string JSON
        });
        if (!response.ok) {
            throw new Error('Erro ao adicionar o produto');
        }
        return await response.json(); // Retorna o produto adicionado
    } catch (error) {
        console.error(error);
    }
}

// Função para atualizar um produto existente
export async function updateProduct(productId, productData) {
    try {
        const response = await fetch(`${apiUrl}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData), // Converte o objeto do produto em uma string JSON
        });
        if (!response.ok) {
            throw new Error(`Erro ao atualizar o produto com ID ${productId}`);
        }
        return await response.json(); // Retorna o produto atualizado
    } catch (error) {
        console.error(error);
    }
}

// Função para deletar um produto pelo ID
export async function deleteProduct(productId) {
    try {
        const response = await fetch(`${apiUrl}/${productId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Erro ao deletar o produto com ID ${productId}`);
        }
        return await response.json(); // Retorna a confirmação da deleção
    } catch (error) {
        console.error(error);
    }
}
