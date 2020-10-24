import { ItemCarrito } from "./clases.js";
import { cargaInicialDatos } from "./funcionesAuxiliares.js";

// --------------------- [inicialización de variables] --------------------- //
let total=document.getElementById("totalCarrito");
let conta=document.getElementById("contador");
let totalARSCarrito=0, contadorProdCarrito=0;
let dbProductos=[];
let arrayProdComprados=[];
let carrito=[];


// ------------------------ [llamada a funciones] -------------------------- //
cargaInicialDatos();
getProductos();
console.log(dbProductos);                                            //#### 4 TESTING PURPOSES ONLY ###
actualizarTotalesCarrito();
mostrarTarjetas();

// ----------- [usuarioAutenticado (true/false) en localStorage] ----------- //
//localStorage.setItem("usuarioAutenticado", false);
//lo ponemos en true para que entre siempre                          #### 4 TESTING PURPOSES ONLY ###
localStorage.setItem("usuarioAutenticado", true);
let autenticado = localStorage.getItem("usuarioAutenticado");          // ### OJO QUE ES STRING ### //
console.log(`valor autenticado ${autenticado} indica si un usuario esta logueado `);


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

	let prod1 = new Producto(1001, "prod uno", "ideal para primavera verano", "M", "https://via.placeholder.com/150/f66b97", 750, 2,"frio");
	let prod2 = new Producto(1002, "prod dos", "ideal para primavera verano", "G", "https://via.placeholder.com/150/24f355", 1000, 2, "calor");
	let prod3 = new Producto(1003, "prod tres",  "ideal para primavera verano", "U", "https://via.placeholder.com/150/771796", 1810, 3, "calor");
	let prod4 = new Producto(1004, "prod cuatro","ideal para primavera verano", "P", "https://via.placeholder.com/150/92c952", 999, 3, "calor");
	//let prod5 = new Producto(1005, "prod cinco", "ideal para primavera verano", "M", "https://via.placeholder.com/150/f66b97", 876, 0, "todos_los_dias");
	//let prod6 = new Producto(1006, "prod seis","ideal para primavera verano", "M", "https://via.placeholder.com/150/771796", 850, 3, "frío");

	// -------- [Agregamos Productos a la BD (por instancias de objetos)] -------- //
	agregarProducto(prod1);
	agregarProducto(prod2);
	agregarProducto(prod3);
	agregarProducto(prod4);
	// agregarProducto(prod5);
	// agregarProducto(prod6);
}

// -------------------- [actualiza totales del Carrito] -------------------- //
function actualizarTotalesCarrito() {
	console.log("PASA POR ACTUALIZAR TOTALES");
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
    alert("VACIANDO CARRITO.................")                 //#### 4 TESTING PURPOSES ONLY ###
};


// ----------------- [traemos dbProductos del localStorage] ----------------- //          
function getProductos() {
	console.log("db productos ACTUALIZADOS");                //#### 4 TESTING PURPOSES ONLY ###
	dbProductos = JSON.parse(localStorage.getItem("productos")) || [];
}

// ---------------- [guardamos productos del localStorage] ---------------- //
function setProductos () {
    console.log("local storage productos ACTUALIZADOS");                //#### 4 TESTING PURPOSES ONLY ###
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
                  <p id="categoriaProducto">lala</p>
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
	//-- Verificamos si existe la key 'productos' en LocalStorage
	productosAgregados = JSON.parse(localStorage.getItem("productosCarrito")) || [] ;
	productosAgregados.push(producto);
	localStorage.setItem("productosCarrito", JSON.stringify(productosAgregados));
}

// ----------------- [traemos Carrito del localStorage] ----------------- //          
function getCarrito() {
    carrito=JSON.parse(localStorage.getItem("productosCarrito")) || [];
    console.log("paso por getCarrito");                //#### 4 TESTING PURPOSES ONLY ###
    console.log(carrito);
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
        alert(`Se ha añadido un item al carrito y carrito.- ${carrito}`)   //#### 4 TESTING PURPOSES ONLY ###

        //en totalCompra sumo los importes de los prod comprados
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
const btnListarCarrito = document.querySelector('#listarCarrito');
btnListarCarrito.addEventListener('click', listarCarrito);

function listarCarrito() {
    if (carrito.length > 0)  {
        console.log (`CARRITO.LENGHT = ${carrito.lenght}`)
    
        let items = document.getElementById("items");
        carrito.map (function (p,i) {
        let linea = ` 
        <tr>
            <th scope="row">${i + 1}</th>
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
    console.log("entra en borrarItem los valores de idP e i son:");
    console.log(idP, i);
    getCarrito();
    console.log("carrito es:");
    console.log(carrito);

    let prodBorrar = carrito.find(itemC => {
       return itemC._idProd === idP
    });
    console.log(`"voy a borrar:"   ${prodBorrar._idProd}`)

    
    // -- [actualizamos los totales del Carrito] --/
    totalARSCarrito-=prodBorrar._precioProd;
    contadorProdCarrito-=1;

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
    
      