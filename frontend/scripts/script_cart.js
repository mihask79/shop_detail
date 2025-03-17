function toggleMenu() {
    const menu = document.querySelector(".menu");
    const burger = document.querySelector(".burger");

    menu.classList.toggle("active");
    burger.classList.toggle("active");
}

function toggleMenu() {
    const menu = document.querySelector(".menu");
    const burger = document.querySelector(".burger");

    menu.classList.toggle("active");
    burger.classList.toggle("active");
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.querySelector('.cart-items');
    let totalPriceElement = document.querySelector('.total-price');

    cartContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((item, index) => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h2>${item.name}</h2>
                <p>Цена: ${item.price}</p>
                <p>Количество: ${item.quantity}</p>
            </div>
            <div class="cart-item-price">${parseInt(item.price) * item.quantity}₽</div>
            <button class="remove-item" data-index="${index}">Удалить</button>
        `;
        cartContainer.appendChild(cartItem);
        totalPrice += parseInt(item.price) * item.quantity;
    });

    totalPriceElement.innerText = `Итого: ${totalPrice}₽`;

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", removeFromCart);
    });
}

function removeFromCart(event) {
    let index = event.target.getAttribute("data-index");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

document.addEventListener("DOMContentLoaded", loadCart);

