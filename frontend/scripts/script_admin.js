document.querySelector('.add-product form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.querySelector('#productName').value;
    const description = document.querySelector('#productDescription').value;
    const price = document.querySelector('#productPrice').value;
    const image = document.querySelector('#productImage').value;

    const productData = {
        name,
        description,
        price,
        image,
    };

    console.log('Отправка данных на сервер:', productData);

    try {
        const response = await fetch('/api/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при добавлении товара');
    }
});
