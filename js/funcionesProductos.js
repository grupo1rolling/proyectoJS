import { Producto } from "./clases.js";

export function agregarProducto(producto) {
	let productosArray = [];

	//-- Verificamos si existe la key 'productos' en LocalStorage
	//-- Si existe y tiene productos, capturo la informacion en un array

	productosArray =
		JSON.parse(localStorage.getItem("productos")) || [];

	//-- Verifico si ya existe el codigo de producto ingresado
	let existeProducto = productosArray.find(function (item) {
		return item._codigo == producto.codigo ? true : false;
	});

	if (existeProducto) {
		//console.log("Producto repetido");
	} else {
		productosArray.push(producto);
		localStorage.setItem("productos", JSON.stringify(productosArray));
	}
}

// Muestro los productos de un usuario, consultando al LocalStorage
export function mostrarProductosUsuario(usuario) {
	//-- Capturo todos los codigos de los productos que contiene el usuario
	let codProductos = usuario.codigosProductos;

	//-- Capturo el listado de todos los productos almacenados en LocalStorage
	let productosJSON = JSON.parse(localStorage.getItem("productos"));

	//-- Si existen productos en LocalStorage, realizo la busqueda de los codigos de productos del usuario
	if (productosJSON) {
		let productosFiltrados = [];
		// let totalProducto = []; //Variable donde se guarda un arreglo de los productos del usuario

		//Agregado Pablo----------Variable que suma el total del precio de los productos
		let sumaTotalPagar = 0;
		//-----------------------

		codProductos.map(function (item) {
			productosFiltrados = productosJSON.find(function (item2) {
				return item2._codigo == item && item2;
			});

			//Agregado Pablo------Agrego los productos al arreglo
			// totalProducto.push(productosFiltrados);

			sumaTotalPagar += productosFiltrados._precio;

			//----------------------------

			if (productosFiltrados) {
				console.log(productosFiltrados._nombre, `$${productosFiltrados._precio}`);
			}
		});

		// Agregado Pablo--------Calculo el valor total a pagar
		// totalProducto.map(function (produc) {
		// 	suma += produc.precio;
		// });
		console.log(`Total a pagar $${sumaTotalPagar}`);
		//---------------------------------
	}
}

export function getProductos() {
	//-- Capturo el listado de todos los Productos almacenados en LocalStorage
	let productosJSON = JSON.parse(localStorage.getItem("productos"));
	return productosJSON;
}

export function mostrarProductos() {
	let contenedor = document.getElementById("productosDetalle");
	contenedor.innerHTML = "";

	getProductos().map(function (item) {
		let stockIndicador = '';

		if (item._stock == 0) {
			stockIndicador = 'text-danger';
		}

		if (item._stock > 0 && item._stock <= 5) {
			stockIndicador = 'text-warning';
		}

		if (item._stock > 5) {
			stockIndicador = 'text-success';
		}

		let detalle = `
			<tr>
				<th scope="row" class="">${item._codigo}</th>
					<td class="">${item._nombre}</td>
					<td class="text-center">${item._talle}</td>
					<td class="text-center">${item._foto}</td>
					<td class="text-center">$ ${item._precio}</td>
					<td class="text-center ${stockIndicador}"> <b>${item._stock}</b></td>
					<td class="text-center"> <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modificaProducto">
					Modificar</button> </td>	
					<td class="text-center"><button type="button" id="btnBaja" class="btn btn-danger btn-sm">X</button></td>
			</tr>
		  `;

		contenedor.innerHTML += detalle;
	});
}


