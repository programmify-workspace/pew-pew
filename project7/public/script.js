document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.product-item');
    forms.forEach(form => {
        const quantityInput = form.querySelector('input[name="productQuantity"]');
        
        if (quantityInput) {
            quantityInput.addEventListener('change', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
        }
    });
});


// var productTitle = document.getElementById('productTitle').innerText;
// var productDescription = document.getElementById('productDescription').innerText;
// var productPrice = document.getElementById('productPrice').innerText;
// var productImage = document.getElementById('productImage').src;

// // Set the values of the hidden input fields
// document.getElementById('hiddenProductTitle').value = productTitle;
// document.getElementById('hiddenProductDescription').value = productDescription;
// document.getElementById('hiddenProductImage').value = productImage;