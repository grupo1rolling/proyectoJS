import { Usuario } from "./clases.js";
import { getCodigoGeneradoByKey, getProvincias, validarPassword } from "./funcionesAuxiliares.js";
import { getProductos, mostrarProductosUsuario, getProductoByCodigo } from "./funcionesProductos.js";


export function agregarUsuario(usuario) {
	let usuariosArray = [];
	let existeUs = false;
	//-- Verifico si ya existe el nombre de Usuario ingresado
	existeUs = existeUsuario(usuario);
	if (existeUs) {
		alert("Usuario existente");
	} else {
		usuariosArray = getAllUsuarios();
		usuariosArray.push(usuario);
		localStorage.setItem("usuarios", JSON.stringify(usuariosArray));
	}
}

// export function getUsuario(codigo) {
// 	let usuarioArray = getAllUsuarios();

// 	let usuarioDatos = usuarioArray.find(item => {
// 		return item._codigo === usuario.codigo ? item : "";
// 	});

// 	return usuarioDatos;
// }

export function getAllUsuarios() {
	//-- Verifico si existe la key 'usuarios' en LocalStorage
	//-- Si existe y tiene productos, capturo la informacion en un array
	let usuariosArray = [];
	usuariosArray = JSON.parse(localStorage.getItem("usuarios")) == null
		? []
		: JSON.parse(localStorage.getItem("usuarios"));

	return usuariosArray;
}

//FUNCION SE LA INVOCA ANTES DE AGREGAR UN USUARIO
function existeUsuario(usuario) {
	let usuariosArray = getAllUsuarios();

	let existeUsuario = usuariosArray.find(item => {
		return item._email == usuario._email ? true : false;
	});

	return existeUsuario;
}

function getUsuarioByCodigo(codUsuario) {
	let usuarioEncontrado = [];

	usuarioEncontrado = getAllUsuarios().find(item => {
		return item._codigo == codUsuario;
	});

	return usuarioEncontrado;
}

//FUNCION SE LA INVOCA ANTES DE AGREGAR UN USUARIO 
//SERIA MEJOR VER SI EXISTE EL EMAIL EN LUGAR DEL NOMBRE
// function existeUsuario(usuario) {
//   existe=usuarios.find(item=> {
//       return (item.email===usuario.email)
//   })
// }

// let tbody;
// tbody.getElementById("usuariosDetalle");
// tbody.innerHTML = "";

export function btnModalAltaUsuarioAdminPage() {
	let modalAdminUsuarios = document.getElementById("containerBtnAltaUsuarioAdmin");

	let contenido = `
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					<button id="btnGrabarUsuarioPagAdmin" type="button" class="btn btn-primary" data-dismiss="modal">Grabar</button>
					`;

	modalAdminUsuarios.innerHTML = contenido;
}


function getCodigoGeneradoAltaUsuario() {
	let cantUsuarios = 0;
	let usuariosArray = [];
	let codigosUsuariosArray = [];
	let maxCodUsuario = 0;


	usuariosArray = getAllUsuarios()
	cantUsuarios = usuariosArray.length;

	if (cantUsuarios > 0) {
		//console.log(`Cantidad de usuarios: ${cantUsuarios}`);
		//cantUsuarios = cantUsuarios + 1;

		codigosUsuariosArray = usuariosArray.map((item) => {
			return item._codigo;
		});

		// console.log(codigosUsuariosArray);

		maxCodUsuario = Math.max.apply(null, codigosUsuariosArray);
		maxCodUsuario += 1;
		// console.log(`Max cod Usuario: ${maxCodUsuario}`);
		// maxCodUsuario 
	}
	else {
		//console.log("No hay usuarios");
		maxCodUsuario = 1;
	}

	return maxCodUsuario;
}

