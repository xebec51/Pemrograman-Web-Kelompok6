document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Menampilkan item keranjang di halaman checkout
    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${item.name} - Rp${(item.price * item.quantity).toLocaleString('id-ID')} (${item.quantity} pcs)`;
        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity;
    });
    
    totalPriceElement.textContent = totalPrice.toLocaleString('id-ID');

    // Menghandle form checkout
    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const fullName = document.getElementById('full-name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        const orderData = {
            fullName,
            address,
            phone,
            cart,
            totalPrice
        };

        console.log('Data Pesanan:', orderData);

        alert('Terima kasih, ' + fullName + '! Pesanan Anda telah diterima.');

        localStorage.removeItem('cart'); // Hapus keranjang setelah pembelian
        window.location.href = 'index.html'; // Kembali ke beranda setelah checkout
    });
});
