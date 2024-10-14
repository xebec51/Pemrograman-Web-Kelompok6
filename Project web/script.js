document.addEventListener('DOMContentLoaded', function () {
    let cart = [];
    let totalPrice = 0;

    const foodItems = [
        { name: 'Beras 1kg', price: 13000, image: 'Asset/beras.jpeg' },
        { name: 'Beras Premium 1kg', price: 18000, image: 'Asset/beras premium.jpg' },
        { name: 'Gula Pasir 1kg', price: 14000, image: 'Asset/gula.jpg' },
        { name: 'Minyak Goreng 1 liter', price: 23000, image: 'Asset/minyak.jpg' },
        { name: 'Tepung Terigu 1kg', price: 10000, image: 'Asset/terigu.jpg' },
        { name: 'Kopi Robusta 100% Asli', price: 20000, image: 'Asset/kopi.jpg' },
        { name: 'Susu Sapi', price: 18000, image: 'Asset/susu.jpg' },
        { name: 'Telur 1 lusin', price: 24000, image: 'Asset/telur biasa 1lusin.jpg' },
        { name: 'Telur Premium 1 lusin', price: 35000, image: 'Asset/telur premium.jpg' },
        { name: 'Air Galon Biasa', price: 21000, image: 'Asset/galon biasa.jpg' },
        { name: 'Air Galon Aqua', price: 72000, image: 'Asset/galon aqua.png' },
        { name: 'Refill Galon Biasa', price: 5000, image: 'Asset/galon biasa.jpg' },
        { name: 'Refill Galon Aqua', price: 54000, image: 'Asset/galon aqua.png' },
        { name: 'Air Galon Club', price: 51000, image: 'Asset/galon club.jpg' },
        { name: 'Refill Galon Club', price: 32000, image: 'Asset/galon club.jpg' },
        { name: 'Air Dus JS', price: 16000, image: 'Asset/air dus js.jpg' },
        { name: 'Air Dus Aqua', price: 38000, image: 'Asset/air dus aqua.jpg' },
        { name: 'Air Dus Club', price: 22000, image: 'Asset/air dus club.jpg' },
        { name: 'Garam 500gr', price: 5000, image: 'Asset/garam 500gr.jpg' },
        { name: 'Bawang Putih 1kg', price: 22000, image: 'Asset/bawang putih.jpg' },
        { name: 'Bawang Merah 1kg', price: 21000, image: 'Asset/bawang merah.jpg' },
        { name: 'Gula Merah 1kg', price: 25000, image: 'Asset/gula merah.jpg' },
        { name: 'Indomie Kaldu', price: 3000, image: 'Asset/indomie kaldu.jpg' },
        { name: 'Indomie Soto', price: 3000, image: 'Asset/indomie soto.jpg' },
        { name: 'Indomie Goreng', price: 3000, image: 'Asset/indomie goreng.jpg' },
        { name: 'Indomie Goreng Aceh', price: 3000, image: 'Asset/indomie goreng aceh.jpg' },
        { name: 'Santan 200ml', price: 11000, image: 'Asset/santan.jpg' },
        { name: 'Kecap Manis 135ml', price: 10000, image: 'Asset/kecap.jpg' },
        { name: 'Saus Sambal 135ml', price: 10000, image: 'Asset/saus sambal.jpg' },
        { name: 'Ikan Kaleng 425gr', price: 19000, image: 'Asset/ikan kaleng.jpg' }
    ];

    const productList = document.getElementById('product-list');

    // Load products and their stock
    foodItems.forEach((item) => {
        let stock = localStorage.getItem(item.name);
        if (!stock) {
            stock = 10; // Default stock
            localStorage.setItem(item.name, stock);
        }

        // Create product card
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-2', 'col-sm-4', 'col-6');

        let buttonClass = 'btn btn-primary add-to-cart';
        let buttonText = 'Tambah ke Keranjang';
        let buttonDisabled = '';
        if (parseInt(stock) === 0) {
            buttonClass = 'btn btn-secondary disabled';
            buttonText = 'Stok Habis';
            buttonDisabled = 'disabled';
        }

        productCard.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text"><strong>Harga: Rp${item.price.toLocaleString('id-ID')}</strong></p>
                    <p class="stock-text">Stok: ${stock}</p>
                    <button class="${buttonClass}" data-name="${item.name}" data-price="${item.price}" ${buttonDisabled}>${buttonText}</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });

    // Fungsi menambahkan produk ke keranjang
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const button = event.target;
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            // Kurangi stok produk
            let stock = localStorage.getItem(productName);
            stock = parseInt(stock);
            if (stock > 0) {
                stock -= 1;
                localStorage.setItem(productName, stock);
            }

            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += 1; // Jika produk sudah ada, tambahkan kuantitasnya
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            updateCart();
            updateProductList(); // Update UI untuk stok
        }
    });

    // Fungsi mengurangi produk dari keranjang
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const button = event.target;
            const productName = button.getAttribute('data-name');

            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity -= 1; // Kurangi kuantitas produk
                if (existingProduct.quantity === 0) {
                    cart = cart.filter(item => item.name !== productName); // Hapus produk jika kuantitas 0
                }

                // Tambahkan kembali stok
                let stock = localStorage.getItem(productName);
                stock = parseInt(stock) + 1;
                localStorage.setItem(productName, stock);
            }

            updateCart();
            updateProductList(); // Update UI untuk stok
        }
    });

    function updateProductList() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const productName = card.querySelector('.card-title').textContent;
            let stock = localStorage.getItem(productName);

            // Update stok di tampilan
            const stockText = card.querySelector('.stock-text');
            if (stockText) {
                stockText.textContent = `Stok: ${stock}`;
            }

            // Nonaktifkan tombol jika stok habis
            const button = card.querySelector('.add-to-cart');
            if (button) {
                if (parseInt(stock) === 0) {
                    button.classList.remove('btn-primary');
                    button.classList.add('btn-secondary', 'disabled');
                    button.textContent = 'Stok Habis';
                    button.setAttribute('disabled', true);
                } else {
                    button.classList.add('btn-primary');
                    button.classList.remove('btn-secondary', 'disabled');
                    button.textContent = 'Tambah ke Keranjang';
                    button.removeAttribute('disabled');
                }
            }
        });
    }

    // Fungsi mengupdate tampilan keranjang
    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');

        cartItems.innerHTML = ''; // Kosongkan keranjang sebelum diisi ulang
        totalPrice = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `${item.name} - Rp${(item.price * item.quantity).toLocaleString('id-ID')} (${item.quantity} pcs) 
                <button class="btn btn-danger btn-sm float-right remove-from-cart" data-name="${item.name}">Kurangi</button>`;
            cartItems.appendChild(li);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toLocaleString('id-ID');
    }

    // Form Kontak (untuk halaman kontak)
    document.getElementById('contact-form')?.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah refresh halaman

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const contactData = { name, email, message };

        console.log('Data Kontak:', contactData);

        alert('Pesan terkirim! Terima kasih, ' + name);
    });

    // Pindah ke halaman checkout ketika checkout diklik
    document.getElementById('checkout-btn')?.addEventListener('click', function() {
        localStorage.setItem('cart', JSON.stringify(cart)); // Simpan data keranjang ke localStorage
        window.location.href = 'checkout.html'; // Redirect ke halaman checkout
    });

    // Menangani klik pada tautan navigation
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.getAttribute('href') === 'login.html') {
                return;
            }

            e.preventDefault(); // Mencegah aksi default dari tautan lainnya
            const targetId = this.getAttribute('href'); 
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.error('Elemen dengan ID ' + targetId + ' tidak ditemukan.');
            }
        });
    });

    updateProductList(); // Panggil untuk memperbarui UI saat halaman dimuat pertama kali
});
