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
        const paymentMethod = document.getElementById('payment-method').value; // Ambil nilai metode pembayaran

        if (!paymentMethod) {
            alert('Silakan pilih metode pembayaran.');
            return;
        }

        // Simpan pesanan ke localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const newOrder = {
            name: fullName,
            address,
            phone,
            totalPrice,
            paymentMethod,
            cart
        };
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Arahkan ke WhatsApp (atau simpan pesanan)
        const message = `Pesanan Baru dari *${fullName}*:\n` +
                        `Alamat: *${address}*\n` +
                        `Nomor Telepon: *${phone}*\n` +
                        `Metode Pembayaran: *${paymentMethod}*\n` +
                        `Total Harga: *Rp${totalPrice.toLocaleString('id-ID')}*\n` +
                        `Detail Pesanan:\n` +
                        cart.map(item => `- ${item.name} - Rp${(item.price * item.quantity).toLocaleString('id-ID')} (${item.quantity} pcs)`).join('\n');

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/6282198232865?text=${encodedMessage}`; // Pastikan nomor telepon benar

        window.open(whatsappUrl, '_blank');
        localStorage.removeItem('cart'); // Hapus keranjang setelah pembelian
        window.location.href = 'index.html'; // Kembali ke beranda setelah checkout
    });
});
