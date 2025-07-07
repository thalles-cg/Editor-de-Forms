export function redirecionarParaPreview(path = '') {
  if (window.location.hostname.includes('github.io')) {
    window.location.href = `/Editor-de-Forms/preview.html${path ? '#' + path : ''}`;
  } else {
    window.location.href = `./preview.html${path ? '#' + path : ''}`;
  }
}

export function applyInlineStyles(element) {
  const computedStyle = window.getComputedStyle(element);
  for (const prop of computedStyle) {
    try {
      element.style[prop] = computedStyle.getPropertyValue(prop);
    } catch (e) {
    }
  }

  for (const child of element.children) {
    applyInlineStyles(child);
  }
}