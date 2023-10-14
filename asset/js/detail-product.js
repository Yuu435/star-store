document.addEventListener('DOMContentLoaded', () => {
    /*================ product photo slideShow./start==============*/
    const mySlides = document.querySelectorAll(".product-single");

    mySlides.forEach((slide, slideIndex) => {
        const slides = document.querySelectorAll(".mySlides");
        const dots = document.querySelectorAll(".dot");
        slides[0].style.display = "block";
        dots[0].classList.add("active");
        
        slide.addEventListener("click", () => { 
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex].style.display = "block";
            dots[slideIndex].className += " active";
        });
    });


    /*================ Quantity./start ==============*/
    const quantityInput = document.querySelector('.quantity');
    const minusButton = document.querySelector('.btn-minus');
    const plusButton = document.querySelector('.btn-plus');


    const minQuantity = 1;

    minusButton.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityInput.value);


        if (currentQuantity > minQuantity) {
            currentQuantity = currentQuantity - 1;
        } else {
            currentQuantity = minQuantity;
        }
        quantityInput.value = currentQuantity;
    });

    plusButton.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityInput.value);
        currentQuantity++;
        quantityInput.value = currentQuantity;
    });

    quantityInput.addEventListener('input', () => {
        let currentQuantity = parseInt(quantityInput.value);
        if (isNaN(currentQuantity) || currentQuantity < minQuantity) {
            currentQuantity = minQuantity;
            quantityInput.value = currentQuantity;
        }
    });



    /*================  Add to cart even./start ==============*/
    const addToCartButton = document.querySelector('.add-to-cart');
    const productName = document.querySelector('.product-info h1').textContent;
    const productPrice = document.querySelector('.price').textContent;
    const productImages = Array.from(document.querySelectorAll('.product-single img')).map(img => img.src);


    addToCartButton.addEventListener('click', () => {
        // popup succes
        const popupSucces = document.querySelector('.popup-succes');
        popupSucces.style.top = '120px';
        setTimeout(()=>{
            popupSucces.style.top = '-100px';
        },3000);


        const quantityValue = parseInt(quantityInput.value, 10);

        if (isNaN(quantityValue) || quantityValue < 1) {
            return;
        }
        
        const product = {
            images: productImages,
            name: productName,
            price: productPrice,
            quantity: quantityValue,
        };

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


        const checkProductIndex = cartItems.findIndex(item => item.name === product.name);

        if (checkProductIndex !== -1) {
            cartItems[checkProductIndex].quantity += product.quantity;
        } else {
            cartItems.push(product);
        }
    

        // Lưu danh sách sản phẩm vào Local Storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });
});