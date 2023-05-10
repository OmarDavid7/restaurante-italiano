const menu  = document.querySelector(".hamburguesa");
const navegacion = document.querySelector(".navegacion");
const imagenes = document.querySelectorAll("img");
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPasta = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnPostre = document.querySelector('.postres');
const contenedorPlatillos = document.querySelector('.platillos');



document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    platillos();
})

const eventos = ()=>{
    menu.addEventListener('click', abrirMenu);
}

const abrirMenu = ()=>{
   navegacion.classList.remove("ocultar");
   botonCerrar()
}

const botonCerrar = ()=>{
   const btnCerrar = document.createElement('p');
   const overlay = document.createElement('div');
   overlay.classList.add('pantalla-completa')
   const body = document.querySelector("body");
   if(document.querySelectorAll('.pantalla-completa').length > 0){
    return 
   }
   body.appendChild(overlay);
   btnCerrar.textContent = "x";
   btnCerrar.classList.add('btnCerrar');

   /*while(navegacion.children[5]){
    navegacion.removeChild(navegacion.children[5]);
   }*/

   navegacion.appendChild(btnCerrar);
   cerrarMenu(btnCerrar, overlay);
}


const cerrarMenu = (boton,overlay)=>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add("ocultar");
    }
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            const imagen = entry.target
            imagen.src = imagen.dataset.src
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach((imagen)=>{
    observer.observe(imagen);
})

const platillos = ()=>{
    let platillosArreglo = [];
    const platillos = document.querySelectorAll(".platillo");

    platillos.forEach(item=> platillosArreglo = [...platillosArreglo, item]);

    const ensaladas = platillosArreglo.filter(ensalada=> ensalada.getAttribute('data-platillo') === 'ensalada');
    const pastas = platillosArreglo.filter(pasta =>pasta.getAttribute('data-platillo') === 'pasta');
    const pizzas = platillosArreglo.filter(pizza=>pizza.getAttribute('data-platillo') === 'pizza');
    const postres = platillosArreglo.filter(postre=>postre.getAttribute('data-platillo') === 'postre');
    mostrarPlatillos(ensaladas,pastas,pizzas,postres, platillosArreglo);
}


const mostrarPlatillos = (ensaladas, pastas, pizzas, postres, todos)=>{
    btnEnsaladas.addEventListener('click', ()=>{
        limpiarHTML(contenedorPlatillos);
        ensaladas.forEach(item => contenedorPlatillos.appendChild(item));
    })

    btnPasta.addEventListener('click', ()=>{
        limpiarHTML(contenedorPlatillos);
        pastas.forEach(item => contenedorPlatillos.appendChild(item));
    })

    btnPizza.addEventListener('click', ()=>{
        limpiarHTML(contenedorPlatillos);
        pizzas.forEach(item => contenedorPlatillos.appendChild(item));
    })

    btnPostre.addEventListener('click', ()=>{
        limpiarHTML(contenedorPlatillos);
        postres.forEach(item => contenedorPlatillos.appendChild(item));
    })

    btnTodos.addEventListener('click',()=>{
        limpiarHTML(contenedorPlatillos);
        todos.forEach(item => contenedorPlatillos.appendChild(item));
    })
}

const limpiarHTML = (contenedor)=>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}