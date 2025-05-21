document.querySelector(".addBtn").addEventListener("click", adicionarCard);
document.querySelector("#cardWidth").addEventListener("input", mudarLaguraCards);
document.querySelector("#cardHeight").addEventListener("input", mudarAlturaCards);
document.querySelector("#showImage").addEventListener("change", mostrarEsconderImagem)
document.querySelector("#addImage").addEventListener("change", adicionarImagem)

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

    let texts = document.createElement("div");
    texts.classList.add("texts");
    card.appendChild(texts);    
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