document.addEventListener('DOMContentLoaded', () => {

    // Lấy danh sách sản phẩm từ Local Storage
    const cartItemsContainer = document.querySelector('.cart-item');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


    cartItems.forEach((item, index) => {
        // console.log(cartItems);
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item-element');

        cartItemElement.innerHTML = `
            <div class="cart-img">
                <img src="${item.images[0]}" alt="${item.name}">
            </div>
            <div class="cart-title">
                <a href="#">${item.name}</a>
                <a class="remove-item" href="#">Remove</a>
            </div>
            <div class="cart-qty">
                <button class="btn-minus">-</button>
                <input class="quantity" type="text" value="${item.quantity}">
                <button class="btn-plus">+</button>
            </div>
            <p>$<span class="cart-total"> ${item.price * item.quantity}</span></p>
        `;
        cartItemsContainer.appendChild(cartItemElement);


        /*================ Quantity./start ==============*/
        const quantityInput = cartItemElement.querySelector('.quantity');
        const minusButton = cartItemElement.querySelector('.btn-minus');
        const plusButton = cartItemElement.querySelector('.btn-plus');
        const removeButton = cartItemElement.querySelector('.remove-item');
        const minQuantity = 1;

        minusButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityInput.value);

            if (currentQuantity > minQuantity) {
                currentQuantity = currentQuantity - 1;
            } else {
                currentQuantity = minQuantity;
            }
            quantityInput.value = currentQuantity;

            updateCartItemTotal(cartItemElement, item, currentQuantity);
            updateLocalStorage();
        });

        plusButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityInput.value);
            currentQuantity++;
            quantityInput.value = currentQuantity;
            updateCartItemTotal(cartItemElement, item, currentQuantity);
            updateLocalStorage();
        });

        quantityInput.addEventListener('input', () => {
            let currentQuantity = parseInt(quantityInput.value);
            if (isNaN(currentQuantity) || currentQuantity < minQuantity) {
                currentQuantity = minQuantity;
                quantityInput.value = currentQuantity;
            }
            updateCartItemTotal(cartItemElement, item, currentQuantity);
            updateLocalStorage();
        });

        removeButton.addEventListener('click', () => {
            cartItems.splice(index, 1);
            updateLocalStorage();
            // xóa phần tử dom dư thừa
            cartItemElement.remove();
        });
    });


    const updateCartItemTotal = (cartItemElement, item, currentQuantity) => {
        const totalElement = cartItemElement.querySelector('.cart-total');
        const itemTotal = item.price * currentQuantity;
        totalElement.textContent = itemTotal;
        item.quantity = currentQuantity
        updateLocalStorage();
    };

    const updateLocalStorage = () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
});





