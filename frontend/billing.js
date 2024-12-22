import axios from "axios";

document.getElementById('checkout').addEventListener('click', async () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const customer = document.getElementById('customer').value;
    const phone = document.getElementById('phone').value;

    // Validate customer and phone fields
    if (!customer || !phone) {
        alert('Please fill out customer details before checkout!');
        return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    // Send cart data to the backend
    try {
        const response = await axios.post('http://localhost:3000/api/bills/create', {
            customer,
            phone,
            invoiceNumber: Math.floor(Math.random() * 1000), // Example invoice number
            items: cart,
            totalAmount,
        });

        alert('Checkout successful!');
        console.log('Response from backend:', response.data);

        // Clear cart after successful checkout
        cart = [];
        updateCart();
    } catch (error) {
        console.error('Error during checkout:', error.response ? error.response.data : error.message);
        alert('Checkout failed. Please try again.');
    }
});
