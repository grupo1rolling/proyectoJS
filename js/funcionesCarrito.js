import { ItemCarrito } from "./clases.js";
import { cargaInicialDatos } from "./funcionesAuxiliares.js";
import { getAllUsuarios } from "./funcionesUsuarios.js";

// --------------------- [inicialización de variables] --------------------- //
let total = document.getElementById("totalCarrito");
let conta = document.getElementById("contador");
let totalARSCarrito = 0, contadorProdCarrito = 0;
let dbProductos = [];
let dbUsuarios;
let usuario;
let arrayProdComprados = [];
let carrito = [];
let texto = "";
let usuarioLog = {
    idUsuario: "",
    autenticado: "false",
};


// ------------------------ [llamada a funciones] -------------------------- //
cargaInicialDatos();
getProductos();
actualizarTotalesCarrito();
mostrarTarjetas();

// --- ###################### [F U N C I O N E S] ###################### --- //

// -------------------- [actualiza totales del Carrito] -------------------- //
function actualizarTotalesCarrito() {
	total.innerHTML = totalARSCarrito.toFixed(2);
	conta.innerHTML = contadorProdCarrito;
} // fin actualizarTotalesCarrito


// ------------------------ [funcion vaciarCarrito] ------------------------ //
let botonVaciar = document.querySelector('#botonVaciar');
botonVaciar.addEventListener('click', vaciarCarrito);
function vaciarCarrito() {
	if (confirm("estas seguro?")) {
		totalARSCarrito = 0;
		contadorProdCarrito = 0;
		arrayProdComprados = [];
		carrito = [];
		actualizarTotalesCarrito();
		alert("carrito vacío");                                         //#### 4 TESTING PURPOSES ONLY ###
	} else {
		alert ("sigue comprando");                                      //#### 4 TESTING PURPOSES ONLY ###
	}
}; // fin vaciarCarrito


// ----------------- [traemos dbProductos de localStorage] ----------------- //          
function getProductos() {
    dbProductos = JSON.parse(localStorage.getItem("productos")) || [];
} // fin getProductos


// ----------------- [guardamos productos del localStorage] ---------------- //
function setProductos() {
	localStorage.setItem('productos', JSON.stringify(dbProductos));
} // fin setProductos


