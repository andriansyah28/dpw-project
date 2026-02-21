let nama = prompt("Tuliskan nama kamu:");

if(nama !== null && nama.trim() !== ""){
    document.getElementById("hasil").innerText =
        "Nama saya " + nama + ", saya akan mengamalkan Pancasila dan UUD 1945 sebagai Dasar Negara.";
}

else{
    document.getElementById("hasil").innerText = "Input nama dibatalkan.";
}
