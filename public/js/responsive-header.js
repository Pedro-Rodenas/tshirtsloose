// Seleccionamos el botón de hamburguesa y el menú
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

// Función para activar o desactivar el menú
menuToggle.addEventListener('click', function() {
    navList.classList.toggle('active'); // Abre o cierra el menú
});
