// gallery-salvar.js (atualizado)

function salvarGaleria() {
  const galeria = document.querySelector(".card-content");
  const html = galeria.innerHTML;
  localStorage.setItem("galeria", html);
}

function restaurarGaleria() {
  const galeria = document.querySelector(".card-content");
  const html = localStorage.getItem("galeria");

  if (html) {
    const novaGaleria = galeria.cloneNode(false);
    novaGaleria.innerHTML = html;
    galeria.replaceWith(novaGaleria);
    inicializarEventosGaleria(novaGaleria);
  }
}

function inicializarEventosGaleria(galeriaEl) {
  const cards = galeriaEl.querySelectorAll(".card");

  cards.forEach((card) => {
    const editBtn = card.querySelector(".material-symbols-outlined:contains('edit')")?.parentElement;
    const removeBtn = card.querySelector(".material-symbols-outlined:contains('close')")?.parentElement;

    if (editBtn) {
      editBtn.addEventListener("click", () => abrirPropriedades(card));
    }

    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        if (elementoSelecionado === card) {
          const menus = document.querySelectorAll(".specific-properties");
          menus.forEach((menu) => menu.classList.remove("active"));
          elementoSelecionado = null;
        }
        card.remove();
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", restaurarGaleria);
document.addEventListener("beforeunload", salvarGaleria);