export function grabarAltaUsuarioAdminPage() {
	let codigo = getCodigoGeneradoByKey("usuarios");
	let nombre = document.getElementById("nombreAltaUsrAdmPage").value;
	let apellido = document.getElementById("apellidoAltaUsrAdmPage").value;
	let email = document.getElementById("emailAltaUsrAdmPage").value;
	let password = document.getElementById("contrasenaAltaUsrAdmPage").value;
	let repPassword = document.getElementById("repContrasenaAltaUsrAdmPage").value;
	let estado = document.getElementById("SwitchEstadoAltaUsrAdmPage").checked;
	let esAdmin = document.getElementById("SwitchEsAdmAltaUsrAdmPage").checked;
	
	let dir1 = document.getElementById("direccion").value;
	let dir2 = document.getElementById("direccionAdc").value;
	let ciudad = document.getElementById("ciudad").value;
	let provincia = document.getElementById("provincia").value;
	let codPostal = document.getElementById("codPostal").value;

	if(validarPassword(password) && validarPassword(repPassword)){

		if(password === repPassword){

			// let dir2 = usuarioDatos["_direccion"].dir2;
			
			// console.log(`Código: ${codigo}`)
			// console.log(`Nombre: ${nombre}`)
			// console.log(`Apellido: ${apellido}`)
			// console.log(`Email: ${email}`)
			// console.log(`Pass: ${password}`)
			// console.log(`Estado: ${estado}`)
			// console.log(`EsAdmin: ${esAdmin}`)
			
			let nuevoUsuario = new Usuario(codigo, nombre, apellido, email, password, [], {dir1, dir2, ciudad, provincia, codPostal}, estado, esAdmin);
			agregarUsuario(nuevoUsuario);
			mostrarUsuarios();
		}
		else{
			alert("Las constraseñas no coinciden. Por favor verifique sus datos");
		}
	}
}

function limpiarDatos(){
	document.getCodigoGeneradoByKey("usuarios") = "";
	document.getElementById("nombreAltaUsrAdmPage").value = "";
	document.getElementById("apellidoAltaUsrAdmPage").value = "";
	document.getElementById("emailAltaUsrAdmPage").value = "";
	document.getElementById("contrasenaAltaUsrAdmPage").value = "";
	document.getElementById("repContrasenaAltaUsrAdmPage").value = "";
	document.getElementById("SwitchEstadoAltaUsrAdmPage").checked = true;
	document.getElementById("SwitchEsAdmAltaUsrAdmPage").checked = false;

	document.getElementById("direccion").value = "";
	document.getElementById("direccionAdc").value = "";
	document.getElementById("ciudad").value = "";
	document.getElementById("provincia").value = "";
	document.getElementById("codPostal").value = "";
}

export function mostrarUsuarios() {
	let contenedor = document.getElementById("usuariosDetalle");
	contenedor.innerHTML = "";

	getAllUsuarios().map(function (item) {
		let usuarioInactivo = "";
		let usuarioAdmin = "";
		let usuarioCheckActivo = "";
		let usuarioCheckAdmin = "";
		let usuarioCheckActivoColor = "";
		let usuarioCheckAdminColor = "";

		if (item._estado == false) {
			usuarioInactivo = "bg-danger";
			usuarioCheckActivo = "fas fa-times-circle";
			usuarioCheckActivoColor = "color:red";
		}
		else {
			usuarioCheckActivo = "far fa-check-circle";
			usuarioCheckActivoColor = "color:lawngreen";
		}

		if (item._esAdmin == true) {
			usuarioAdmin = "bg-success";
			usuarioCheckAdmin = "far fa-check-circle";
			usuarioCheckAdminColor = "color:lawngreen";
		}
		else {
			usuarioCheckAdmin = "fas fa-times-circle";
			usuarioCheckAdminColor = "color:red";
		}

		let detalle = `
					<tr>
						<th scope="row" class="${usuarioInactivo} ${usuarioAdmin}">${item._codigo}</th>
							<td class="${usuarioInactivo} ${usuarioAdmin}">${item._nombre}</td>
							<td class="${usuarioInactivo} ${usuarioAdmin}">${item._apellido}</td>
							<td class="${usuarioInactivo} ${usuarioAdmin}">${item._email}</td> 
							<td class="${usuarioInactivo} ${usuarioAdmin} text-center">
								<button id="btnProductosUsuariosAdminPage" data-codigo="${item._codigo}" title="Ver Productos" type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#modalProdUsuariosAdmin"><i id="btnProductosUsuariosAdminPage" data-codigo="${item._codigo}" class="fas fa-shopping-cart"></i></button>
							</td>
							<td class="${usuarioInactivo} ${usuarioAdmin}">${item._password}</td>
							<td class="text-center"><i style="${usuarioCheckActivoColor}" class="${usuarioCheckActivo}"></i></td>
							<td class="text-center"><i style="${usuarioCheckAdminColor}" class="${usuarioCheckAdmin}"></i></td>
						<td class="text-center">
							<button id="btnModificarUsuariosAdmin" data-codigo="${item._codigo}" title="Modificar Usuario" type="button" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#modificaUsuario"><i id="btnModificarUsuariosAdmin" data-codigo="${item._codigo}" class="fas fa-user-edit"></i></button>
							<button id="btnConfirmarBorrado" data-codigo="${item._codigo}" data-tabla="usuarios" title="Eliminar Usuario" type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#modalConfirmaBorrado"><i id="btnConfirmarBorrado" data-codigo="${item._codigo}" data-tabla="usuarios" class="fas fa-user-times"></i></button>
						</td>
					</tr>
				`;
		contenedor.innerHTML += detalle;
	});
}

