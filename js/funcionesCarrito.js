import { ItemCarrito } from "./clases.js";
import { cargaInicialDatos } from "./funcionesAuxiliares.js";
<<<<<<< HEAD

=======
>>>>>>> sil

// --------------------- [inicialización de variables] --------------------- //
let total = document.getElementById("totalCarrito");
let conta = document.getElementById("contador");
let totalARSCarrito = 0, contadorProdCarrito = 0;
let dbProductos = [];
let arrayProdComprados = [];
let carrito = [];
let texto = "";
let usuarioLog = {
    idUsuario: "",
    autenticado: "false",
};
//
let mensajes = document.getElementById("mensajes");

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
} // sin agregarCarrito

// ------------------- [traemos Carrito de localStorage] ------------------- //          
function getCarrito() {
	carrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];
} // getCarrito

// ------------------ [guardamos Carrito al localStorage] ------------------ //
function setCarrito() {
	localStorage.setItem('productosCarrito', JSON.stringify(carrito));
} // fin setCarrito

// ----------------------- [funcion comprarProducto] ----------------------- //
window.comprarProd = function (i) {
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
} // fin comprarProducto


// -------------------------- [finalizar compra] --------------------------- //
let botonFinalizar = document.querySelector('#botonFinalizar');
botonFinalizar.addEventListener('click', finalizarCompra);   
function finalizarCompra() {
    
    actualizarTotalesCarrito();
    //vemos si hay un usuario logueado
    usuarioLog = JSON.parse(localStorage.getItem("log"));
    console.warn(usuarioLog);
    /*
    if (usuarioLog.autenticado =='true') {
        alert (`Usuario autenticado. Compra finalizada. ${contadorProdCarrito} prendas. Total a pagar $ ${totalARSCarrito}`);
        } else {
            alert ("usuario NO autenticado");
            location = "../index.html";
        }
    //location = "index.html"; "./clases.js"
    // -- actualizar usuarios.codigosProductos[]  con arrayProdComprados --/
        */
    //quitamos duplicados del arrayProdComprados
    console.log(arrayProdComprados);
    let sinRepes = new Set(arrayProdComprados);
    let productosUsuario= [...sinRepes];
    console.log(productosUsuario);

} // FIN [finalizar compra]


// --------------------- [buscar texto en dbProductos] --------------------- //
texto=document.getElementById("texto").value;

console.log(texto);

window.buscarTexto = function() {
    getProductos();
    mensajes.innerHTML= `buscando ${texto}....`;
    
    let productosTexto = dbProductos.filter (pp => {
        return ((pp._categoria.includes(texto) || pp._nombre.includes(texto)) || pp._descripcion.includes(texto))
    });
    console.log(productosTexto);                                          //#### 4 TESTING PURPOSES ONLY ###
    
    let tarjetasProd = document.getElementById("tarjetasProd");
    
    if (productosTexto != []) {
        productosTexto.map(function (prod, index) {
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
            tarjetasProd.innerHTML += tarjeta;
            });
        mensajes.innerHTML= "se encontraron los siguientes productos ";
        } else {
            mensajes.innerHTML= "no se encontraron productos con el texto buscado ";  
        }
   // document.getElementById("texto").value="";    
} // FIN [buscar texto en dbProductos]


// ------------------- [filtrar productos por categoria] ------------------- //
window.filtrarProductos = function (cat) {
	getProductos();
	mensajes.innerHTML = `buscando ${cat}....`;

	let productosXcat = dbProductos.filter(p => {
		return p._categoria === cat
	});
	console.log(productosXcat);                                          //#### 4 TESTING PURPOSES ONLY ###

	let tarjetasProd = document.getElementById("tarjetasProd");
	if (productosXcat.length > 0) {

		productosXcat.map(function (prod, index) {
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
			tarjetasProd.innerHTML += tarjeta;
		});
		mensajes.innerHTML = "se encontraron los siguientes productos para la categoría ";
	} else {
		mensajes.innerHTML = "no se encontraron productos para la categoría ";
	}
} // FIN [filtrar productos por categoria]


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
} // FIN [listar carrito] 



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
} // FIN [borra item del carrito]
