document.addEventListener("DOMContentLoaded", function () {
  const exportHeaderBtn = document.querySelector("#exportHeaderBtn");
  const exportMenuBtn = document.querySelector("#exportMenuBtn");
  const exportFooterBtn = document.querySelector("#exportFooterBtn");
  const exportGalleryBtn = document.querySelector("#exportGalleryBtn");
  const exportFormBtn = document.querySelector("#exportFormBtn");

  if (exportHeaderBtn) {
    exportHeaderBtn.addEventListener("click", exportarHeader);
  }
  if (exportMenuBtn) {
    exportMenuBtn.addEventListener("click", exportarMenu);
  }
  if (exportFooterBtn) {
    exportFooterBtn.addEventListener("click", exportarFooter);
  }
  if (exportGalleryBtn) {
    exportGalleryBtn.addEventListener("click", exportarGallery);
  }
  if (exportFormBtn) {
    exportFormBtn.addEventListener("click", exportarForm);
  }
});

function exportarHeader() {
  const header = document.querySelector('.sub-header[data-form-id="header"]');
  if (!header) {
    alert('Cabeçalho não encontrado.');
    return;
  }

  // Clonar o conteúdo que será exportado
  const clone = header.cloneNode(true);

  // Aplicar os estilos computados como inline
  applyInlineStyles(clone);

  // Salvar no localStorage
  localStorage.setItem('headerSelecionado', clone.outerHTML);

  // Redirecionar para a visualização
  window.location.href = '/preview.html';
}

function exportarMenu() {
  const menu = document.querySelector('.menu[data-form-id="menu"]');
  if (!menu) {
    alert('Menu não encontrado.');
    return;
  }
  const clone = menu.cloneNode(true);
  applyInlineStyles(clone);
  localStorage.setItem('menuSelecionado', clone.outerHTML);
  window.location.href = '/preview.html';
}

function exportarFooter() {
  const footer = document.querySelector('.sub-header[data-form-id="footer"]');
  if (!footer) {
    alert('Footer não encontrado.');
    return;
  }
  const clone = footer.cloneNode(true);
  applyInlineStyles(clone);
  localStorage.setItem('footerSelecionado', clone.outerHTML);
  window.location.href = '/preview.html';
}

function exportarGallery() {
  const gallery = document.querySelector('.card-content[data-form-id="gallery"]');
  if (!gallery) {
    alert('Gallery não encontrado.');
    return;
  }
  const clone = gallery.cloneNode(true);
  applyInlineStyles(clone);
  localStorage.setItem('gallerySelecionado', clone.outerHTML);
  window.location.href = '/preview.html';
}

function exportarForm() {
  const forms = document.querySelector('.form-content[data-form-id="forms"]');
  if (!forms) {
    alert('Forms não encontrado.');
    return;
  }
  const clone = forms.cloneNode(true);
  applyInlineStyles(clone);
  localStorage.setItem('formsSelecionado', clone.outerHTML);
  window.location.href = '/preview.html';
}

// Função recursiva que aplica todos os estilos CSS computados como inline
function applyInlineStyles(element) {
  const computedStyle = window.getComputedStyle(element);
  for (const prop of computedStyle) {
    try {
      element.style[prop] = computedStyle.getPropertyValue(prop);
    } catch (e) {
      // Alguns estilos podem ser somente leitura, ignorar erros
    }
  }

  for (const child of element.children) {
    applyInlineStyles(child);
  }
}


