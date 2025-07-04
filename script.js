function toggleMenu() {
    const menu = document.querySelector('.navbar ul');
    menu.classList.toggle('active');
}

async function submitForm() {
    let ipk = document.getElementById("ipk").value.replace(',', '.');
    ipk = parseFloat(ipk);

    const data = {
        "Jarak Tempat Tinggal kekampus (Km)": document.getElementById("jarak").value,
        "Ikut Organisasi": document.getElementById("organisasi").value,
        "Ikut UKM": document.getElementById("ukm").value,
        "IPK": ipk,
        "Penghasilan": document.getElementById("penghasilan").value,
        "Tanggungan": parseInt(document.getElementById("tanggungan").value)
    };

    try {
        const response = await fetch('http://P4r4Dise.pythonanywhere.com/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Terjadi kesalahan pada server");
        }

        const result = await response.json();
        document.getElementById("result").innerText = "Prediksi: " + result.Prediction;

    } catch (error) {
        document.getElementById("result").innerText = "Error: " + error.message;
    }
}
