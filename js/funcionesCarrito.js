import { ItemCarrito } from "./clases.js";

//import { Usuario, Producto, ItemCarrito } from "./clases.js";

// ------------- [inicialización de variables] ------------- //
let totalARSCarrito=0, contadorProdCarrito=0;

let dbProductos=[];

// ------------- [actualiza totales del Carrito] ------------- //
export function actualizarTotalesCarrito() {
    document.getElementById("totalCarrito").innerHTML=totalARSCarrito.toFixed(2);
    document.getElementById("contador").innerHTML=contadorProdCarrito;
}

// ------ [usuarioAutenticado (true/false) en localStorage] ------ //
//localStorage.setItem("usuarioAutenticado", false);
//lo ponemos en true para que entre siempre                          #### 4 TESTING PURPOSES ONLY ###
localStorage.setItem("usuarioAutenticado", true);

let autenticado=localStorage.getItem("usuarioAutenticado");
console.log(autenticado) //OJO QUE ES STRING                          #### 4 TESTING PURPOSES ONLY ###


// ---------------------------------------------------- //
function vaciarCarrito () {
    totalARSCarrito=0;
    contadorProdCarrito=0;
};

// ------------- [traemos productos del local Storage] ------------- //
function getProductos() {
    dbProductos =
        JSON.parse(localStorage.getItem("productos")) == null
            ? []
			: JSON.parse(localStorage.getItem("productos"));
	return dbProductos;
}

// ------------- [traemos productos del local Storage] ------------- //
function setLocalStorage () {
    localStorage.setItem('productos',JSON.stringify(usuarios))
}


// ------------------------ [mostrar tarjetas dinámicamente] ------------------------ //
let tarjProd = document.getElementById("tarjetasProd");

export function mostrarTarjetas() {
    dbProductos.map(function(prod, i){
        let tarjeta = `<div class="card-deck m-5">
                <div class="card">
                <img id="fotoProducto" src=${prod.foto} class="card-img-top" alt="top-estampa-cactus">
                <div class="card-body">
                  <h5 id="nombreProducto" class="card-title">${prod.nombre}</h5>
                  <p id="precioProducto">${prod.precio}</p>
                  <p id="descripcionProducto"class="card-text">
                  ${prod.descripcion}
                  </p>
                  <p id="talleProducto">${prod.talle}</p>
                  <p id="categoriaProducto">${prod.categoria}</p>
                </div>
                <div class="card-footer">
                  <a href="#" class="btn btn-green mt-3" onclick="comprarProd(${index})">Añadir al carro</a>
                </div>
              </div>       
            </div>`;
        tarjProd.innerHTML += tarjeta;
        });
}


export function comprarProd(cod) {
    console.log ("vamos de shopping")
}
export function agregarAlCarrito(cod) {

    // ---------------------- [creamos INSTANCIA ItemCarrito] ---------------------- //
let itemCart= new ItemCarrito (idProd, nomProd, cantProd, precioProd);
// let idP,nomP,cantP, precioP;
// //inicializamos INSTANCIA ItemCarrito
// itemCart.idProd = idP;
// itemCart.nomProd = nomP;
// itemCart.cantProd= cantP;
// itemCart.precioProd = precioP;
}



// ------------------------ [finalizar compra] ------------------------ //
 function finalizarCompra() {
    alert (`Compra finalizada. ${contadorProdCarrito} prendas. Total a pagar $ ${totalARSCarrito}`)
}






// ---------------------- [creamos INSTANCIA ItemCarrito] ---------------------- //
let itemCart= new ItemCarrito (idProd, nomProd, cantProd, precioProd);
// let idP,nomP,cantP, precioP;
// //inicializamos INSTANCIA ItemCarrito
// itemCart.idProd = idP;
// itemCart.nomProd = nomP;
// itemCart.cantProd= cantP;
// itemCart.precioProd = precioP;


// //FUNCION QUITAR PRDUCTO DEL CARRITO
// function quitarProd() {
//     p = prompt("Ingrese el item a quitar:  1.Huron 2. Conejo 3.Ninfa 4.Cobaya 5.Chinchilla 6.Iguana o 7 Gecko")

//     if (validar(p)) {
//         //busco el prod en el array carrito
//         let indBuscar = carrito.findIndex(item => {
//             return item.idProd == p
//         })

//         //borro elemento de carrito
//         if (indBuscar != -1) {
//             carrito.splice(indBuscar, 1)

//             //actualizo la cantidad del producto quitado del carrito en el array de productos
//             let indice = productos.findIndex(item => {
//                 return item.id == p
//             })

//             //en totalCompra sumo los importes de los prod comprados
//             totalCompra -= productos[indice].precio

//             //actualizo el stock
//             productos[indice].cantidad += 1

//             console.log('Se ha quitado un item del carrito')
//         } else {
//             console.warn('ese elemento no está en el carrito')
//         }
//     }
// }

// //FUNCION VALIDA QUE EL ELEM QUE SE DESEA QUITAR DEL CARRITO SEA VALIDO
// function validar(p) {
//     if (isNaN(p) || (p < 1 || p > 7)) {
//         console.warn('numero invàlido')
//         return false;

//     } else {
//         return true
//     }

// }

// let tipos = ['ave', 'lagarto', 'mamifero', 'roedor', 'reptil']

// function validarTipo(t) {

//     t.toLowerCase
//     if (tipos.includes(t)) {
//         return true
//     } else {
//         console.warn('no ingreso un tipo válido')
//         return false
//     }

// }



// //FUNCION FILTRAR POR TIPO DE PRODUCTO 
// function filtrarProd() {
//     filtro = prompt('Ingrese el tipo a filtar:  Ave, Lagarto, Mamifero, Roedor, Lagarto o Reptil')
//     if (validarTipo(filtro)) {

//         const tipos = productos.filter(item => {
//             return item.tipo === filtro
//         })
//         console.table(tipos, ['tipo', 'nombre', 'precio'])
//     }

// }



// //FUNCION QUE LISTA LOS PRODUCTOS DEL CARRITO
// function listarCarrito() {

//     if (carrito.length > 0) {
//         console.log(`Su carrito:                   Total a pagar  $ ${totalCompra}`)

//         console.table(carrito, ['cantProd', 'nombreProd', 'precioProd'])

//     } else {
//         console.warn('Su carrito está vacío')
//     }

// }