export function verProductosUsuariosAdmin(codUsuario) {

	console.log(`Ver Productos usuario. Código: ${codUsuario}`);

	let i = 0;

	let contenedor = document.getElementById("detalleProductosUsuarioAdmin");
	contenedor.innerHTML = "";

	let usuarioDatos = [];
	usuarioDatos = getUsuarioByCodigo(parseInt(codUsuario));

	mostrarProductosUsuario(usuarioDatos);

	console.log(usuarioDatos._codigosProductos);
	let codProductos = usuarioDatos._codigosProductos;

	//-- Capturo el listado de todos los productos almacenados en LocalStorage
	let productosJSON = getProductos();

	//-- Si existen productos en LocalStorage, realizo la busqueda de los codigos de productos del usuario
	if (productosJSON) {
		let productosFiltrados = [];
		let sumaTotalPagar = 0;

		codProductos.map(function (item) {
			productosFiltrados = productosJSON.find(function (item2) {
				return item2._codigo == item && item2;
			});

			sumaTotalPagar += productosFiltrados._precio;

			if (productosFiltrados) {
				console.log(productosFiltrados._nombre, `$${productosFiltrados._precio}`);

				let detalle = ` 
				<tr>
					<td class="text-left" scope="row" id="fila">${i += 1}</td>
					<td class="text-left">${productosFiltrados._nombre}</td>
					<td class="text-center">1</td>
					<td class="text-right">${productosFiltrados._precio}</td>
				</t>
				`;

				contenedor.innerHTML += detalle;
			}
		});

		let footerProdUsuarios = document.getElementById("footerProdUsuarios");

		let contenido = `
						<div class="mr-auto">
							<th></th>
							<th></th>
							<th class="text-right">Total:</th>
							<th class="text-right">$ ${sumaTotalPagar}</th>
						</div>
						`;

		footerProdUsuarios.innerHTML = contenido;
		console.log(`Total a pagar $${sumaTotalPagar}`);
		//---------------------------------
	}




	// _________.map(function(item){
	// let detalle = ` 
	// <tr>
	// 	<td scope="row" id="fila">${i + 1}</td>
	// 	<td class="text-left">${item._nombre}</td>
	// 	<td class="text-center">${item._stock}</td>
	// 	<td class="text-rigth">${item.precio}</td>
	// 	<td align="center">
	// 		<button id="btnBorrarItem" 
	// 			title="eliminar producto" 
	// 			type="button" class="btn btn-outline-danger btn-sm">
	// 			<i class="fa fa-window-close-o"></i>
	// 		</button>
	// </t>
	// `;

	// contenedor.innerHTML += detalle;
	// })


	// <tr>
	// 	<td scope="row" id="fila">${i + 1}</td>
	// 	<td class="text-left">${item._nombre}</td>
	// 	<td class="text-center">${item._cantProd}</td>
	// 	<td class="text-rigth">${item.precio.toFixed(2)}</td>
	// 	<td align="center"><button id="btnBorrarItem" 
	// 		title="eliminar producto" 
	// 		type="button" class="btn btn-outline-danger btn-sm"
	// 		onclick="borrarItem(${p._idProd},${i})">
	// 		<i class="fa fa-window-close-o">
	// 		</i>
	// 		</button>
	// </t>


}

