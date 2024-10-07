// script.js

document.addEventListener('DOMContentLoaded', function () {
    let cart = [];
    let totalPrice = 0;

    // Menambahkan produk ke keranjang dengan memeriksa apakah sudah ada produk yang sama
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            
            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += 1; // Jika produk sudah ada, tambahkan kuantitasnya
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }
            updateCart();
        });
    });

    // Mengupdate keranjang
    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        
        cartItems.innerHTML = ''; // Kosongkan keranjang sebelum diisi ulang
        totalPrice = 0;
        
        cart.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${item.name} - Rp${(item.price * item.quantity).toLocaleString('id-ID')} (${item.quantity} pcs)`;
            cartItems.appendChild(li);
            totalPrice += item.price * item.quantity;
        });
        
        totalPriceElement.textContent = totalPrice.toLocaleString('id-ID');
    }

    // Form Kontak (untuk halaman kontak)
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah refresh halaman
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const contactData = { name, email, message };
        
        console.log('Data Kontak:', contactData);
        
        alert('Pesan terkirim! Terima kasih, ' + name);
    });

    // Pindah ke halaman checkout ketika checkout diklik
    document.getElementById('checkout-btn').addEventListener('click', function() {
        localStorage.setItem('cart', JSON.stringify(cart)); // Simpan data keranjang ke localStorage
        window.location.href = 'checkout.html'; // Redirect ke halaman checkout
    });

    // Menangani klik pada tautan navigation
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Mencegah aksi default dari tautan
            const targetId = this.getAttribute('href'); // Mendapatkan ID target
            const targetElement = document.querySelector(targetId); // Menemukan elemen target
            
            // Melakukan scroll ke elemen target
            targetElement.scrollIntoView({
                behavior: 'smooth', // Efek scroll halus
                block: 'start' // Mengatur posisi elemen di bagian atas viewport
            });
        });
    });
});
