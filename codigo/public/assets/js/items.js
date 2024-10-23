// Código ProductApp

// URL base das APIs
const API_PRODUCT_URL = '/productItems';
const API_USER_URL = '/users';

// Objeto para o banco de dados de produtos baseado em JSON
var db_productItems = [];

// Inicializa a aplicação de Produtos
function initProductApp() {
    // Carrega os itens de produtos ao inicializar a aplicação
    carregarProductItems(() => {
        console.log('Itens de produtos carregados...');
    });
};

// Carrega os itens de produtos do JSON Server
function carregarProductItems(callback) {
    fetch(API_PRODUCT_URL)
        .then(response => response.json())
        .then(data => {
            db_productItems = data;
            callback();
        })
        .catch(error => {
            console.error('Erro ao ler itens de produtos via API JSONServer:', error);
            displayMessage("Erro ao ler itens de produtos");
        });
}

// Adiciona um item aos favoritos do usuário
function addProductToFavorites(usuarioId, productId) {
    // Busca o usuário pelo ID
    fetch(`${API_USER_URL}/${usuarioId}`)
        .then(response => response.json())
        .then(usuario => {
            // Verifica se o usuário existe
            if (usuario) {
                // Adiciona o ID do produto à lista de favoritos do usuário
                if (!usuario.favoriteItems) {
                    usuario.favoriteItems = []; // Inicializa se não existir
                }
                
                // Verifica se o produto já está na lista de favoritos
                if (!usuario.favoriteItems.includes(productId)) {
                    usuario.favoriteItems.push(productId);
                    
                    // Atualiza o usuário no JSON Server
                    fetch(`${API_USER_URL}/${usuarioId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(usuario),
                    })
                    .then(response => response.json())
                    .then(() => {
                        displayMessage("Produto adicionado aos favoritos com sucesso");
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar usuário via API JSONServer:', error);
                        displayMessage("Erro ao adicionar produto aos favoritos");
                    });
                } else {
                    displayMessage("Produto já está nos favoritos");
                }
            } else {
                displayMessage("Usuário não encontrado");
            }
        })
        .catch(error => {
            console.error('Erro ao buscar usuário via API JSONServer:', error);
            displayMessage("Erro ao buscar usuário");
        });
}

// Função para exibir mensagens ao usuário
function displayMessage(message) {
    alert(message); // Simples alerta para exibir mensagens
}

// Inicializa as estruturas utilizadas pelo ProductApp
initProductApp();