// ----------------- [buscamoos el usuario en dbUsuarios] ------------------ //
function buscarUsuario(idUser) {
    dbUsuarios = getAllUsuarios();
    dbUsuarios.find(item => {
		return (item._codigo == idUser) ;
	});
} // fin buscarUsuario


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
                  <p id="categoriaProducto">${prod._categoria}</p>
                </div>
                <div class="card-footer">
                <a href="#" class="btn btn-green mt-3" id="botonComprar" onclick="comprarProd(${index})">Añadir al carro</a>
                </div>
              </div>       
            `;
		tarjProd.innerHTML += tarjeta;
	});
} // fin mostrarTarjetas


// --------------------- [agrega productos al Carrito] --------------------- //
function agregarCarrito(producto) {
	let productosAgregados = [];
	//-- Verificamos si existe key='productosCarrito' en localStorage --//
	productosAgregados = JSON.parse(localStorage.getItem("productosCarrito")) || [];
	productosAgregados.push(producto);
	localStorage.setItem("productosCarrito", JSON.stringify(productosAgregados));
} // fin agregarCarrito


// ------------------- [traemos Carrito de localStorage] ------------------- //          
function getCarrito() {
	carrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];
} // getCarrito


// ------------------ [guardamos Carrito al localStorage] ------------------ //
function setCarrito() {
	localStorage.setItem('productosCarrito', JSON.stringify(carrito));
} // fin setCarrito


// ----------------- [verificamos si hay usuario logueado] ----------------- //
function verificaUsuarioLog() {
    // -- vemos si hay un usuario logueado
    usuarioLog = JSON.parse(localStorage.getItem("log")) || [];
    console.warn(usuarioLog.autenticado);

    if (usuarioLog.autenticado ==="true") {
    alert ("usuario autenticado");
    return true;
    } else {
        alert ("usuario NO autenticado");
        //location = "http://127.0.0.1:5500/html/login.html";
    } 
} // fin verificaUsuarioLog

// ----------------------- [funcion comprarProducto] ----------------------- //
window.comprarProd = function (i) {
    let logueado=verificaUsuarioLog();
    console.warn(logueado);                                             //#### 4 TESTING PURPOSES ONLY ###

	//buscamos el producto en la bdProductos por posicion
	let prod = dbProductos[i];
	//si hay al menos un producto en stock, se puede vender 
	if (prod._stock >= 1) {
		//actualizamos stock, dbProductos y localStorage
		dbProductos[i]._stock -= 1;
		setProductos();
		getProductos();
		//guardamos en un array los productos comprados 
		arrayProdComprados.push(prod._codigo);
		//armamos el objeto itemCarrito para carrito[]
		let idProd = prod._codigo;
		let nomProd = prod._nombre;
		let cantProd = 1;
		let precioProd = prod._precio;
		let itemCompra = new ItemCarrito(idProd, nomProd, cantProd, precioProd);
		itemCompra._idProd = idProd;
		itemCompra._nomProd = nomProd;
		itemCompra._cantProd = cantProd;
		itemCompra._precioProd = precioProd;
        //agregamos el item al carrito
		agregarCarrito(itemCompra);
		getCarrito();
		alert(`Se ha añadido un producto al carrito`)                   //#### 4 TESTING PURPOSES ONLY ###
		//actualizamos cantidad de producto y total compra 
		totalARSCarrito += prod._precio;
		contadorProdCarrito += 1;
		actualizarTotalesCarrito();
	} else {
		alert(`ooops nos quedamos sin ${prod._nombre}`);
	}
} // fin comprarProd


// -------------------------- [finalizar compra] --------------------------- //
let botonFinalizar = document.querySelector('#botonFinalizar');
botonFinalizar.addEventListener('click', finalizarCompra);   
function finalizarCompra() {
    actualizarTotalesCarrito();
    alert (`Compra finalizada. ${contadorProdCarrito} prendas. Total a pagar $ ${totalARSCarrito}`);
    // -- quitamos duplicados del arrayProdComprados
    console.log(arrayProdComprados);
    let sinRepes = new Set(arrayProdComprados);
    let codigosProductos= [...sinRepes];
    console.log(codigosProductos);
    /*
    // -- actualizar usuarios.codigosProductos[]  
    usuario = buscarUsuario(usuarioLog.idUsuario);
    codigosProductos.forEach(elem => {
        usuarios._codigosProductos.push(elem);
    });
    // -- actualizamos el localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuariosArray));
    */

} // fin finalizarCompra


// --------------------- [buscar texto en dbProductos] --------------------- //
texto=document.getElementById("texto").value;
console.log(texto);

window.buscarTexto = function() {
    getProductos();
        
    const productosTexto = dbProductos.filter (pT => {
        return ((pT._categoria.includes(texto) || pT._nombre.includes(texto)) || pT._descripcion.includes(texto));
    });
    console.log(productosTexto);                                          //#### 4 TESTING PURPOSES ONLY ###
    
    //let tarjetasTex = document.getElementById("tarjetasProd");
    let tarjetasTex=document.getElementById("tarjetasProd");
    
    if (productosTexto != []) {
        productosTexto.map(function (pt, indt) {
            let tarjetaTex = `
                <div class="card">
                <img id="fotoProducto" src=${pt._foto} class="card-img-top" alt="top-estampa-cactus">
                <div class="card-body">
                  <h5 id="nombreProducto" class="card-title">${pt._nombre}</h5>
                  <p id="precioProducto">${pt._precio}</p>
                  <p id="descripcionProducto"class="card-text">
                  ${pt._descripcion}
                  </p>
                  <p id="talleProducto">${pt._talle}</p>
                  <p id="categoriaProducto">${pt._categoria}</p>
                </div>
                <div class="card-footer">
                <a href="#" class="btn btn-green mt-3" id="botonComprar" onclick="comprarProd(${indt})">Añadir al carro</a>
                </div>
              </div>       
            `;
            tarjetasTex.innerHTML += tarjetaTex;
            });
            console.log("se encontraron los productos ");
        } else {
            console.warn ("no se encontraron productos con el texto buscado ");  
        }
} // fin buscarTexto


// ------------------- [filtrar productos por categoria] ------------------- //
window.filtrarProductos = function (cat) {
	getProductos();
    console.log(dbProductos);
	const productosPorCat = dbProductos.filter(pC => {
		return (pC._categoria === cat);
	});
	console.log(productosPorCat);                                          //#### 4 TESTING PURPOSES ONLY ###

	let tarjetasCat = document.getElementById("tarjetasProd");
	if (productosPorCat.length > 0) {

		productosPorCat.map(function (pc, ic) {
			let tarjetaCat = `
                <div class="card">
                <img id="fotoProducto" src=${pc._foto} class="card-img-top" alt="top-estampa-cactus">
                <div class="card-body">
                  <h5 id="nombreProducto" class="card-title">${pc._nombre}</h5>
                  <p id="precioProducto">${pc._precio}</p>
                  <p id="descripcionProducto"class="card-text">
                  ${pc._descripcion}
                  </p>
                  <p id="talleProducto">${pc._talle}</p>
                  <p id="categoriaProducto">${pc._categoria}</p>
                </div>
                <div class="card-footer">
                <a href="#" class="btn btn-green mt-3" id="botonComprar" onclick="comprarProd(${ic})">Añadir al carro</a>
                </div>
              </div>       
            `;
			tarjetasCat.innerHTML += tarjetaCat;
		});
		console.log = "se encontraron los siguientes productos para la categoría ";
	} else {
		console.warn = "no se encontraron productos para la categoría ";
	}
} // fin filtrarProd


// --------------------------- [listar carrito] ---------------------------- //
const btnListarCarrito = document.querySelector('#listarCarrito');
btnListarCarrito.addEventListener('click', listarCarrito);

function listarCarrito() {
	if (carrito.length > 0) {
		let items = document.getElementById("items");
		carrito.map(function (p, i) {
			let linea = ` 
        <tr>
            <td scope="row" id="fila">${i + 1}</td>
            <td class="text-center">${p._cantProd}</td>
            <td class="text-left">${p._nomProd}</td>
            <td class="text-rigth">${p._precioProd.toFixed(2)}</td>
            <td align="center"><button id="btnBorrarItem" 
                title="eliminar producto" 
                type="button" class="btn btn-outline-danger btn-sm"
                onclick="borrarItem(${p._idProd},${i})">
                <i class="fa fa-window-close-o">
                </i>
                </button>
            </td>
        </tr>`
			items.innerHTML += linea;
		});
		let t = document.getElementById("totales");
		t.innerHTML = totalARSCarrito.toFixed(2);
	} else {
		alert("carrito vacio");
	}
} // fin listarCarrito 


// ------------------------ [borra item del carrito] ------------------------ //
 window.borrarItem = function (idP,i) {
    let fila=document.getElementById("fila").childElementCount;
    
    // borramos la fila con el producto que quitamos
    let elemTabla = document.getElementById('items');
    let tablaFila = elemTabla.getElementsByTagName('tr');
    elemTabla.removeChild(tablaFila[fila]);
    //
    getCarrito();
    //
    let prodBorrar = carrito.find(itemC => {
       return itemC._idProd === idP
    });
    console.log(`"voy a borrar:"   ${prodBorrar._idProd}`)

    
    // -- [actualizamos los totales del Carrito] --/
    totalARSCarrito-=prodBorrar._precioProd;
    contadorProdCarrito-=1;
    actualizarTotalesCarrito();
    // -- [lo quitamos del arreglo de productos comprados y del carrito] --/
    arrayProdComprados.splice(i,1);
    carrito.splice(i,1);   
    setCarrito();

    // -- [actualizamos dbProductos] --/
    getProductos();
    let indice = dbProductos.findIndex (itemP => {
        return itemP._codigo === idP
    });
    dbProductos[indice]._stock +=1;
    setProductos();

    let t=document.getElementById("totales");
        t.innerHTML=totalARSCarrito.toFixed(2);
} // fin borrarItem
