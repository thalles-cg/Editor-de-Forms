let i = 0;

document.querySelector(".addBtn").addEventListener("click", adicionarForm);

function adicionarForm() {
  let novaDiv = document.createElement("div");
  novaDiv.classList.add("input-group");

  let editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");

  let editIcon = document.createElement("span");
  editIcon.classList.add("material-symbols-outlined", "edit-icon");
  editIcon.textContent = "edit";
  editBtn.appendChild(editIcon);

  editBtn.addEventListener("click", function () {
    abrirPropriedades(novaDiv);
  });

  let removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "x";

  removeBtn.addEventListener("click", function () {
    if (elementoSelecionado === novaDiv) {
      const menu = document.querySelector(".specific-properties");
      menu.classList.remove("active");
      elementoSelecionado = null;
    }
    novaDiv.remove();
  });

  let groupButtons = document.createElement("div");
  groupButtons.classList.add("group-buttons");
  groupButtons.appendChild(editBtn);
  groupButtons.appendChild(removeBtn);

  if (i == 0) {
    let boxTitle = document.createElement("h2");
    boxTitle.textContent = "Título principal";
    let box = document.querySelector(".form-box-title");

    box.appendChild(boxTitle);
  }

  let novoLabel = document.createElement("label");
  novoLabel.setAttribute("for", i);
  novoLabel.textContent = "Título " + i;

  let novoInput = document.createElement("input");
  novoInput.setAttribute("id", i++);

  let widthAtual = document.getElementById("formWidth").value + "px";
  novaDiv.style.width = widthAtual;

  let heightAtual = document.getElementById("formHeight").value + "px";
  novoInput.style.height = heightAtual;

  let corInputAtual = document.getElementById("inputColor").value;
  novoInput.style.backgroundColor = corInputAtual;

  let corBorderAtual = document.getElementById("inputBorderColor").value;
  novoInput.style.borderColor = corBorderAtual;

  let corFonteAtual = document.getElementById("fontColor").value;
  novoInput.style.color = corFonteAtual;

  let corLabelAtual = document.getElementById("addColor").value;
  novoLabel.style.color = corLabelAtual;

  novaDiv.appendChild(novoLabel);
  novaDiv.appendChild(novoInput);
  novaDiv.appendChild(groupButtons);

  document.querySelector(".form-content").appendChild(novaDiv);

  document
    .getElementById("fontColor")
    .addEventListener("input", atualizarCorFonte);
  document
    .getElementById("inputColor")
    .addEventListener("input", atualizarCorInput);
  document
    .getElementById("inputBorderColor")
    .addEventListener("input", atualizarCorBordaInput);
  document
    .getElementById("formWidth")
    .addEventListener("input", mudarLaguraInput);
  document
    .getElementById("formHeight")
    .addEventListener("input", mudarAlturaInput);
  document
    .getElementById("addLabel")
    .addEventListener("change", atualizarLabel);
  document
    .getElementById("addText")
    .addEventListener("input", atualizarTextoLabel);
  document
    .getElementById("choose-type")
    .addEventListener("change", atualizarTipoInput);
  document
    .getElementById("addPlaceholder")
    .addEventListener("input", atualizarPlaceholder);
  document
    .getElementById("addColor")
    .addEventListener("input", atualizarCorLabel);
  document
    .getElementById("titleFontSize")
    .addEventListener("input", atualizarTamanhoTitulo);
  document
    .getElementById("titleColor")
    .addEventListener("input", atualizarCorTitulo);
  document
    .getElementById("titleText")
    .addEventListener("input", atualizarTextoTitulo);
}
let elementoSelecionado = null;

function abrirPropriedades(div) {
  const menu = document.querySelector(".specific-properties");

  if (elementoSelecionado === div && menu.classList.contains("active")) {
    menu.classList.remove("active");
    elementoSelecionado = null;
    return;
  }

  elementoSelecionado = div;
  menu.classList.add("active");

  const label = div.querySelector("label");
  const input = div.querySelector("input");

  document.getElementById("addLabel").checked = label.textContent !== "";
  document.getElementById("addText").value = label.textContent;
  document.getElementById("choose-type").value = input.type || "text";
  document.getElementById("addPlaceholder").value = input.placeholder || "";

  const verificarDirection = div.style.flexDirection === "row";
  document.getElementById("side").checked = verificarDirection;
}

function atualizarLabel(e) {
  if (!elementoSelecionado) return;
  const label = elementoSelecionado.querySelector("label");
  label.textContent = e.target.checked
    ? document.getElementById("addText").value
    : "";
}

function atualizarTextoLabel(e) {
  if (!elementoSelecionado || !document.getElementById("addLabel").checked)
    return;

  elementoSelecionado.querySelector("label").textContent = e.target.value;
}

function atualizarTipoInput(e) {
  if (!elementoSelecionado) return;
  elementoSelecionado.querySelector("input").type = e.target.value;
}

function atualizarPlaceholder(e) {
  if (!elementoSelecionado) return;
  elementoSelecionado.querySelector("input").placeholder = e.target.value;
}

function mudarLaguraInput(e) {
  widthAtual = e.target.value + "px";
  let inputGroups = document.querySelectorAll(".input-group");
  for (let i = 0; i < inputGroups.length; i++) {
    inputGroups[i].style.width = widthAtual;
  }
  document.getElementById("widthValue").textContent = e.target.value + "px";
}
function mudarAlturaInput(e) {
  heightAtual = e.target.value + "px";
  let inputGroups = document.querySelectorAll(".input-group input");
  for (let i = 0; i < inputGroups.length; i++) {
    inputGroups[i].style.height = heightAtual;
  }
  document.getElementById("heightValue").textContent = e.target.value + "px";
}

document.getElementById("bgColor").addEventListener("input", function (e) {
  document.querySelector(".form-box").style.backgroundColor = e.target.value;
});

document.getElementById("borderColor").addEventListener("input", function (e) {
  document.querySelector(".form-box").style.outlineColor = e.target.value;
});

function atualizarCorInput(e) {
  let inputGroups = document.querySelectorAll(".input-group input");
  corInputAtual = e.target.value;
  for (let i = 0; i < inputGroups.length; i++) {
    inputGroups[i].style.backgroundColor = e.target.value;
  }
}

function atualizarCorBordaInput(e) {
  let inputGroups = document.querySelectorAll(".input-group input");
  corBorderAtual = e.target.value;

  for (let i = 0; i < inputGroups.length; i++) {
    inputGroups[i].style.borderColor = e.target.value;
  }
}

function atualizarCorFonte(e) {
  let inputGroups = document.querySelectorAll(".input-group input");
  corFonteAtual = e.target.value;
  for (let i = 0; i < inputGroups.length; i++) {
    inputGroups[i].style.color = e.target.value;
  }
}
function atualizarCorLabel(e) {
  elementoSelecionado.querySelector("label").style.color = e.target.value;
}

function atualizarTamanhoTitulo(e) {
  const titulo = document.querySelector(".form-box-title h2");
  if (titulo) {
    titulo.style.fontSize = e.target.value + "px";
    document.getElementById("titleSizeValue").textContent =
      e.target.value + "px";
  }
}
function atualizarCorTitulo(e) {
  console.log("Cor alterada para:", e.target.value);
  const titulo = document.querySelector(".form-box-title h2");
  if (titulo) {
    titulo.style.color = e.target.value;
  }
}
function atualizarTextoTitulo(e) {
  const titulo = document.querySelector(".form-box-title h2");
  if (titulo) {
    titulo.textContent = e.target.value;
  }
}
