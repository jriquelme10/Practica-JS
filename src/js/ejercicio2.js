// Selectores
const formulario = document.querySelector('#formulario');

// Elementos de la API
let paginaActual = 1;
const termino = 'futbol'
const key = '1732750-d45b5378879d1e877cd1d35a6';

// Instanciar evento de Submit
window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);

}


function validarFormulario(e){
    e.preventDefault();
    const termino = document.querySelector('#termino').value;
    if(termino === ''){
        mostrarAlerta('Agrega un término de búsqueda');
        return;
    }
    buscarImagenes();
}

async function buscarImagenes(){
    const termino = document.querySelector('#termino').value;
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=30&page=${paginaActual}`;
    try {
        const respuesta = await axios.get(url);
        console.log(respuesta);
        mostrarImagenesHTML(respuesta.data.hits);
    }catch(error){
        console.log(error);
    }
}

function mostrarAlerta(mensaje) {
    const alerta = document.querySelector('.bg-red-200')
    if (!alerta) {
        const alerta = document.createElement('p');
        alerta.classList.add("w-full", "bg-red-200", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "max-w-lg", "mx-auto", "mt-6", "text-center")
        alerta.textContent = mensaje;
        formulario.appendChild(alerta)

        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
}





function mostrarImagenesHTML(hits){
    while(contenido.firstChild) {
        contenido.removeChild(contenido.firstChild);
    }

    hits.forEach(elemento => {
        const { previewURL, likes, views, largeImageURL, tags } = elemento;

        contenido.innerHTML += `
            <div class="max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10">
                    <img class="rounded-t-lg" src=${previewURL} alt={tags} />
                    <div class="p-4">
                        <p class="text-lg font-semibold">${likes} Me Gusta</p>
                        <p class="text-lg font-semibold">${views} Vistas </p>
        
                        <a href=${largeImageURL}
                        rel="noopener noreferrer" 
                        target="_blank" class="mt-4 block bg-green-400 text-lg p-3 rounded cursor-pointer text-center uppercase font-semibold hover:bg-green-600 transition">Ver Imagen Completa</a>
            </div>
            `;
    });
}