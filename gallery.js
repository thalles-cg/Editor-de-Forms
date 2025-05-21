document.querySelector(".addBtn").addEventListener("click", adicionarCard);
document.querySelector("#cardWidth").addEventListener("input", mudarLaguraCards);
document.querySelector("#cardHeight").addEventListener("input", mudarAlturaCards);



function adicionarCard(){
    const form_content = document.querySelector(".card-content");

    let card = document.createElement("div");
    card.classList.add("card");
    card.style.width = document.querySelector("#widthValue").textContent;
    card.style.height = document.querySelector("#heightValue").textContent;
    card.style.backgroundColor = "#5865f2";
    
    const editBtn = document.createElement('button');
    editBtn.className = 'control-btn';
    editBtn.innerHTML = '<span class="material-symbols-outlined">edit</span>';
    editBtn.addEventListener('click', () => {
        abrirPropriedades(card);
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'control-btn';
    removeBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
    removeBtn.addEventListener('click', () => {
        if (elementoSelecionado === card){
            const menu = document.querySelector(".specific-properties");
            menu.classList.remove("active");
            elementoSelecionado = null;
        }
        card.remove()
    });
    
    removeBtn.style.backgroundColor = "inherit";
    editBtn.style.backgroundColor = "inherit";

    const controls = document.createElement('div');
    controls.className = 'card-controls';
    controls.append(editBtn, removeBtn);


    card.appendChild(controls)
    form_content.appendChild(card);
}
let elementoSelecionado = null;

function abrirPropriedades(card){
    menu = document.querySelector(".specific-properties");
    elementoSelecionado = card;
    menu.classList.add("active")

}

function mudarLaguraCards(e){
    widthValue = e.target.value + "px";

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.style.width = widthValue;
    });

    document.querySelector("#widthValue").textContent = widthValue;
}

function mudarAlturaCards(e){
    heightValue = e.target.value + "px";

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.style.height = heightValue;
    });

    document.querySelector("#heightValue").textContent = heightValue;
}