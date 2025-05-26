document.querySelector(".addBtn").addEventListener("click", adicionarCard);
document.querySelector("#cardWidth").addEventListener("input", mudarLaguraCards);
document.querySelector("#cardHeight").addEventListener("input", mudarAlturaCards);
document.querySelector("#showImage").addEventListener("change", mostrarEsconderImagem)
document.querySelector("#addImage").addEventListener("change", adicionarImagem);
document.querySelector("#addTitle").addEventListener("input", adicionarTitulo);
document.querySelector("#addText").addEventListener("input", adicionarDescricao);
document.querySelector("#bgColor").addEventListener("input", mudarCorBg)
document.querySelector("#cardTitleColor").addEventListener("input", mudarCorTituloCard)
document.querySelector("#cardDescColor").addEventListener("input", mudarCorDescCard)
document.querySelector("#bgCardColor").addEventListener("input", mudarCorBgCard)
document.querySelector("#choose-font-title").addEventListener("change", mudarFonteTitulo)
document.querySelector("#choose-font-desc").addEventListener("change", mudarFonteDescricao)
document.querySelector("#element-spacing").addEventListener("change", mudarEspacamento)
document.querySelector("#cardBorder").addEventListener("input", mudarBordaCard)
document.querySelector("#cardBorderColor").addEventListener("input", mudarCorBordaCard)



function adicionarCard(){
    const form_content = document.querySelector(".card-content");

    let card = document.createElement("div");
    card.classList.add("card");
    card.style.width = document.querySelector("#widthValue").textContent;
    card.style.height = document.querySelector("#heightValue").textContent;
    card.style.backgroundColor = document.querySelector("#bgCardColor").value;

    let border = document.querySelector("#cardBorder").value + "px" + " solid";
    card.style.border = border;
    card.style.borderColor = document.querySelector("#cardBorderColor").value;

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
            const menus = document.querySelectorAll(".specific-properties");

            menus.forEach(menu => {
                menu.classList.remove("active");
            });
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

    let img = document.createElement("div");
    img.classList.add("card-picture");
    card.appendChild(img);

    let card_texts = document.createElement("div");
    card_texts.classList.add("card-texts");

    let card_title = document.createElement("div");
    card_title.classList.add("card-title");

    let pTitle = document.createElement("p");
    pTitle.textContent = "Título";
    pTitle.style.color = document.querySelector("#cardTitleColor").value;
    pTitle.style.fontFamily = document.querySelector("#choose-font-title").value;

    card_title.appendChild(pTitle);

    card_texts.appendChild(card_title);

    let desc = document.createElement("div");
    desc.classList.add("card-desc");

    let pDesc = document.createElement("p");
    pDesc.textContent = "Descrição";
    pDesc.style.color = document.querySelector("#cardDescColor").value;
    pDesc.style.fontFamily = document.querySelector("#choose-font-desc").value;


    desc.appendChild(pDesc);

    card_texts.appendChild(desc);
    
    card.appendChild(card_texts);    
}
let elementoSelecionado = null;

function abrirPropriedades(card){
    let menus = document.querySelectorAll(".specific-properties");
    
    menus.forEach(menu => {
        menu.classList.add("active")
        
    });
    elementoSelecionado = card;

    atualizarPropriedades();
}

function atualizarPropriedades(){

    let image = elementoSelecionado.querySelector(".card-picture");
    if (image.style.display == "none"){
        document.querySelector("#showImage").checked = false;
    } else {
        document.querySelector("#showImage").checked = true;
    }

    if (window.getComputedStyle(image).backgroundImage == 'none'){
        document.querySelector("#addImage").value = null;
    } 
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

function mostrarEsconderImagem(){
    let imagem = elementoSelecionado.querySelector(".card-picture");

    if (imagem.style.display == "none"){
        imagem.style.display = "block"
    } else {
        imagem.style.display = "none";
    }
}

function adicionarImagem(){
  let inputImage = this;
  let image = inputImage.files[0];

  const leitor = new FileReader();
  
  leitor.onload = function(e) {
    const imageElement = elementoSelecionado.querySelector(".card-picture");
    imageElement.style.backgroundImage = `url(${e.target.result})`;
  };  
  leitor.readAsDataURL(image);
}

function adicionarTitulo(){
    let card_title = elementoSelecionado.querySelector(".card-title p");
    card_title.textContent = document.querySelector("#addTitle").value;
}

function adicionarDescricao(){
    let card_desc = elementoSelecionado.querySelector(".card-desc p");
    card_desc.textContent = document.querySelector("#addText").value;
}

function mudarCorBg() {
    let editBg = document.querySelector(".form-box");
    editBg.style.backgroundColor = document.querySelector("#bgColor").value;
}

function mudarCorTituloCard() {
    let cards_title = document.querySelectorAll(".card-title p");

    cards_title.forEach(card_title => {
        card_title.style.color = document.querySelector("#cardTitleColor").value;
    });
}

function mudarCorDescCard() {
    let cards_desc = document.querySelectorAll(".card-desc p");

    cards_desc.forEach(card_desc => {
        card_desc.style.color = document.querySelector("#cardDescColor").value;
    });    
}

function mudarCorBgCard() {
    let bgCards = document.querySelectorAll(".card");

    bgCards.forEach(bgCard => {
        bgCard.style.backgroundColor = document.querySelector("#bgCardColor").value;
    });
}

function mudarFonteTitulo(){
    let cardsTitle = document.querySelectorAll(".card-title p");

    cardsTitle.forEach(cardTitle => {
        cardTitle.style.fontFamily = document.querySelector("#choose-font-title").value;
    });
}

function mudarFonteDescricao(){
    let cardsDesc = document.querySelectorAll(".card-desc p");

    cardsDesc.forEach(cardDesc => {
        cardDesc.style.fontFamily = document.querySelector("#choose-font-desc").value;
    });
}

function mudarEspacamento() {
    let container = document.querySelector(".card-content");
    container.style.display = "flex";
    container.style.justifyContent = document.querySelector("#element-spacing").value;
}

function mudarBordaCard(e) {
    borderValue = e.target.value + "px";

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.style.border = "solid " + borderValue + " black";
    });

    document.querySelector("#borderValue").textContent = borderValue;
}

function mudarCorBordaCard() {
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.style.borderColor = document.querySelector("#cardBorderColor").value;
    });
}
