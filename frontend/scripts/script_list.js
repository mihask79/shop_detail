function toggleMenu() {
    const menu = document.querySelector(".menu");
    const burger = document.querySelector(".burger");

    menu.classList.toggle("active");
    burger.classList.toggle("active");
}



document.addEventListener("DOMContentLoaded", function () {
    loadProducts();

    document.querySelector(".menu").addEventListener("click", toggleMenu);
});

async function loadProducts() {
    try {
        const response = await fetch("/api/products");
        const products = await response.json();

        const container = document.querySelector(".products-container");
        container.innerHTML = `<h1>Список товаров</h1>
            <div class="search-container">
                <input type="text" id="searchInput" class="search-input" placeholder="Поиск товаров..." oninput="filterProducts()">
            </div>
        `;

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.setAttribute("data-name", product.name);

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h2>${product.name}</h2>
                    <p class="product-description">Оригинал</p>
                    <p class="product-price">${product.price}₽</p>
                    <button class="add-to-cart">Добавить в корзину</button>
                </div>
            `;

            productCard.querySelector(".add-to-cart").addEventListener("click", () => addToCart(product));
            container.appendChild(productCard);
        });
    } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
    }
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: product.name, price: product.price, image: product.image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину!");
}
