import { Producto } from "./clases.js";
import { getTalles, getCategorias, getCodigoGeneradoByKey } from "./funcionesAuxiliares.js";

export function agregarProducto(producto) {
	let productosArray = [];

	//-- Verifica si existe la key 'productos' en LocalStorage
	//-- Si existe y tiene productos, capturo la informacion en un array
	productosArray = JSON.parse(localStorage.getItem("productos")) || [];

	//-- Verifica, por codigo o por nombre, si ya existe el productos ingresado.
	let existeProducto = productosArray.find(function (item) {
		return (item._codigo == producto.codigo /*|| item._nombre == producto.nombre*/) ? true : false;
	});

	if (existeProducto) {
		alert("El código del producto que desea ingresar ya existe.");
	} else {
		productosArray.push(producto);
		localStorage.setItem("productos", JSON.stringify(productosArray));
	}
}

// Muestro los productos de un usuario, consultando al LocalStorage
export function mostrarProductosUsuario(usuario) {
	//-- Capturo todos los codigos de los productos que contiene el usuario
	let codProductos = usuario._codigosProductos;

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
	let productosArray = [];
	productosArray = JSON.parse(localStorage.getItem("productos")) == null
		? []
		: JSON.parse(localStorage.getItem("productos"));

	return productosArray;
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
					<td class="">${item._categoria}</td>
					<td class="text-center">${item._talle}</td>
					<td class="text-center">${item._foto}</td>
					<td class="text-center">$ ${item._precio}</td>
					<td class="text-center ${stockIndicador}"> <b>${item._stock}</b></td>
					<td class="text-center">
						<button id="btnModificarProductosAdmin" data-codigo="${item._codigo}" title="Modificar Producto" type="button" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#modificaProducto"><i id="btnModificarProductosAdmin" data-codigo="${item._codigo}" class="far fa-edit"></i></button>
						<button id="btnBorrarProductosAdmin" data-codigo="${item._codigo}" title="Eliminar Producto" type="button" id="btnBaja" class="btn btn-outline-danger btn-sm"><i id="btnBorrarProductosAdmin" data-codigo="${item._codigo}" class="fas fa-trash-alt"></i></button>
					</td>
			</tr>
		  `;

		//   <button id="btnModificarUsuariosAdmin" data-codigo="${item._codigo}" title="Modificar Usuario" type="button" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#modificaUsuario"><i id="btnModificarUsuariosAdmin" data-codigo="${item._codigo}" class="fas fa-user-edit"></i></button>
		// 	<button id="btnBorrarUsuariosAdmin" data-codigo="${item._codigo}" title="Eliminar Usuario" type="button" class="btn btn-outline-danger btn-sm"><i id="btnBorrarUsuariosAdmin" data-codigo="${item._codigo}" class="fas fa-user-times"></i></button>

		contenedor.innerHTML += detalle;
	});
}


// export function altaDatosProductos() {

// 	let contenidoTalles = "";
// 	let contenidoCategorias = "";
// 	let modalAdminProductos;
// 	let contenido = "";

// 	//----- Captura de Talles -----//
// 	getTalles().map(item => {
// 		contenidoTalles += `<option value="${item}">${item}</option>`
// 	});

// 	//----- Captura de Categorias -----//		
// 	getCategorias().map(item => {
// 		contenidoCategorias += `<option value="${item}">${item}</option>`
// 	});

// 	modalAdminProductos = document.getElementById("modalBodyProductos");

// 	//--- Body del Model de modificacion de Productos ---//
// 	contenido = `
// 				<!-- Inicio Formulario -->
// 					<form id="formModProd">
// 						<div class="form-row">
// 							<div class="col-md-4 mb-3">
// 								<label for="codigo">Código</label>
// 								<input type="text" class="form-control" id="codigoProdAdm" value="" disabled>
// 							</div>

// 							<div class="col-md-5 mb-3">
// 								<label for="nombreProd">Producto</label>
// 								<input type="text" class="form-control" id="nombreProdAdm" value="" required>
// 							</div>

// 							<div class="col-md-3 mb-3">
// 								<label for="talle">Talle</label>
// 								<select id="talleProdAdm" name="talle" class="form-control" required>
// 									${contenidoTalles}
// 								</select>
// 							</div>
// 						</div>

// 						<div class="form-row">
// 							<div class="col-md-6 mb-3">
// 								<label for="categoria">Categoría</label>
// 								<select id="categoriaProdAdm" name="categoria" class="form-control" required>
// 									${contenidoCategorias}
// 								</select>
// 							</div>
// 							<div class="col-md-3 mb-3">
// 								<label for="stock">Stock</label>
// 								<input type="text" class="form-control" id="stockProdAdm" value="" required>
// 							</div>

// 							<div class="col-md-3 mb-3">
// 								<label for="precio">Precio $</label>
// 								<input type="text" class="form-control" id="precioProdAdm" value="" required>
// 							</div>
// 						</div>

// 						<div class="form-row">					
// 							<div class="col-md-6 mb-3">
// 								<label for="file-upload">Imagen del producto</label>
// 								<input id="file-upload" type="file" accept="image/*" />
// 							</div>

// 							<div class="col-md-6 mb-3">
// 								<label for="descripcion">Descripción</label>
// 								<textarea class="form-control" id="descripcionProdAdm" rows="1"></textarea>
// 							</div>
// 						</div>
// 					</form>
// 				<!-- Fin seccion Formulario -->
// 			`;

// 	modalAdminProductos.innerHTML = contenido;
// 	document.getElementById("descripcionProdAdm").value = productosDatos._descripcion;

// 	//--- Footer del Model de modificacion de Productos ---//
// 	modalAdminProductos = document.getElementById("modalFooterProductos");
// 	contenido = `
// 				<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
// 				<button id="btnGrabarProductoModifAdminPage" type="button" class="btn btn-primary" data-dismiss="modal">Grabar</button>
// 				`;

// 	modalAdminProductos.innerHTML = contenido;
// }

export function modificarAgregarDatosProductos(codigoProducto) {

	let contenidoTalles = "";
	let contenidoCategorias = "";
	let modalAdminProductos;
	let contenido = "";
	let accion = "";
	let habilitarDesabilitarCampo = "";

	let codigoValue;
	let nombreValue;
	let stockValue;
	let precioValue;
	let descripcionValue;


	if (codigoProducto > 0) {	// MODIFICACION //

		console.log("Modificar Producto");
		accion = "M";
		habilitarDesabilitarCampo = "disabled";

		let productosDatos = getProductos().find(item => {
			return item._codigo == codigoProducto ? item : "";
		});

		codigoValue = productosDatos._codigo;
		nombreValue = productosDatos._nombre;
		stockValue = productosDatos._stock;
		precioValue = productosDatos._precio;
		descripcionValue = productosDatos._descripcion;

		console.log(`Categoría: ${productosDatos._categoria}`);
		console.log(`Talle: ${productosDatos._talle}`);
		// console.log(`Categoría: ${productosDatos._categoria}`);
		// console.log(`Categoría: ${productosDatos._categoria}`);

		//----- Captura de Talles -----//
		let arrayTalles = getTalles();
		let posicionTalle = arrayTalles.indexOf(productosDatos._talle);
		arrayTalles.splice(posicionTalle, 1);
		arrayTalles.unshift(productosDatos._talle);

		arrayTalles.map(item => {
			contenidoTalles += `<option value="${item}">${item}</option>`
		});

		//----- Captura de Categorias -----//
		let arrayCategorias = getCategorias();
		let posicionCategoria = arrayCategorias.indexOf(productosDatos._categoria);
		arrayCategorias.splice(posicionCategoria, 1);
		arrayCategorias.unshift(productosDatos._categoria);

		arrayCategorias.map(item => {
			contenidoCategorias += `<option value="${item}">${item}</option>`
		});
	}
	else {	// ALTA //

		console.log("Alta Producto");
		accion = "A";
		habilitarDesabilitarCampo = "";

		codigoValue = getCodigoGeneradoByKey("productos"); //generar;
		nombreValue = "";
		stockValue = 0;
		precioValue = 0;
		descripcionValue = "";

		console.log(`Código: ${codigoValue}`);

		//----- Captura de Talles -----//
		getTalles().map(item => {
			contenidoTalles += `<option value="${item}">${item}</option>`
		});

		//----- Captura de Categorias -----//		
		getCategorias().map(item => {
			contenidoCategorias += `<option value="${item}">${item}</option>`
		});
	}

	modalAdminProductos = document.getElementById("modalBodyProductos");
	console.log(`Código: ${codigoValue}`);


	//--- Body del Model de modificacion de Productos ---//
	contenido = `
				<!-- Inicio Formulario -->
					<form id="formModProd">
						<div class="form-row">
							<div class="col-md-4 mb-3">
								<label for="codigo">Código</label>
								<input type="text" class="form-control" id="codigoProdAdm" value="${codigoValue}" ${habilitarDesabilitarCampo}>
							</div>

							<div class="col-md-5 mb-3">
								<label for="nombreProd">Producto</label>
								<input type="text" class="form-control" id="nombreProdAdm" value="${nombreValue}" required>
							</div>

							<div class="col-md-3 mb-3">
								<label for="talle">Talle</label>
								<select id="talleProdAdm" name="talle" class="form-control" required>
									${contenidoTalles}
								</select>
							</div>
						</div>

						<div class="form-row">
							<div class="col-md-6 mb-3">
								<label for="categoria">Categoría</label>
								<select id="categoriaProdAdm" name="categoria" class="form-control" required>
									${contenidoCategorias}
								</select>
							</div>
							<div class="col-md-3 mb-3">
								<label for="stock">Stock</label>
								<input type="text" class="form-control" id="stockProdAdm" value="${stockValue}" required>
							</div>

							<div class="col-md-3 mb-3">
								<label for="precio">Precio $</label>
								<input type="text" class="form-control" id="precioProdAdm" value="${precioValue}" required>
							</div>
						</div>

						<div class="form-row">					
							<div class="col-md-6 mb-3">
								<label for="file-upload">Imagen del producto</label>
								<input id="file-upload" type="file" accept="image/*" />
							</div>

							<div class="col-md-6 mb-3">
								<label for="descripcion">Descripción</label>
								<textarea class="form-control" id="descripcionProdAdm" rows="1"></textarea>
							</div>
						</div>
					</form>
				<!-- Fin seccion Formulario -->
				`;

	modalAdminProductos.innerHTML = contenido;
	document.getElementById("descripcionProdAdm").value = descripcionValue;

	//--- Footer del Model de modificacion de Productos ---//
	modalAdminProductos = document.getElementById("modalFooterProductos");
	contenido = `
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
				<button id="btnGrabarProductoModifAdminPage" data-accion="${accion}" type="button" class="btn btn-primary" data-dismiss="modal">Grabar</button>
				`;

	modalAdminProductos.innerHTML = contenido;
}

// export function modificarDatosProductos(codigoProducto) {
// 	let productosDatos = getProductos().find(item => {
// 		return item._codigo == codigoProducto ? item : "";
// 	});

// 	console.log(`Categoría: ${productosDatos._categoria}`);
// 	console.log(`Talle: ${productosDatos._talle}`);
// 	// console.log(`Categoría: ${productosDatos._categoria}`);
// 	// console.log(`Categoría: ${productosDatos._categoria}`);

// 	//----- Captura de Talles -----//
// 	let arrayTalles = getTalles();
// 	let posicionTalle = arrayTalles.indexOf(productosDatos._talle);
// 	arrayTalles.splice(posicionTalle, 1);
// 	arrayTalles.unshift(productosDatos._talle);

// 	let contenidoTalles;
// 	arrayTalles.map(item => {
// 		contenidoTalles += `<option value="${item}">${item}</option>`
// 	});

// 	//----- Captura de Categorias -----//
// 	let arrayCategorias = getCategorias();
// 	let posicionCategoria = arrayCategorias.indexOf(productosDatos._categoria);
// 	arrayCategorias.splice(posicionCategoria, 1);
// 	arrayCategorias.unshift(productosDatos._categoria);

// 	let contenidoCategorias;
// 	arrayCategorias.map(item => {
// 		contenidoCategorias += `<option value="${item}">${item}</option>`
// 	});


// 	let modalAdminProductos = document.getElementById("modalBodyProductos");

// 	//--- Body del Model de modificacion de Productos ---//
// 	let contenido = `
// 					<!-- Inicio Formulario -->
// 						<form id="formModProd">
// 							<div class="form-row">
// 								<div class="col-md-4 mb-3">
// 									<label for="codigo">Código</label>
// 									<input type="text" class="form-control" id="codigoProdAdm" value="${productosDatos._codigo}" disabled>
// 								</div>

// 								<div class="col-md-5 mb-3">
// 									<label for="nombreProd">Producto</label>
// 									<input type="text" class="form-control" id="nombreProdAdm" value="${productosDatos._nombre}" required>
// 								</div>

// 								<div class="col-md-3 mb-3">
// 									<label for="talle">Talle</label>
// 									<select id="talleProdAdm" name="talle" class="form-control" required>
// 										${contenidoTalles}
// 									</select>
// 								</div>
// 							</div>

// 							<div class="form-row">
// 								<div class="col-md-6 mb-3">
// 									<label for="categoria">Categoría</label>
// 									<select id="categoriaProdAdm" name="categoria" class="form-control" required>
// 										${contenidoCategorias}
// 									</select>
// 								</div>
// 								<div class="col-md-3 mb-3">
// 									<label for="stock">Stock</label>
// 									<input type="text" class="form-control" id="stockProdAdm" value="${productosDatos._stock}" required>
// 								</div>

// 								<div class="col-md-3 mb-3">
// 									<label for="precio">Precio $</label>
// 									<input type="text" class="form-control" id="precioProdAdm" value="${productosDatos._precio}" required>
// 								</div>
// 							</div>

// 							<div class="form-row">					
// 								<div class="col-md-6 mb-3">
// 									<label for="file-upload">Imagen del producto</label>
// 									<input id="file-upload" type="file" accept="image/*" />
// 								</div>

// 								<div class="col-md-6 mb-3">
// 									<label for="descripcion">Descripción</label>
// 									<textarea class="form-control" id="descripcionProdAdm" rows="1"></textarea>
// 								</div>
// 							</div>
// 						</form>

// 				<!-- Fin seccion Formulario -->
// 				`;

// 	modalAdminProductos.innerHTML = contenido;
// 	document.getElementById("descripcionProdAdm").value = productosDatos._descripcion;

// 	//--- Footer del Model de modificacion de Productos ---//
// 	modalAdminProductos = document.getElementById("modalFooterProductos");
// 	contenido = `
// 				<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
// 				<button id="btnGrabarProductoModifAdminPage" type="button" class="btn btn-primary" data-dismiss="modal">Grabar</button>
// 				`;

// 	modalAdminProductos.innerHTML = contenido;
// }

export function grabarModificacionAltProductoAdmin(accion) {

	// console.log("Prueba boton GRABAR Producto\n");
	let codigo = parseInt(document.getElementById("codigoProdAdm").value);
	let nombre = document.getElementById("nombreProdAdm").value;
	let talle = document.getElementById("talleProdAdm").value;
	let categoria = document.getElementById("categoriaProdAdm").value;
	let stock = parseInt(document.getElementById("stockProdAdm").value);
	let precio = parseFloat(document.getElementById("precioProdAdm").value);
	let descripcion = document.getElementById("descripcionProdAdm").value;

	console.log(`código: ${codigo}`);
	console.log(`nombre: ${nombre}`);
	console.log(`talle: ${talle}`);
	console.log(`categoria: ${categoria}`);
	console.log(`stock: ${stock}`);
	console.log(`precio: ${precio}`);
	console.log(`descripcion: ${descripcion}`);


	switch (accion) {
		case "A":	//--- ALTA ---//

			let nuevoProducto = new Producto(codigo, nombre, descripcion, talle, "", precio, stock, categoria)
			agregarProducto(nuevoProducto);
			break;

		case "M":	//--- MODIFICACION ---//
			let productosusuariosArray = getProductos();

			productosusuariosArray.map(item => {
				if (item._codigo == codigo) {
					item._codigo = codigo;
					item._nombre = nombre;
					item._talle = talle;
					item._categoria = categoria;
					item._stock = stock;
					item._precio = precio;
					item._descripcion = descripcion;
				}
			});

			localStorage.setItem("productos", JSON.stringify(productosusuariosArray))
			break;

		default:
			break;
	}


	mostrarProductos();
}

// export function grabarModificacionProductoAdmin() {

// 	// console.log("Prueba boton GRABAR Producto\n");
// 	let codigo = parseInt(document.getElementById("codigoProdAdm").value);
// 	let nombre = document.getElementById("nombreProdAdm").value;
// 	let talle = document.getElementById("talleProdAdm").value;
// 	let categoria = document.getElementById("categoriaProdAdm").value;
// 	let stock = parseInt(document.getElementById("stockProdAdm").value);
// 	let precio = parseFloat(document.getElementById("precioProdAdm").value);
// 	let descripcion = document.getElementById("descripcionProdAdm").value;

// 	console.log(`código: ${codigo}`);
// 	console.log(`nombre: ${nombre}`);
// 	console.log(`talle: ${talle}`);
// 	console.log(`categoria: ${categoria}`);
// 	console.log(`stock: ${stock}`);
// 	console.log(`precio: ${precio}`); 	
// 	console.log(`descripcion: ${descripcion}`);

// 	let productosusuariosArray = getProductos();

// 	productosusuariosArray.map(item => {
// 		if (item._codigo == codigo) {
// 			item._codigo = codigo;
// 			item._nombre = nombre;
// 			item._talle = talle;
// 			item._categoria = categoria;
// 			item._stock = stock;
// 			item._precio = precio;
// 			item._descripcion = descripcion;
// 		}
// 	});

// 	localStorage.setItem("productos", JSON.stringify(productosusuariosArray))
// 	mostrarProductos();
// }

export function borrarProducto(codigo) {
	let productosFiltrados = getProductos().filter(function (item) {
		return item._codigo != codigo
	});

	localStorage.setItem("productos", JSON.stringify(productosFiltrados));
	mostrarProductos();
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
