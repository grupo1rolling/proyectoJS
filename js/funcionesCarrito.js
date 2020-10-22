import { Usuario, Producto, ItemCarrito } from "./clases.js";
import { agregarProducto } from "./funcionesProductos.js";
import { agregarUsuario } from "./funcionesUsuarios.js";

// --------------------- [inicialización de variables] --------------------- //
let totalARSCarrito=0, contadorProdCarrito=0;
let dbProductos=[];
let arrayProdComprados=[];
//let ItemCompra;
let carrito=[];
// -------------------- [inicialización de variables] ---------------------- //
cargaInicialDatos();
getProductos();
actualizarTotalesCarrito();
mostrarTarjetas();

// ----------- [usuarioAutenticado (true/false) en localStorage] ----------- //
//localStorage.setItem("usuarioAutenticado", false);
//lo ponemos en true para que entre siempre                          #### 4 TESTING PURPOSES ONLY ###
localStorage.setItem("usuarioAutenticado", true);
let autenticado=localStorage.getItem("usuarioAutenticado");          // ### OJO QUE ES STRING ### //
console.log(`valor autenticado ${autenticado} indica si un usuario esta logueado `);           


// --- ###################### [F U N C I O N E S] ###################### --- //

// ------------- [carga inicial de datos PRODUCTOS Y USUARIOS] ------------- //
function cargaInicialDatos() {
    // -------------- [inicializamos ADMINISTRADOR)] -------------- //
	let admin = new Usuario(0, "Administrador", "Supremo","admin@naturecollection.com", "admin", [], [], true, true);
	agregarUsuario(admin);
	//---------------[Creacion de usuarios (Ejemplo)]---------------//
	let ale = new Usuario(1, "ALE", "CAROL","ale@ale.com", "12345", [], [], true, false);
	let mary = new Usuario(2, "MARY","BOSCH" ,"mary@mary.com", "65546", [], [], true, true);
	let silvia = new Usuario(3, "SILVIA", "SOSA", "silvia@silvia", "lalala", [], [], true, false);
	let lucas = new Usuario(4, "LUCAS", "RAMUNNI","lucas@lucas.com", "20565", [], [], true, true);
    let franco = new Usuario(5, "FRANCO", "LEIRO","franco@franco.com", "59842", [], [], true, false);
    // -------- [Agregamos usuarios (por instancias de objetos)] -------- //
	agregarUsuario(ale);
	agregarUsuario(mary);
	agregarUsuario(silvia);
	agregarUsuario(lucas);
	agregarUsuario(franco);
	// ---------- [Creacion de Productos (por instancias de objetos)] ---------- //
	let prod1 = new Producto(1, "prod uno", "ideal para los días mas fríos", "M", "https://via.placeholder.com/150/f66b97", 750, 3,"frio");
	let prod2 = new Producto(2, "prod dos", "ideal para primavera verano", "G", "https://via.placeholder.com/150/24f355", 1000, 4, "calor");
	let prod3 = new Producto(3, "prod tres",  "ideal para primavera verano", "U", "https://via.placeholder.com/150/771796", 1999,99, 3, "calor");
	let prod4 = new Producto(4, "prod cuatro","ideal para viajar en verano", "P", "https://via.placeholder.com/150/92c952", 999,9, 3, "viajar");
	let prod5 = new Producto(5, "prod cinco", "ideal para cada día", "M", "https://via.placeholder.com/150/f66b97", 799,99, 1, "todos_los_dias");
	let prod6 = new Producto(6, "prod seis","ideal para viajar cómoda", "M", "https://via.placeholder.com/150/771796", 850, 3, "viajar");
	// -------- [Agregamos Productos a la BD (por instancias de objetos)] -------- //
	agregarProducto(prod1);
	agregarProducto(prod2);
	agregarProducto(prod3);
	agregarProducto(prod4);
	agregarProducto(prod5);
	agregarProducto(prod6);
}

// -------------------- [actualiza totales del Carrito] -------------------- //
function actualizarTotalesCarrito() {
    document.getElementById("totalCarrito").innerHTML=totalARSCarrito.toFixed(2);
    document.getElementById("contador").innerHTML=contadorProdCarrito;
}

// -------------------- [actualiza totales del Carrito] -------------------- //
let botonVaciar = document.querySelector('#botonVaciar');
// Eventos
botonVaciar.addEventListener('click', vaciarCarrito);
function vaciarCarrito() {
    totalARSCarrito=0;
    contadorProdCarrito=0;
    console.log("VACIANDO CARRITO.................")                 //#### 4 TESTING PURPOSES ONLY ###
    actualizarTotalesCarrito();
};


// ----------------- [traemos productos del local Storage] ----------------- //          
function getProductos() {
    dbProductos=JSON.parse(localStorage.getItem("productos")) || [];
 }

// ---------------- [guardamos productos del local Storage] ---------------- //
/*function setLocalStorageProd () {
    localStorage.setItem('productos', JSON.stringify(dbProductos))
}*/


// -------------------- [mostrar tarjetas dinámicamente] ------------------- //
function mostrarTarjetas() {
   
    let tarjProd = document.getElementById("tarjetasProd");
    dbProductos.map(function(prod, index){
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
        console.log (`se cargó la tarjeta ${index}`)
        });
}

// ------- [vamos a poner en un array los codigo productos comprados] ------ //

//FUNCION COMPRAR PRODUCTO
comprarProd(0);

function comprarProd(i) {

    console.log (`VAMOS A COMPRAR ${i}`)
    //busco el prod en el array productos
    let prod = dbProductos[i];
    console.log(prod);

    //si hay al menos un prod entonces se puede vender 
    if (prod._stock >= 1) {
            console.log ("actualizamos stock")
            dbProductos[i].stock -= 1;
            arrayProdComprados.push(prod._codigo);
            console.log (`arrayProdComprados ---> ${arrayProdComprados}`);
            let idProd=prod._codigo;
            let nomProd=prod._nombre;
            let cantProd=1;
            let precioProd=prod._precio;

            let itemCompra = new ItemCarrito(idProd, nomProd, cantProd, precioProd);
            
            itemCompra._idProd=idProd;
            itemCompra._nomProd=nomProd;
            itemCompra._cantProd=cantProd;
            itemCompra._precioProd=precioProd;
            console.log ("itemCompra");
            
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
    alert (`Compra finalizada. ${contadorProdCarrito} prendas. Total a pagar $ ${totalARSCarrito}`)
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
        alert ("carrito vacio")
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