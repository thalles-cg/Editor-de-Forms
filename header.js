document.querySelector(".addBtn").addEventListener("click", adicionarElemento)
document.querySelector("#elementText").addEventListener("input", verificarElemento)
document.querySelector("#titleText").addEventListener("input", mudarTitulo);
document.querySelector("#titleFontSize").addEventListener("input", mudarTamanhoLogo);
document.querySelector("#titleColor").addEventListener("input", mudarCorTitulo);
document.querySelector("#headerColor").addEventListener("input", mudarCorHeader);
document.querySelector("#elementsColor").addEventListener("input", mudarCorElementos);
document.querySelector("#elementsFontSize").addEventListener("input", mudarFonteElementos);
document.querySelector("#logoImage").addEventListener("change", adicionarImagem)
document.querySelector("#element-spacing").addEventListener("change", mudarEspacamento)

document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const dropdown = toggle.closest('.dropdown');
    dropdown.classList.toggle('open');
    toggle.classList.toggle('active');
  });
});

function verificarElemento(){
  const container = document.querySelector(".option-line.first");
  const input = document.querySelector("#elementText");
  const numChars = input.value.length;
  const errorMessage = document.querySelector(".error-message");

  if (numChars === 0 || numChars > 8) {
    input.classList.add("input-error");
    errorMessage.textContent = "O elemento deve ter entre 1 e 8 caracteres";
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
    let navbar_ul = document.querySelector(".sub-navbar ul");
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.setAttribute("href", "#")
    a.textContent = newElement.value;

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "×"; 
    
    removeBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      li.remove();
    });

    li.appendChild(a);
    li.appendChild(removeBtn)
    navbar_ul.appendChild(li);
    newElement.value = "";
  } 
}

function adicionarImagem(){
  let inputImage = this;
  let image = inputImage.files[0];

  const leitor = new FileReader();
  
  leitor.onload = function(e) {
    const imageElement = document.querySelector(".image");
    
    imageElement.style.backgroundImage = `url(${e.target.result})`;
    imageElement.style.display = "block";
    
    let tamanho = document.querySelector("#titleFontSize").value + "px"
    imageElement.style.width = tamanho;
    imageElement.style.height = tamanho;
  };  
  leitor.readAsDataURL(image);
}

function mudarTitulo() {
  let title = document.querySelector("#title");
  let titleText = document.querySelector("#titleText");
  title.textContent = titleText.value;
}
function mudarTamanhoLogo(){
  let title = document.querySelector("#title");
  let tamanho = document.querySelector("#titleFontSize").value + "px"
  title.style.fontSize = tamanho;

  const logoImage = document.querySelector(".logo .image");

  if (logoImage != 'none'){
    logoImage.style.width = tamanho;
    logoImage.style.height = tamanho;
  }

  let titleSizeValue = document.querySelector("#titleSizeValue");
  titleSizeValue.textContent = document.querySelector("#titleFontSize").value + "px"
}

function mudarCorTitulo() {
  let title = document.querySelector("#title");
  let titleColorAtual = document.querySelector("#titleColor").value;
  title.style.color = titleColorAtual;
}

function mudarCorHeader() {
  let header = document.querySelector(".sub-header");
  header.style.backgroundColor = document.querySelector("#headerColor").value;
}

function mudarCorElementos() {
  let elements = document.querySelectorAll(".sub-navbar ul li a");
  for (let i = 0 ; i < elements.length ; i++){
    elements[i].style.color = document.querySelector("#elementsColor").value;
  }
}

function mudarFonteElementos() {
  let elements = document.querySelectorAll(".sub-navbar ul li a");
  for (let i = 0 ; i < elements.length ; i++){
    elements[i].style.fontSize = document.querySelector("#elementsFontSize").value + "px";
  }
  let elementsSizeValue = document.querySelector("#elementsSizeValue");
  elementsSizeValue.textContent = document.querySelector("#elementsFontSize").value + "px"; 
}

function mudarEspacamento(){
  const subNavbar = document.querySelector(".sub-navbar ul");
  let spacing = document.querySelector("#element-spacing").value;

  subNavbar.style.display = "flex"; 
  subNavbar.style.justifyContent = spacing;
}