// ################################################################################# //
// ---------- [Obtenemos los datos del Formulario de ALTA de Productos ] ---------- //
/*
let dbProductos = [];
document.getElementById("formAltaProd");

document.addEventListener("submit", function (event) {
	event.preventDefault();
	console.log("Hizo submit");
	dbProductos = JSON.parse(localStorage.getItem("productos")) || [];

	let codigo = document.getElementById("codigo").value.toUpperCase();
	let nombreProd = document.getElementById("nombreProd").value.toUpperCase();
	let talle = document.getElementById("talle");
	let talleSeleccionado = talle.options[talle.selectedIndex].value;
	//foto del producto
	//Llamamos a la funcion (VIF) cuando se hace clic en seleccionar archivo y este cambia
	// NO SE SI AQUI O AFUERA
	let fileUpload = document.getElementById("file-upload");
	fileUpload.onchange = function (e) {
		readFile(e.srcElement);
	};

	let stock = parseInt(document.getElementById("stock").value);
	let precio = parseFloat(document.getElementById("precio").value);

	let categoria = document.getElementById("categoria");
	let catSeleccionada = categoria.options[categoria.selectedIndex].value;
	//creamos INSTANCIA DEL PRODUCTO
	producto = new Producto(codigo, nombre, descripcion, talle, foto, stock, precio, categoria);
	//inicializamos INSTANCIA PRODUCTO
	producto.codigo = codigo;
	producto.nombre = nombreProd;
	producto.descripcion = descripcion;
	producto.talle = talleSeleccionado;
	producto.foto = fotoData;
	producto.stock = stock;
	producto.precio = precio;
	producto.categoria = catSeleccionada;
	//agregarProducto(producto);
	dbProductos.push({ producto });
	localStorage.setItem("productos", JSON.stringify(dbProductos));
	limpiarFormAltaProd();
});
*/
// ---------- [Limpiamos el Formulario de Alta de Productos ] ---------- //
// funcion flecha equivalete function limpiarFormAltaProd() {}
const limpiarFormAltaProd = () => {
	document.getElementById("codigo").value = "";
	document.getElementById("nombreProd").value = "";
	document.getElementById("descripcion").value = "";
	document.getElementById("talle").value = "";
	imagenData = "";
	fileUpload.value = "";
	document.getElementById("stock").value = "";
	document.getElementById("precio").value = "";
	document.getElementById("categoria").value = "";
};


// ################################################################################# //
// ---------- [Obtenemos los datos del Formulario de MODIFICACION de Productos ] ---------- //
/*
let dbProductos=[];
	document.getElementById("formModiProd");
	document.addEventListener("submit", function (event) {
		event.preventDefault();
		console.log("Hizo submit");
		dbProductos = JSON.parse(localStorage.getItem("productos")) || [];
		
		let nombreProd = document.getElementById("nombreProd").value.toUpperCase();
		let talle = document.getElementById("talle");
		let talleSeleccionado = talle.options[talle.selectedIndex].value;
		//foto del producto
		//Llamamos a la funcion (VIF) cuando se hace clic en seleccionar archivo y este cambia
		// NO SE SI AQUI O AFUERA
		let fileUpload = document.getElementById("file-upload");
		fileUpload.onchange = function (e) {
		readFile(e.srcElement);
		};

		let stock = parseInt(document.getElementById("stock").value);
		let precio = parseFloat(document.getElementById("precio").value);

		let categoria = document.getElementById("categoria");
		let catSeleccionada = categoria.options[categoria.selectedIndex].value;
		//creamos INSTANCIA DEL PRODUCTO
		producto = new Producto(codigo, nombre, descripcion, talle, foto, stock, precio, categoria);
		//inicializamos INSTANCIA PRODUCTO
		producto.codigo = codigo;
		producto.nombre = nombreProd;
		producto.descripcion= descripcion;
		producto.talle = talleSeleccionado;
		producto.foto = fotoData;
		producto.stock = stock;
		producto.precio = precio;
		producto.categoria = catSeleccionada;
		//agregarProducto(producto);
		dbProductos.push({producto});
		localStorage.setItem("productos", JSON.stringify(dbProductos));
		limpiarFormAltaProd();
	}); */

// ---------- [Limpiamos el Formulario de Modificacion de Productos ] ---------- //
// funcion flecha equivalente function limpiarFormAltaProd() {}
const limpiarFormModProd = () => {

	document.getElementById("nombreProd").value = "";
	document.getElementById("descripcion").value = "";
	document.getElementById("talle").value = "";
	imagenData = "";
	fileUpload.value = "";
	document.getElementById("stock").value = "";
	document.getElementById("precio").value = "";
	document.getElementById("categoria").value = "";
};







// ############## VIF Very Important Function ##################

let fotoData = ""; //Variable donde se guardará la foto del producto

//Funcion para manejar el guardado de la imagen
function readFile(input) {
	if (input.files && input.files[0]) {
		let reader = new FileReader();
		reader.onload = function (e) {
			//guardar en localStorage------------------------
			fotoData = e.target.result;
			//---------------------------------------------------
		};
		reader.readAsDataURL(input.files[0]);
	}
}
//Llamar a la funcion cuando se hace clic en seleccionar archivo y este cambia
