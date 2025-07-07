export function redirecionarParaPreview(path = '') {
  if (window.location.hostname.includes('github.io')) {
    window.location.href = `/Editor-de-Forms/preview.html${path ? '#' + path : ''}`;
  } else {
    window.location.href = `./preview.html${path ? '#' + path : ''}`;
  }
}
export function applyInlineStyles(element) {
  const computedStyle = window.getComputedStyle(element);

  const excludedProps = [
    'width',
    'height',
    'min-width',
    'max-width',
    'min-height',
    'max-height',
    'flex-basis', 
    'flex-grow',
    'flex-shrink',
    'grid-template-columns', 
    'grid-template-rows',
    'margin', 
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'padding', 
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'top', 'bottom', 'left', 'right', 
    'position', 
    'float', 
    'clear',
    'display', 
    'vertical-align', 
  ];

  for (const prop of computedStyle) {
    if (!excludedProps.includes(prop)) {
      try {
        element.style[prop] = computedStyle.getPropertyValue(prop);
      } catch (e) {
      }
    }
  }

  for (const child of element.children) {
    applyInlineStyles(child);
  }
}