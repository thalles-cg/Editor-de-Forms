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
  if (!header) return alert('Cabeçalho não encontrado.');

  const clone = header.cloneNode(true);
  applyInlineStyles(clone);
  localStorage.setItem('headerSelecionado', clone.outerHTML);
  redirecionarParaPreview();
}

function exportarMenu() {
  const menu = document.querySelector('.menu[data-form-id="menu"]');
  if (!menu) return alert('Menu não encontrado.');

  const clone = menu.cloneNode(true);
  applyInlineStyles(clone);
  localStorage.setItem('menuSelecionado', clone.outerHTML);
  redirecionarParaPreview();
}

function exportarFooter() {
  const footer = document.querySelector('.sub-header[data-form-id="footer"]');
  if (!footer) return alert('Footer não encontrado.');

  const clone = footer.cloneNode(true);
  applyInlineStyles(clone);
  localStorage.setItem('footerSelecionado', clone.outerHTML);
  redirecionarParaPreview();
}

function exportarGallery() {
  const gallery = document.querySelector('.card-content[data-form-id="gallery"]');
  if (!gallery) return alert('Gallery não encontrado.');

  const clone = gallery.cloneNode(true);
  applyInlineStyles(clone);
  localStorage.setItem('gallerySelecionado', clone.outerHTML);
  redirecionarParaPreview();
}

function exportarForm() {
  const forms = document.querySelector('.form-content[data-form-id="forms"]');
  if (!forms) return alert('Forms não encontrado.');

  const clone = forms.cloneNode(true);
  applyInlineStyles(clone);
  localStorage.setItem('formsSelecionado', clone.outerHTML);
  redirecionarParaPreview();
}

function redirecionarParaPreview() {
  if (window.location.hostname.includes('github.io')) {
    window.location.href = '/Editor-de-Forms/preview.html';
  } else {
    window.location.href = './preview.html';
  }
}

// Aplica estilos computados como inline
function applyInlineStyles(element) {
  const computedStyle = window.getComputedStyle(element);
  for (const prop of computedStyle) {
    try {
      element.style[prop] = computedStyle.getPropertyValue(prop);
    } catch (e) {
      // Ignorar erros de propriedades somente leitura
    }
  }

  for (const child of element.children) {
    applyInlineStyles(child);
  }
}
