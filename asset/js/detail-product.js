document.addEventListener('DOMContentLoaded', () => {
     /*================ product photo./start==============*/
    const mySlides = document.querySelectorAll(".product-single")

    mySlides.forEach((slide, slideIndex) => {

        slide.addEventListener("click", () => {

            let slides = document.querySelectorAll(".mySlides");
            let dots = document.querySelectorAll(".dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex].style.display = "block";
            dots[slideIndex].className += " active";
        })
    })


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
    // Kiểm tra khi nhập thủ công công
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

        const quantityValue = parseInt(quantityInput.value, 10);

        if (isNaN(quantityValue) || quantityValue < 1) {
            alert('Vui lòng nhập một số lượng hợp lệ.');
            return; // Không thêm sản phẩm nếu số lượng không hợp lệ
        }
        const product = {
            name: productName,
            price: productPrice,
            quantity: quantityValue,
            images: productImages, // Thêm danh sách ảnh vào sản phẩm
        };

        // Lấy danh sách sản phẩm từ Local Storage (nếu có)
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingProductIndex = cartItems.findIndex(item => item.name === product.name);

        if (existingProductIndex !== -1) {
            // Tăng số lượng
            cartItems[existingProductIndex].quantity += product.quantity;
        } else {
            cartItems.push(product);
        }

        // Lưu danh sách sản phẩm vào Local Storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        alert('Sản phẩm đã được thêm vào giỏ hàng.');
    });
});