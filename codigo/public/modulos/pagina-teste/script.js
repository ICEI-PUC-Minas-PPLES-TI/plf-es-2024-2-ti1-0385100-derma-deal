const favoriteBtn = document.getElementById('favoriteBtn');
const cartBtn = document.getElementById('cartBtn');

// Usando let para o estado do botao const NÃO FUNCIONA 
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Atualiza o estado dos botões com base no localStorage
function updateButtonState() {
    const productId = 'produto1'; // Identificador do produto e obviamente vai ser mudado risk**
    favoriteBtn.classList.toggle('active', favorites.includes(productId));
    cartBtn.classList.toggle('active', cartItems.includes(productId));
}

updateButtonState();

favoriteBtn.addEventListener('click', function() {
    const productId = 'produto1'; // productId fixo como exemplo risk**

    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
    } else {
        favorites.push(productId);
    }

    // Atualiza o localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    updateButtonState(); 
});

cartBtn.addEventListener('click', function() {
    const productId = 'produto1';

    if (cartItems.includes(productId)) {
        cartItems = cartItems.filter(id => id !== productId);
    } else {
        cartItems.push(productId);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    updateButtonState(); // Atualizando os dois elementos para haver uma sincronia de "estados"
});
