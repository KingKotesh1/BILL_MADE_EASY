import axios from "axios";
 
document.getElementById("billing-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const customer = document.getElementById("customer").value;
    const phone = document.getElementById("phone").value;

    try {
        const response = await axios.post("http://localhost:3000/api/bills/create", {
            customer,
            phone,
            invoiceNumber: Math.floor(Math.random() * 1000), // Example invoice number
            items: [], // Add your items here if needed
            totalAmount: 0, // Replace with actual total amount if needed
        });

        document.getElementById("response").innerText = JSON.stringify(response.data, null, 2);
    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
    }
});
