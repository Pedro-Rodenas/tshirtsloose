// Obtener los elementos del modal y del carrito
const cartModal = document.getElementById("cart-modal");
const openCartModalButton = document.getElementById("openCartModal");
const closeModalButton = document.querySelector(".close");
const cartItemsContainer = document.getElementById("cart-items");

// Array para almacenar los productos añadidos al carrito
let cartItems = [];

// Función para abrir el modal
openCartModalButton.addEventListener("click", () => {
    cartModal.style.display = "block"; // Mostrar el modal
    renderCartItems(); // Renderizar los productos del carrito
});

// Función para cerrar el modal
closeModalButton.addEventListener("click", () => {
    cartModal.style.display = "none"; // Ocultar el modal
});

// Función para agregar un producto al carrito
function addToCart(productName, productPrice, productId) {
    // Obtener la cantidad seleccionada
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).innerText);

    // Verificar si el producto ya está en el carrito
    const existingProduct = cartItems.find(item => item.id === productId);

    if (existingProduct) {
        // Si el producto ya está en el carrito, solo se aumenta la cantidad
        existingProduct.quantity += quantity;
    } else {
        // Si el producto no está en el carrito, se agrega con la cantidad seleccionada
        const product = {
            name: productName,
            price: productPrice,
            id: productId,
            quantity: quantity
        };
        cartItems.push(product);
    }

    // Mostrar la alerta con SweetAlert2
    Swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: `Se ha agregado al carrito ${quantity} ${productName}`,
        showConfirmButton: true,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#F90B2C',
    });

    // Actualizar la lista de productos en el carrito
    renderCartItems();
}

// Función para renderizar los productos del carrito en el modal
function renderCartItems() {
    // Limpiar la lista antes de agregar los productos
    cartItemsContainer.innerHTML = "";

    // Si el carrito está vacío, mostrar un mensaje
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<li>No hay productos en el carrito.</li>";
    } else {
        // Agregar los productos al carrito en el modal
        cartItems.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.name} - $${item.price} x ${item.quantity}</span>
                <button onclick="removeFromCart('${item.id}')">Eliminar</button>
            `;
            cartItemsContainer.appendChild(li);
        });
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    // Filtrar el producto del carrito usando su ID único
    cartItems = cartItems.filter(item => item.id !== productId);
    renderCartItems(); // Volver a renderizar los productos
}

// Función para aumentar la cantidad de un producto
function increaseQuantity(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let currentQuantity = parseInt(quantityElement.innerText);
    quantityElement.innerText = currentQuantity + 1;
}

// Función para disminuir la cantidad de un producto
function decreaseQuantity(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let currentQuantity = parseInt(quantityElement.innerText);
    if (currentQuantity > 1) {
        quantityElement.innerText = currentQuantity - 1;
    }
}

// Enviar carrito a WhatsApp cuando el usuario haga clic en "Ir a Pagar"
function sendToWhatsApp() {
    if (cartItems.length === 0) {
        alert('Tu carrito está vacío'); // Verificar si el carrito tiene productos
        return;
    }

    // Crear el mensaje con los productos del carrito
    let message = 'Hola, me gustaría realizar el pedido de los siguientes productos:\n\n';

    // Recorrer el carrito y agregar los productos al mensaje
    cartItems.forEach(item => {
        message += `${item.name} - S/${item.price.toFixed(2)}\n`;
    });

    // Calcular el total
    const total = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    message += `\nTotal: S/${total}\n\nPor favor, confírmame la disponibilidad y el precio total.`;

    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(message);

    // Reemplazar el número con tu número de WhatsApp
    const whatsappURL = `https://wa.me/51994974521?text=${encodedMessage}`;

    // Usar window.open() para abrir WhatsApp en una nueva pestaña y asegurar que el mensaje se pase
    window.open(whatsappURL, '_blank');
}
