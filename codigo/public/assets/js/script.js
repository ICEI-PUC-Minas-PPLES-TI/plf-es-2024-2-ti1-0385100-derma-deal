// Simulando a recuperação de dados do banco de dados
const produtos = [
    { id: 1, nome: "Produto 1", imagem: "/assets/images/n1.png" },
    { id: 2, nome: "Produto 2", imagem: "/assets/images/n2.png" },
    { id: 3, nome: "Produto 3", imagem: "/assets/images/n3.jpeg" },
    { id: 4, nome: "Produto 4", imagem: "/assets/images/n4.jpeg" },
    { id: 5, nome: "Produto 5", imagem: "/assets/images/n5.jpeg" },
    // Adicione mais produtos conforme necessário
];

// Função para criar e adicionar produtos ao DOM
function carregarProdutos() {
    const container = document.getElementById('product-container');

    produtos.forEach(produto => {
        // Criando a estrutura do card do produto
        const col = document.createElement('div');
        col.className = 'col-md-3 col-sm-6 mb-4';

        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = produto.imagem;
        img.className = 'card-img-top';
        img.alt = produto.nome;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = produto.nome;

        // Estruturando o card
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        col.appendChild(card);
        container.appendChild(col);
    });
}

// Chamar a função para carregar os produtos ao carregar a página
window.onload = carregarProdutos;
