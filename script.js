document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const cartItems = document.getElementById('cart-items');
    const cartItemTemplate = document.getElementById('cart-item-template').content;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = cartItemTemplate.cloneNode(true);
            cartItem.querySelector('.product-name').textContent = item.name;
            cartItem.querySelector('.product-quantity').textContent = item.quantity;
            cartItem.querySelector('.modify-quantity').addEventListener('click', () => modifyQuantity(index));
            cartItem.querySelector('.delete-product').addEventListener('click', () => deleteProduct(index));
            cartItems.appendChild(cartItem);
        });
    }

    function addProduct(name, quantity) {
        cart.push({ name, quantity });
        saveCart();
        renderCart();
    }

    function modifyQuantity(index) {
        const newQuantity = prompt('Introduceți noua cantitate:', cart[index].quantity);
        if (newQuantity !== null && newQuantity > 0) {
            cart[index].quantity = newQuantity;
            saveCart();
            renderCart();
        }
    }

    function deleteProduct(index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value.trim();
        const quantity = parseInt(document.getElementById('product-quantity').value, 10);
        if (name && quantity > 0) {
            addProduct(name, quantity);
            productForm.reset();
        } else {
            alert('Numele produsului nu poate fi gol și cantitatea trebuie să fie un număr pozitiv.');
        }
    });

    renderCart();
});
