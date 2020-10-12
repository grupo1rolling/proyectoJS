export function agregarProducto(producto) {
	let productosArray = [];

	//-- Verifico si existe la key 'productos' en LocalStorage
	//-- Si existe y tiene productos, capturo la informacion en un array
	productosArray =
		JSON.parse(localStorage.getItem("productos")) == null
			? []
			: JSON.parse(localStorage.getItem("productos"));

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
	getProductos().map(function (item) {
		let elemento = document.createElement("tr");
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
					<td class="text-center">$ ${item._costo}</td>
					<td class="text-center">$ ${item._precio}</td>
					<td class="text-center ${stockIndicador}"> <b>${item._stock}</b></td>
					<td class="text-center"><button type="button" class="btn btn-outline-warning btn-sm">Modificar</button></td>
					<td class="text-center"><button type="button" class="btn btn-danger btn-sm">X</button></td>
			</tr>
			`;

		elemento.innerHTML = detalle;
		productosDetalle.appendChild(elemento);
	});
}