export function modificarDatosUsuario(codigoUsuario) {
	let usuarioDatos = getAllUsuarios().find(item => {
		return item._codigo == codigoUsuario ? item : "";
	});

	let contenidoProvincias = "";
	let dir1 = usuarioDatos["_direccion"].dir1;
	let dir2 = usuarioDatos["_direccion"].dir2;
	let ciudad = usuarioDatos["_direccion"].ciudad;
	let provincia = usuarioDatos["_direccion"].provincia;
	let codPostal = usuarioDatos["_direccion"].codPostal;

	// <option selected>Seleccione una provincia...</option>
	// <option value="bue">Buenos Aires</option>
	// <option value="cat">Catamarca</option>
	// <option value="ciu">Ciudad Autónoma de Buenos Aires</option>
	// <option value="cor">Córdoba</option>
	// <option value="tuc">Tucumán</option>
	
	//----- Captura de Provincias -----//
	let arrayProvincias = getProvincias();
	let posicionProvincia = arrayProvincias.indexOf(provincia);
	arrayProvincias.splice(posicionProvincia, 1);
	arrayProvincias.unshift(provincia);

	arrayProvincias.map(item => {
		contenidoProvincias += `<option value="${item}">${item}</option>`
	});


	let usuarioEstado = (usuarioDatos._estado) ? "checked" : "unchecked"
	let usuarioEsAdmin = (usuarioDatos._esAdmin) ? "checked" : "unchecked"

	let modalAdminUsuarios = document.getElementById("modalBodyUsuarios");

	let contenido = `
		<!-- Inicio Formulario -->
				<form>
					<!-- el email es el codigo de usuario -->
					<div class="row">
						<div class="col-12 col-md-12">
							<div class="form-group">

								<div class="form-group">
									<label for="codigo">Código</label>
										<input type="text" class="form-control" id="codigoUsrAdm" value="${usuarioDatos._codigo}" disabled>
								</div>	

								<div class="form-group">	
									<label for="email">Correo electrónico</label>
									<input type="email" class="form-control" id="emailUsrAdm" value="${usuarioDatos._email}" aria-describedby="emailHelp"
										disabled>
								</div>

								<div class="form-group">
									<label for="contrasena">Resetear Contraseña</label>
									<input type="password" class="form-control" id="contrasenaUsrAdm" value="${usuarioDatos._password}">
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-6">
							<div class="form-group">
								<!-- Default checked -->
								<div class="custom-control custom-switch">
									<input type="checkbox" class="custom-control-input" id="SwitchModifEstadoAdmPage" ${usuarioEstado}>
									<label class="custom-control-label" for="SwitchModifEstadoAdmPage">Estado de Usuario</label>
								</div>
							</div>
						</div>
						<div class="col-6">
							<div class="form-group">								
								<!-- Default checked -->
								<div class="custom-control custom-switch">
									<input type="checkbox" class="custom-control-input" id="SwitchModifEsAdmPage" ${usuarioEsAdmin}>
									<label class="custom-control-label" for="SwitchModifEsAdmPage">Administrador</label>
								</div>
							</div>
						</div>
					</div>

					<!-- nombre y apellido -->
					<div class="row">
						<div class="col-12">
							<div class="form-group">
								<label for="nombre">Nombre</label>
								<input type="text" class="form-control" id="nombreUsrAdm" value="${usuarioDatos._nombre}" placeholder="Nombre"
									required />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<div class="form-group">
								<label for="apellido">Apellido</label>
								<input type="text" class="form-control" id="apellidoUsrAdm" value="${usuarioDatos._apellido}" placeholder="Apellido"
									required />
							</div>
						</div>
					</div>

					<!-- dirección -->
					<div class="row">
						<div class="col-12 col-md-12">
							<div class="form-group">
								<label for="direccionAdm">Dirección</label>
								<input type="text" class="form-control" id="direccionAdm" placeholder="calle y número" value="${dir1}">
							</div>
							<div class="form-group">
								<label for="direccionAdcAdm">Dirección (datos adicionales)</label>
								<input type="text" class="form-control" id="direccionAdcAdm"
									placeholder="piso, departamento" value="${dir2}">
							</div>
							<div class="form-row">
								<div class="form-group col-md-5">
									<label for="ciudadAdm">Ciudad</label>
									<input type="text" class="form-control" id="ciudadAdm" value="${ciudad}">
								</div>
								<div class="form-group col-md-4">
									<label for="provinciaAdm">Provincia</label>
									<select id="provinciaAdm" class="form-control">
									
										${contenidoProvincias}
										
									</select>
								</div>
								<div class="form-group col-md-3">
									<label for="zip">Código Postal</label>
									<input type="text" class="form-control" id="zip" placeholder="código postal" value="${codPostal}">
								</div>
							</div>
						</div>
					</div>
				</form>
				<div class="modal-footer" id="modalFooter">
					
				</div>
				<!-- Fin seccion Formulario -->
	`;

	modalAdminUsuarios.innerHTML = contenido;

	//--- Footer del Model de modificacion de Productos ---//
	modalAdminUsuarios = document.getElementById("modalFooterModifUsuarioAdminPage");
	contenido = `
				<button onclick="" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
				<button id="btnGrabarUsuarioModifAdminPage" type="button" class="btn btn-primary" data-dismiss="modal">Guardar</button>
				`;

	modalAdminUsuarios.innerHTML = contenido;

}

