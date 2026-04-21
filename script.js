const sheetId = "1PxAoDKr2gaB2O21RnlfLRlxK2W2n-Bge8exGvfMPFzo";
const apiKey = "AIzaSyCqjXbbFMejFBIBuouLIdZ0rgnLNZKqP64";
const range = "Página1!A3:E";

async function carregarCatalogo() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const catalogo = document.getElementById("catalogo");

    data.values.forEach(item => {
        const [nome, descrição, img1, img2, img3] = item;

        const card = document.createElement("div");
        card.className = "card";

        const inner = document.createElement("div");
        inner.className = "card-inner";

        // frente
        const front = document.createElement("div");
        front.className = "card-front";

        const imagens = [img1, img2, img3].filter(url => url && url.trim() !== "");
        const img = document.createElement("img");
        img.src = imagens[0];
        img.alt = nome;

        const title = document.createElement("h2");
        title.textContent = nome;

        const info = document.createElement("p");
        info.textContent = "Clique para mais informações"

        front.appendChild(img);
        front.appendChild(title);
        front.appendChild(info)

        // verso
        const back = document.createElement("div");
        back.className = "card-back";

        const desc = document.createElement("p");
        desc.textContent = descrição;

        const btn = document.createElement("button");
        btn.textContent = "Faça seu orçamento sem compromisso";

        const numero = "5585988583274";
        const mensagem = `Olá, gostaria de um orçamento do produto "${nome}".\n\n Segue link da imagem: ${img1}`;
        const linkWhats = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

        btn.addEventListener("click", () => {
            window.open(linkWhats, "_blank");
        });

        back.appendChild(desc);
        back.appendChild(btn);

        // card

        inner.appendChild(front);
        inner.appendChild(back);

        card.appendChild(inner);
        
        catalogo.appendChild(card);

        if (imagens.length > 1) {
            let index = 0;
            setInterval(() => {
                index = (index + 1) % imagens.length;
                img.src = imagens[index];
            }, 2500);
        }

        card.addEventListener("click", () => {
            document.querySelectorAll(".card.flipped").forEach(c => {
                if (c !== card) c.classList.remove("flipped");
            });
            card.classList.toggle("flipped");
        });
    });

}

carregarCatalogo();
