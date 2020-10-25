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

// -------------------- [actualiza totales del Carrito] -------------------- //
function actualizarTotalesCarrito() {
	console.log("PASA POR ACTUALIZAR TOTALES");                                //#### 4 TESTING PURPOSES ONLY ### 
	total.innerHTML = totalARSCarrito.toFixed(2);
	conta.innerHTML = contadorProdCarrito;
}

// ----------------------- [funcion vaciarCarrito] ----------------------- //
let botonVaciar = document.querySelector('#botonVaciar');
botonVaciar.addEventListener('click', vaciarCarrito);
//
function vaciarCarrito() {
    totalARSCarrito=0;
    contadorProdCarrito=0;
    arrayProdComprados=[];
    carrito=[];
    actualizarTotalesCarrito();
    console.log("VACIANDO CARRITO.................")                    //#### 4 TESTING PURPOSES ONLY ###
};


// ----------------- [traemos dbProductos del localStorage] ----------------- //          
function getProductos() {
	console.log("dbProductos ACTUALIZADA");                             //#### 4 TESTING PURPOSES ONLY ###
	dbProductos = JSON.parse(localStorage.getItem("productos")) || [];
}

// ---------------- [guardamos productos del localStorage] ---------------- //
function setProductos () {
    console.log("localStorage productos ACTUALIZADOS");                 //#### 4 TESTING PURPOSES ONLY ###
    localStorage.setItem('productos', JSON.stringify(dbProductos));
}


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
}

function agregarCarrito(producto) {
	let productosAgregados = [];
	//-- Verificamos si existe key='productosCarrito' en localStorage --//
	productosAgregados = JSON.parse(localStorage.getItem("productosCarrito")) || [] ;
	productosAgregados.push(producto);
	localStorage.setItem("productosCarrito", JSON.stringify(productosAgregados));
}

// ----------------- [traemos Carrito del localStorage] ----------------- //          
function getCarrito() {
    carrito=JSON.parse(localStorage.getItem("productosCarrito")) || [];
    console.log("paso por getCarrito");                                 //#### 4 TESTING PURPOSES ONLY ###
    console.log(carrito);                                               //#### 4 TESTING PURPOSES ONLY ###
 }

// ---------------- [guardamos Carrito al localStorage] ---------------- //
function setCarrito() {
    localStorage.setItem('productosCarrito', JSON.stringify(carrito));
}

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
}


// -------------------------- [finalizar compra] --------------------------- //
let botonFinalizar = document.querySelector('#botonFinalizar');
botonFinalizar.addEventListener('click', finalizarCompra);   
 function finalizarCompra() {
    actualizarTotalesCarrito();
    alert (`Compra finalizada. ${contadorProdCarrito} prendas. Total a pagar $ ${totalARSCarrito}`);
    // -- actualizar usuarios.odigosProductos[]  con arrayProdComprados --/
    // llamar a getUsuario(cod) 
}



// ------------------- [buscar texto en dbProductos] ------------------- //

texto=document.getElementById("texto").value

window.buscarTexto = function() {
    getProductos();
    mensajes.innerHTML= `buscando ....`;
    
    let productosTexto = dbProductos.find (p => {
        return ((p._categoria.includes(texto) || p._nombre.includes(texto)) || p._descripcion.includes(texto))
    });
    console.log(productosTexto);                                          //#### 4 TESTING PURPOSES ONLY ###
    
    let tarjetasProd = document.getElementById("tarjetasProd");
    
    if (productosTexto.lenght>0) {
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
}



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
}


// --------------------------- [listar carrito] ---------------------------- //
const btnListarCarrito = document.querySelector('#listarCarrito');
btnListarCarrito.addEventListener('click', listarCarrito);

function listarCarrito() {
    if (carrito.length > 0)  {
        console.log (`CARRITO.LENGHT = ${carrito.lenght}`)
    
        let items = document.getElementById("items");
        carrito.map (function (p,i) {
        let linea = ` 
        <tr>
            <th scope="row" id="fila">${i + 1}</th>
            <td>${p._idProd}</td>
            <td>${p._nomProd}</td>
            <td>${p._precioProd}</td>
            <td><button id="btnBorrarItem" 
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
} // FIN listarCarrito()



// ------------------------ [borra item del carrito] ------------------------ //
 window.borrarItem = function (idP,i) {
    let fila=document.getElementById("fila").childElementCount;
    console.log(`CONTENIDO DE FILA --->${fila}`)
    // borramos la fila con el producto que quitamos
    let elemTabla = document.getElementById('items');
    let tablaFila = elemTabla.getElementsByTagName('tr');
    elemTabla.removeChild(tablaFila[fila]);
    //
   
    console.log("entra en borrarItem los valores de idP e i son:");             //#### 4 TESTING PURPOSES ONLY ###
    console.log(idP, i);                                                        //#### 4 TESTING PURPOSES ONLY ###
    getCarrito();
    console.log("carrito es:");                                                  //#### 4 TESTING PURPOSES ONLY ###
    console.log(carrito);                                                         //#### 4 TESTING PURPOSES ONLY ###

    let prodBorrar = carrito.find(itemC => {
       return itemC._idProd === idP
    });
    console.log(`"voy a borrar:"   ${prodBorrar._idProd}`)

    
    // -- [actualizamos los totales del Carrito] --/
    totalARSCarrito-=prodBorrar._precioProd;
    contadorProdCarrito-=1;
    actualizarTotalesCarrito();
    // -- [lo quito del arreglo de productos comprados y del carrito] --/
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
}
    