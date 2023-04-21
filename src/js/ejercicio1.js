
// Selectores
const contenido = document.querySelector('#contenido');
const btnAgregar = document.querySelector('#addBtn');
const btnEliminar = document.querySelector('#removeBtn');

// Arreglo
let arrayNumeros = [];

// Instanciar eventos de Click
window.onload = () => {
    btnAgregar.addEventListener('click', agregarNumero);
    btnEliminar.addEventListener('click', eliminarNumero);
}

function agregarNumero(e) {
    e.preventDefault()
    const terminoBusqueda = document.querySelector('#input').value;
    if(terminoBusqueda === '') {
        mostrarAlerta('Agrega un número');
    
    }
    if(arrayNumeros.includes(terminoBusqueda)){
        mostrarAlerta('El número ya existe');
        return;
    }
    arrayNumeros.push(terminoBusqueda);
    refrescar();

}

function mostrarAlerta(mensaje){
    const alerta = document.createElement('p');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
    alerta.textContent = mensaje;
    contenido.appendChild(alerta);
}

function refrescar(){
    while(contenido.firstChild){
        contenido.removeChild(contenido.firstChild);
    }
    arrayNumeros.forEach(numero => {
        agregarNumeroHTML(numero);
    });
}

function eliminarNumero(e) {
    e.preventDefault()
    const terminoBusqueda = document.querySelector('#input').value;
    if(terminoBusqueda === '') {
        mostrarAlerta('Agrega un número');
        return;
    }
    arrayNumeros.some((numero, index) => {
        if(numero === terminoBusqueda){
            arrayNumeros.splice(index, 1);
            refrescar();
            return true;
        }
    });

}


function agregarNumeroHTML(number) {

    contenido.innerHTML += `
        <div>
            <p class="bg-cyan-500 p-3 rounded-sm font-bold text-lg text-center">${number}</p>
        </div>    
    `;
}

