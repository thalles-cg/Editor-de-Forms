document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const dropdown = toggle.closest('.dropdown');
    dropdown.classList.toggle('open');
    toggle.classList.toggle('active');
  });
});