export function modalConfirmarBorrado(codigo, tabla) {

	let mensaje = "";

	switch (tabla) {
		case "usuarios":
			let usuarioDatos = getUsuarioByCodigo(codigo);
			mensaje = `¿Está seguro que desea eliminar a ${usuarioDatos._nombre} ${usuarioDatos._apellido}?`;
			break;
	
		case "productos":
			let productoDatos = getProductoByCodigo(codigo);
			mensaje = `¿Está seguro que desea eliminar el producto: ${productoDatos._nombre}?`;
			break;
	
		default:
			break;
	}

	console.log(mensaje)

	let modalConfirmarBorrado = document.getElementById("modalConfirmaBorrado");
	
	let contenido = `
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="verCarritoTitulo">Atención!</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body" text-align="right">
								<h5>${mensaje}</h5>
							</div>
							<div class="modal-footer">
								<button type="button" id="btnBorrarConfirmado" data-codigo="${codigo}" data-tabla="${tabla}" class="btn btn-green" data-dismiss="modal">Aceptar</button>
								<button type="button" id="" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
							</div>
						</div>
					</div>
	`;

	modalConfirmarBorrado.innerHTML = contenido;
}

export function borrarUsuario(codigo) {
	// modalConfirmacionBorrado();

	let usuariosFiltrados = getAllUsuarios().filter(function (item) {
		return item._codigo != codigo
	});

	localStorage.setItem("usuarios", JSON.stringify(usuariosFiltrados));
	mostrarUsuarios();
}

