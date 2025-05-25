document.querySelector(".addBtn").addEventListener("click", adicionarElemento)
document.querySelector("#elementText").addEventListener("input", verificarElemento)
document.querySelector("#imageSize").addEventListener("input", mudarTamanhoLogo);
document.querySelector("#menuColor").addEventListener("input", mudarCorMenu);
document.querySelector("#elementsColor").addEventListener("input", mudarCorElementos);
document.querySelector("#elementsFontSize").addEventListener("input", mudarFonteElementos);
document.querySelector("#logoImage").addEventListener("change", adicionarImagem)
document.querySelector("#element-spacing").addEventListener("change", mudarEspacamento)
document.querySelector("#choose-font").addEventListener("change", mudarFonte)
document.querySelector("#bgElementsColor").addEventListener("input", mudarBgElementos);

function verificarElemento(){
  const container = document.querySelector(".option-line.first");
  const input = document.querySelector("#elementText");
  const numChars = input.value.length;
  const errorMessage = document.querySelector(".error-message");

  if (numChars === 0 || numChars > 18) {
    input.classList.add("input-error");
    errorMessage.textContent = "O elemento deve ter entre 1 e 18 caracteres";
    errorMessage.style.display = "block";
    container.style.paddingTop = "3em";
    return false;

  } else {
    input.classList.remove("input-error");
    errorMessage.style.display = "none";
    container.style.paddingTop = "0";
    return true;
  }
}

function adicionarElemento(){
  let newElement = document.querySelector("#elementText");
    
  if (verificarElemento()) {
    let menu_list = document.querySelector(".menu-list");
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.setAttribute("href", "#")
    a.textContent = newElement.value;

    li.style.backgroundColor = document.querySelector("#bgElementsColor").value;

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "×"; 
    
    removeBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      li.remove();
    });

    li.appendChild(a);
    li.appendChild(removeBtn)
    menu_list.appendChild(li);
    newElement.value = "";
  } 
}

  function adicionarImagem(){
    let inputImage = this;
    let image = inputImage.files[0];

    const leitor = new FileReader();
    
    leitor.onload = function(e) {
      const imageElement = document.querySelector(".logo .image");
      
      imageElement.style.backgroundImage = `url(${e.target.result})`;
      imageElement.style.display = "block";
      
      let tamanho = document.querySelector("#imageSize").value + "px"
      imageElement.style.width = tamanho;
      imageElement.style.height = tamanho;
    };  
    leitor.readAsDataURL(image);
  }


function mudarTamanhoLogo(){
  let tamanho = document.querySelector("#imageSize").value + "px"
  const logoImage = document.querySelector(".logo .image");

  if (logoImage != 'none'){
    logoImage.style.width = tamanho;
    logoImage.style.height = tamanho;
  }

  let imageSizeValue = document.querySelector("#imageSizeValue");
  imageSizeValue.textContent = document.querySelector("#imageSize").value + "px"
}

function mudarCorMenu() {
  let menu = document.querySelector(".menu");
  menu.style.backgroundColor = document.querySelector("#menuColor").value;
}

function mudarCorElementos() {
  let elements = document.querySelectorAll(".menu-list li a");
  for (let i = 0 ; i < elements.length ; i++){
    elements[i].style.color = document.querySelector("#elementsColor").value;
  }
}

function mudarFonteElementos() {
  let elements = document.querySelectorAll(".menu-list li a");
  for (let i = 0 ; i < elements.length ; i++){
    elements[i].style.fontSize = document.querySelector("#elementsFontSize").value + "px";
  }
  let elementsSizeValue = document.querySelector("#elementsSizeValue");
  elementsSizeValue.textContent = document.querySelector("#elementsFontSize").value + "px"; 
}

function mudarEspacamento(){
  const subNavbar = document.querySelector(".menu-list");
  let spacing = document.querySelector("#element-spacing").value;

  subNavbar.style.display = "flex"; 
  subNavbar.style.justifyContent = spacing;
}

function mudarFonte() {
  const menu = document.querySelector(".menu");

  menu.style.fontFamily = document.querySelector("#choose-font").value;
}

function mudarBgElementos(){
  subNavbar_li = document.querySelectorAll(".menu-nav ul li");
  subNavbar_li.forEach(element => {
    element.style.backgroundColor = document.querySelector("#bgElementsColor").value;
  });
}
