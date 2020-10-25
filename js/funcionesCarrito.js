import { ItemCarrito } from "./clases.js";
import { cargaInicialDatos } from "./funcionesAuxiliares.js";

// --------------------- [inicialización de variables] --------------------- //
let total=document.getElementById("totalCarrito");
let conta=document.getElementById("contador");
let totalARSCarrito=0, contadorProdCarrito=0;
let dbProductos=[];
let arrayProdComprados=[];
let carrito=[];
let mensajes=document.getElementById("mensajes");
let texto="" ;

// ------------------------ [llamada a funciones] -------------------------- //
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
mensajes.innerHTML="bienvenido"


// --- ###################### [F U N C I O N E S] ###################### --- //

// ------------- [carga inicial de datos PRODUCTOS Y USUARIOS] ------------- //
function cargaInicialDatos() {
    localStorage.clear();
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

	let prod1 = new Producto(1001, "Sweter", "ideal para los días más fríos", "M", "https://via.placeholder.com/150/f66b97", 750, 2,"frio");
	let prod2 = new Producto(1002, "Top", "ideal para días más cálidos", "S", "https://via.placeholder.com/150/24f355", 1000, 2, "calor");
	let prod3 = new Producto(1003, "Short de baño",  "para la piscina o la playa", "G", "https://via.placeholder.com/150/771796", 1810, 3, "calor");
	let prod4 = new Producto(1004, "bolso extensible","para todo lo que necesites llevar", "U", "https://via.placeholder.com/150/92c952", 999, 3, "viaje");
	let prod5 = new Producto(1005, "jeans", "jeans unisex negros", "M", "https://via.placeholder.com/150/f66b97", 876, 0, "todos_los_dias");
	let prod6 = new Producto(1006, "polar","polar gris", "U", "https://via.placeholder.com/150/771796", 850, 3, "frio");

	// -------- [Agregamos Productos a la BD (por instancias de objetos)] -------- //
    agregarProducto(prod1);
    agregarProducto(prod6);
	agregarProducto(prod2);
	agregarProducto(prod3);
	agregarProducto(prod4);
	agregarProducto(prod5);
	
} // FIN [carga inicial de datos PRODUCTOS Y USUARIOS]

// -------------------- [actualiza totales del Carrito] -------------------- //
function actualizarTotalesCarrito() { 
	total.innerHTML = totalARSCarrito.toFixed(2);
	conta.innerHTML = contadorProdCarrito;
} // FIN [actualiza totales del Carrito]

// ----------------------- [funcion vaciarCarrito] ----------------------- //
let botonVaciar = document.querySelector('#botonVaciar');
botonVaciar.addEventListener('click', vaciarCarrito);
function vaciarCarrito() {
    if (confirm("estas seguro?")) {
        totalARSCarrito=0;
        contadorProdCarrito=0;
        arrayProdComprados=[];
        carrito=[];
        actualizarTotalesCarrito();
        mensajes.innerHTML="carrito vacío"                 //#### 4 TESTING PURPOSES ONLY ###
    } else {
        mensajes.innerHTML="sigue comprando"                 //#### 4 TESTING PURPOSES ONLY ###
    }
}; // FIN [funcion vaciarCarrito]


// ----------------- [traemos dbProductos del localStorage] ----------------- //          
function getProductos() {
	console.log("dbProductos ACTUALIZADA");                             //#### 4 TESTING PURPOSES ONLY ###
	dbProductos = JSON.parse(localStorage.getItem("productos")) || [];
} // FIN [traemos dbProductos del localStorage]

// ----------------- [guardamos productos del localStorage] ---------------- //
function setProductos () {
    console.log("localStorage productos ACTUALIZADOS");                 //#### 4 TESTING PURPOSES ONLY ###
    localStorage.setItem('productos', JSON.stringify(dbProductos));
} // FIN [guardamos productos del localStorage]


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
} // FIN [mostrar tarjetas dinámicamente]

// -------------------------- [agregarCarrito] -------------------------- // 
function agregarCarrito(producto) {
	let productosAgregados = [];
	//-- Verificamos si existe key='productosCarrito' en localStorage --//
	productosAgregados = JSON.parse(localStorage.getItem("productosCarrito")) || [] ;
	productosAgregados.push(producto);
	localStorage.setItem("productosCarrito", JSON.stringify(productosAgregados));
} // FIN [agregarCarrito]