export function grabarModificacionUsuariosAdmin() {
	let codigo = parseInt(document.getElementById("codigoUsrAdm").value);
	let nombre = document.getElementById("nombreUsrAdm").value;
	let apellido = document.getElementById("apellidoUsrAdm").value;
	let email = document.getElementById("emailUsrAdm").value;
	let password = document.getElementById("contrasenaUsrAdm").value;
	let estado = document.getElementById("SwitchModifEstadoAdmPage").checked;
	let esAdmin = document.getElementById("SwitchModifEsAdmPage").checked;
	
	let dir1 = document.getElementById("direccionAdm").value;
	let dir2 = document.getElementById("direccionAdcAdm").value;
	let ciudad = document.getElementById("ciudadAdm").value;
	let provincia = document.getElementById("provinciaAdm").value;
	let codPostal = document.getElementById("zip").value;


	let usuariosArray = getAllUsuarios();

	usuariosArray.map(item => {
		if (item._codigo == codigo) {
			item._codigo = codigo;
			item._nombre = nombre;
			item._apellido = apellido;
			item._email = email;
			item._password = password;

			item._direccion.dir1 = dir1;
			item._direccion.dir2 = dir2;
			item._direccion.ciudad = ciudad;
			item._direccion.provincia = provincia;
			item._direccion.codPostal = codPostal;

			item._estado = estado;
			item._esAdmin = esAdmin;
		}
	});

	localStorage.setItem("usuarios", JSON.stringify(usuariosArray))
	mostrarUsuarios();
}


// <td class="text-center"><button onclick="fnselect()" type="button" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#contacto">Modificar</button></td>
// <td class="text-center"><button onclick="modalEliminarUsuario()" type="button" class="btn btn-danger btn-sm">X</button></td>


// ####################################################
// FUNCION QUE OBTIENE DATOS DEL FORMULARIO DE REGISTRO
// ####################################################
function obtenerDatosUsuarios() {

	let nombre = document.getElementById("nombre").value.toUpperCase();
	let apellido = document.getElementById("apellido").value.toUpperCase();
	let email = document.getElementById("email").value.toLowerCase();
	let pass = document.getElementById("contrasena").value;
	let repPass = document.getElementById("repContrasena").value;
	password = checkPass(pass, repPass);
	let dir = document.getElementById("direccion").value;
	let dirAdc = document.getElementById("direccionAdc").value;
	let ciudad = document.getElementById("ciudad").value;
	let pcia = document.getElementById("provincia");
	let pciaSeleccionada = pcia.options[pcia.selectedIndex].value;
	let zip = document.getElementById("zip").value;

	let direccion = [];
	direccion.push(dir, dirAdc, ciudad, pciaSeleccionada, zip);

	let boletin = document.getElementById("boletin").checked;
	//creamos INSTANCIA DE LA CLASE USUARIO
	let estado, admin, codigosProductos;
	usuario = new Usuario(nombre, email, password, codigosProductos, direccion, estado, admin);
	//inicializamos INSTANCIA USUARIO
	usuario.nombre = nombre;
	usuario.apellido;
	usuario.email = email;
	usuario.password = password;
	usuario.codigosProductos = [];
	usuario.direccion = direccion;
	usuario.estado = true;
	usuario.admin = false;
	//llamamos a la funcion de agregar usuarios
	agregarUsuario(usuario);
} //fin de obtenerDatos() del registro de usuarios



//FUNCION QUE COMPRUEBA QUE LAS DOS CONTRASEÑAS SEAN IGUALES
function checkPass(pass, repPass) {
	if (pass == repPass) {
		return pass
	} else {
		alert("las contraseñas no coinciden!!");
	}
}

// ####################################################
// FUNCION QUE OBTIENE DATOS DEL FORMULARIO DE LOGIN
// ####################################################
let usuarioOK;

function obtenerDatosLogin() {
	//email
	let mailLogin = document.getElementById("mailLogin").value.toLowerCase();
	console.log(mailLogin);
	//contraseña
	let passwordLogin = document.getElementById("passwordLogin").value;
	console.log(passwordLogin);

	checkLogin(mailLogin, passwordLogin);

	if (usuarioOK != null) {
		console.log(`usuario confirmado ${usuarioOK}`)
	} else {
		console.log("usuario o contraseña incorrectos")
	}
}

// ####################################################
function checkLogin(mailL, passL) {
	usuarioOK = usuarios.find(item => {
		return (item.email === mailL) && (item.password === passL)
	})
}
