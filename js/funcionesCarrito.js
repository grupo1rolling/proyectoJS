import { ItemCarrito } from "./clases.js";
import { cargaInicialDatos } from "./funcionesAuxiliares.js";

// --------------------- [inicialización de variables] --------------------- //
let totalARSCarrito = 0, contadorProdCarrito = 0;
let dbProductos = [];
let arrayProdComprados = [];
//let ItemCompra;
let carrito = [];
// -------------------- [inicialización de variables] ---------------------- //
cargaInicialDatos();
getProductos();
actualizarTotalesCarrito();
mostrarTarjetas();

// ----------- [usuarioAutenticado (true/false) en localStorage] ----------- //
//localStorage.setItem("usuarioAutenticado", false);
//lo ponemos en true para que entre siempre                          #### 4 TESTING PURPOSES ONLY ###
localStorage.setItem("usuarioAutenticado", true);
let autenticado = localStorage.getItem("usuarioAutenticado");          // ### OJO QUE ES STRING ### //
console.log(`valor autenticado ${autenticado} indica si un usuario esta logueado `);


// --- ###################### [F U N C I O N E S] ###################### --- //

// -------------------- [actualiza totales del Carrito] -------------------- //
function actualizarTotalesCarrito() {
	document.getElementById("totalCarrito").innerHTML = totalARSCarrito.toFixed(2);
	document.getElementById("contador").innerHTML = contadorProdCarrito;
}

// -------------------- [actualiza totales del Carrito] -------------------- //
let botonVaciar = document.querySelector('#botonVaciar');
// Eventos
botonVaciar.addEventListener('click', vaciarCarrito);
function vaciarCarrito() {
	totalARSCarrito = 0;
	contadorProdCarrito = 0;
	console.log("VACIANDO CARRITO.................")                 //#### 4 TESTING PURPOSES ONLY ###
	actualizarTotalesCarrito();
};


// ----------------- [traemos productos del local Storage] ----------------- //          
function getProductos() {
	dbProductos = JSON.parse(localStorage.getItem("productos")) || [];
}

// ---------------- [guardamos productos del local Storage] ---------------- //
/*function setLocalStorageProd () {
	localStorage.setItem('productos', JSON.stringify(dbProductos))
}*/


// -------------------- [mostrar tarjetas dinámicamente] ------------------- //
function mostrarTarjetas() {

	let tarjProd = document.getElementById("tarjetasProd");
	dbProductos.map(function (prod, index) {
		let tarjeta = `
                <div class="card">
                <img id="fotoProducto" src=${prod._foto} class="card-img-top" alt="top-estampa-cactus">
                <div class="card-body">
                  <h5 id="nombreProducto" class="card-title">${prod._nombre}</h5>
                  <p id="precioProducto">${prod._precio}</p>
                  <p id="descripcionProducto"class="card-text">
                  ${prod._descripcion}
                  </p>
                  <p id="talleProducto">${prod._talle}</p>
                  <p id="categoriaProducto">lala</p>
                </div>
                <div class="card-footer">
                <a href="#" class="btn btn-green mt-3" onclick="comprarProd(${index})">Añadir al carro</a>
                </div>
              </div>       
            `;
		tarjProd.innerHTML += tarjeta;
		console.log(`se cargó la tarjeta ${index}`)
	});
}

// ------- [vamos a poner en un array los codigo productos comprados] ------ //

//FUNCION COMPRAR PRODUCTO
comprarProd(0);

function comprarProd(i) {

	console.log(`VAMOS A COMPRAR ${i}`)
	//busco el prod en el array productos
	let prod = dbProductos[i];
	console.log(prod);

	//si hay al menos un prod entonces se puede vender 
	if (prod._stock >= 1) {
		console.log("actualizamos stock")
		dbProductos[i].stock -= 1;
		arrayProdComprados.push(prod._codigo);
		console.log(`arrayProdComprados ---> ${arrayProdComprados}`);
		let idProd = prod._codigo;
		let nomProd = prod._nombre;
		let cantProd = 1;
		let precioProd = prod._precio;

		let itemCompra = new ItemCarrito(idProd, nomProd, cantProd, precioProd);

		itemCompra._idProd = idProd;
		itemCompra._nomProd = nomProd;
		itemCompra._cantProd = cantProd;
		itemCompra._precioProd = precioProd;
		console.log("itemCompra");

		carrito.push(itemCompra);
		console.log('Se ha añadido un item al carrito')


		//en totalCompra sumo los importes de los prod comprados
		totalARSCarrito += prod._precio;
		contadorProdCarrito += prod._precio;
		console.log(totalARSCarrito);
		console.log(contadorProdCarrito);
		actualizarTotalesCarrito;
	} else {
		console.error(`ooops nos quedamos sin ${prod._nombre}`);
	}
}


//         //actualizo la cantidad del producto vendido en el array de productos
//         let indice = productos.findIndex(item => {
//             return item.id == i
//         })
//         productos[indice].cantidad -= 1

//         console.log('Se ha añadido un item al carrito')

//     } else {
//         
//         listarStock()
//  


// ----------- [pasamos del array de compra a items del carrito] ----------- //
/*
function agregarAlCarrito(cod) {
	console.log("VAMOS A COMPLETAR LAS LINEAS DEL CARRITO ")

// -------------------- [creamos INSTANCIA ItemCarrito] -------------------- //
let itemCarrito= new ItemCarrito (idProd, nomProd, cantProd, precioProd);
// let idP,nomP,cantP, precioP;
// //inicializamos INSTANCIA ItemCarrito
// itemCart.idProd = idP;
// itemCart.nomProd = nomP;
// itemCart.cantProd= cantP;
// itemCart.precioProd = precioP;
}
*/


// -------------------------- [finalizar compra] --------------------------- //
function finalizarCompra() {
	alert(`Compra finalizada. ${contadorProdCarrito} prendas. Total a pagar $ ${totalARSCarrito}`)
}



// ------------------- [buscar palabra en dbProductos] ------------------- //
/*
function validarPalabraBuscar(palabra) {
	if (dbProductos.categoria.includes(palabra)) {
		console.log("encontró")
	} else {console.log("encontró")}
}
*/

/*
// ------------------- [filtrar productos por categoria] ------------------- //
function filtrarProductos(cat) {
  const prodXcat = dbProductos.filter (item=> {
		return item.categoria === cat
  })
}
*/


// --------------------------- [listar carrito] ---------------------------- //
function listarCarrito() {
	if (carrito.lenght > 0) {
		console.log(`CARRITO.LENGHT = ${carrito.lenght}`)
	} else {
		alert("carrito vacio")
	}
}




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