// ----------------- [traemos Carrito del localStorage] ----------------- //          
function getCarrito() {
    carrito=JSON.parse(localStorage.getItem("productosCarrito")) || [];
    console.log("paso por getCarrito");                                 //#### 4 TESTING PURPOSES ONLY ###
    console.log(carrito);                                               //#### 4 TESTING PURPOSES ONLY ###
 } // FIN [traemos Carrito del localStorage] 

// ---------------- [guardamos Carrito al localStorage] ---------------- //
function setCarrito() {
    localStorage.setItem('productosCarrito', JSON.stringify(carrito));
} // FIN [guardamos Carrito al localStorage]

// -------------------- [funcion comprarProducto] -------------------- //
window.comprarProd= function (i) {
    
    //busco el prod en la bdProductos por posicion
    let prod = dbProductos[i];
                       
    //si hay al menos un producto en stock, se puede vender 
    if (prod._stock >= 1) {
        //actualizamos stock, dbProductos y localStorage
        dbProductos[i]._stock -= 1;
        setProductos();
        getProductos();
        //
        arrayProdComprados.push(prod._codigo);
        console.log (`arrayProdComprados ---> ${arrayProdComprados}`); //#### 4 TESTING PURPOSES ONLY ###
        //
        let idProd=prod._codigo;
        let nomProd=prod._nombre;
        let cantProd=1;
        let precioProd=prod._precio;
        let itemCompra = new ItemCarrito(idProd, nomProd, cantProd, precioProd);
        
        itemCompra._idProd=idProd;
        itemCompra._nomProd=nomProd;
        itemCompra._cantProd=cantProd;
        itemCompra._precioProd=precioProd;

        agregarCarrito(itemCompra);
        getCarrito();
        alert(`Se ha añadido un producto al carrito`)   //#### 4 TESTING PURPOSES ONLY ###

        // -- suma de precios y cantidad de productos comprados --/
        totalARSCarrito += prod._precio;
        contadorProdCarrito += 1;
        actualizarTotalesCarrito() ;

    } else {
            alert(`ooops nos quedamos sin ${prod._nombre}`);
    }
} // FIN [funcion comprarProducto]


// -------------------------- [finalizar compra] --------------------------- //
let botonFinalizar = document.querySelector('#botonFinalizar');
botonFinalizar.addEventListener('click', finalizarCompra);   
 function finalizarCompra() {
    actualizarTotalesCarrito();
    //alert (`Compra finalizada. ${contadorProdCarrito} prendas. Total a pagar $ ${totalARSCarrito}`);
    if (autenticado=="true") {
        alert("usuario autenticado");
    } else {
        alert ("usuario NO autenticado");
    }
    
    // -- actualizar usuarios.odigosProductos[]  con arrayProdComprados --/
    // llamar a getUsuario(cod) 
} // FIN [finalizar compra]


// ------------------- [buscar texto en dbProductos] ------------------- //
texto=document.getElementById("texto").value
window.buscarTexto = function() {
    getProductos();
    mensajes.innerHTML= `buscando ${texto}....`;
    
    let productosTexto = dbProductos.filter (p => {
        return ((p._categoria.includes(texto) || p._nombre.includes(texto)) || p._descripcion.includes(texto))
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
    document.getElementById("texto").value="";    
} // FIN [buscar texto en dbProductos]


// ------------------- [filtrar productos por categoria] ------------------- //
window.filtrarProductos = function(cat) {
    getProductos();
    mensajes.innerHTML= `buscando ${cat}....`;
    
    let productosXcat = dbProductos.filter (p=> {
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
            mensajes.innerHTML= "se encontraron los siguientes productos para la categoría ";  
        } else {
            mensajes.innerHTML= "no se encontraron productos para la categoría ";  
        }
} // FIN [filtrar productos por categoria]


// --------------------------- [listar carrito] ---------------------------- //
const btnListarCarrito = document.querySelector('#listarCarrito');
btnListarCarrito.addEventListener('click', listarCarrito);

function listarCarrito() {
    if (carrito.length > 0)  {
        let items = document.getElementById("items");
        carrito.map (function (p,i) {
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
    
    } else {
        alert ("carrito vacio");
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
} // FIN [borra item del carrito]
    