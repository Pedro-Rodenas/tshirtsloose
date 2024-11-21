const carrusel = document.querySelector('.carrusel-contenido');
const slides = Array.from(document.querySelectorAll('.slide'));

let currentIndex = 0;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

carrusel.appendChild(firstClone);
carrusel.insertBefore(lastClone, slides[0]);

carrusel.style.transform = `translateX(-100%)`;

function moveCarrusel() {
    currentIndex++;
    carrusel.style.transition = 'transform 0.5s ease-in-out';
    carrusel.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;


    carrusel.addEventListener('transitionend', () => {
        if (currentIndex >= slides.length) {
            currentIndex = 0;
            carrusel.style.transition = 'none';
            carrusel.style.transform = `translateX(-100%)`;
        }
    });
}

setInterval(moveCarrusel, 3000);
