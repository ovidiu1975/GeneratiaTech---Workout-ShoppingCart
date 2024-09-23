document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const cartItems = document.getElementById('cart-items');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const renderCart = () => {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Cantitate: ${item.quantity}`;
            const modifyButton = document.createElement('button');
            modifyButton.textContent = 'Modifică';
            modifyButton.classList.add('modify');
            modifyButton.addEventListener('click', () => modifyItem(index));
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Șterge';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => deleteItem(index));
            li.appendChild(modifyButton);
            li.appendChild(deleteButton);
            cartItems.appendChild(li);
        });
    };

    const addItem = (name, quantity) => {
        cart.push({ name, quantity });
        saveCart();
        renderCart();
    };

    const modifyItem = (index) => {
        const newQuantity = prompt('Introduceți noua cantitate:', cart[index].quantity);
        if (newQuantity !== null && newQuantity > 0) {
            cart[index].quantity = parseInt(newQuantity, 10);
            saveCart();
            renderCart();
        }
    };

    const deleteItem = (index) => {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = productNameInput.value.trim();
        const quantity = parseInt(productQuantityInput.value, 10);
        if (name && quantity > 0) {
            addItem(name, quantity);
            form.reset();
        }
    });

    renderCart();
});
