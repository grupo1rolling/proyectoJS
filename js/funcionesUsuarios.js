export function agregarUsuario(usuario) {
	let usuariosArray = [];
	let existeUs = false;
	//-- Verifico si ya existe el nombre de Usuario ingresado
	existeUs = existeUsuario(usuario);
	if (existeUs) {
		//console.log("Usuario existente");
	} else {
		usuariosArray = getAllUsuarios();
		usuariosArray.push(usuario);
		localStorage.setItem("usuarios", JSON.stringify(usuariosArray));
	}
}

export function getUsuario(codigo) {
	let usuarioArray = getAllUsuarios();

	let usuarioDatos = usuarioArray.find(item => {
		return item._codigo === usuario.codigo ? item : "";
	});

	return usuarioDatos;
}

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
		return item._nombre == usuario.nombre ? true : false;
	});

	return existeUsuario;
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
				<td class="${usuarioInactivo} ${usuarioAdmin} text-center"><button title="Ver Productos" type="button" class="btn btn-outline-light btn-sm"><i class="fas fa-shopping-cart"></i></button></td>
				<td class="${usuarioInactivo} ${usuarioAdmin}">${item._password}</td>
				<td class="text-center"><i style="${usuarioCheckActivoColor}" class="${usuarioCheckActivo}"></i></td>
				<td class="text-center"><i style="${usuarioCheckAdminColor}" class="${usuarioCheckAdmin}"></i></td>
		<td class="text-center">
			<button id="btnModificarUsuariosAdmin" data-codigo="${item._codigo}" title="Modificar Usuario" type="button" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#modificaUsuario"><i id="btnModificarUsuariosAdmin" data-codigo="${item._codigo}" class="fas fa-user-edit"></i></button>
			<button id="btnBorrarUsuariosAdmin" data-codigo="${item._codigo}" title="Eliminar Usuario" type="button" class="btn btn-outline-danger btn-sm"><i id="btnBorrarUsuariosAdmin" data-codigo="${item._codigo}" class="fas fa-user-times"></i></button>
		</td>
		</tr>
      `;
		contenedor.innerHTML += detalle;
	});

	// <td class="${usuarioInactivo} ${usuarioAdmin} text-center"><i style="color:red" class="${usuarioCheckActivo}"></i></td>
	// 			<td class="${usuarioInactivo} ${usuarioAdmin} text-center"><i class="${usuarioCheckAdmin}"></i></td>

	// getAllUsuarios().map(function (item) {
	// 	let elemento = document.createElement("tr");
	// 	let usuarioInactivo = '';
	// 	let usuarioAdmin = '';

	// 	if (item._estado == false) {
	// 		usuarioInactivo = 'bg-danger';
	// 	}

	// 	if (item._esAdmin == true) {
	// 		usuarioAdmin = 'bg-success';
	// 	}

	// 	let detalle = `
	// 	<tr>
	// 		<th scope="row" class="${usuarioInactivo} ${usuarioAdmin}">${item._codigo}</th>
	// 			<td class="${usuarioInactivo} ${usuarioAdmin}">${item._nombre}</td>
	// 			<td class="${usuarioInactivo} ${usuarioAdmin}">${item._apellido}</td>
	// 			<td class="${usuarioInactivo} ${usuarioAdmin}">${item._email}</td> 
	// 			<td class="${usuarioInactivo} ${usuarioAdmin} text-center"><a href="">Ver Productos</a></td>
	// 			<td class="${usuarioInactivo} ${usuarioAdmin}">${item._password}</td>
	// 			<td class="${usuarioInactivo} ${usuarioAdmin} text-center">${item._estado}</td>
	// 			<td class="${usuarioInactivo} ${usuarioAdmin} text-center">${item._esAdmin}</td>
	//     <td class="text-center"><button id="btnModificarUsuariosAdmin" data-codigo=${item._codigo} type="button" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#modificaUsuario">Modificar</button></td>
	//     <td class="text-center"><button onclick="prueba2(${item._codigo})" type="button" class="btn btn-danger btn-sm">X</button></td>
	// 	</tr>
	// 	`;

	// 	elemento.innerHTML = detalle;
	// 	usuariosDetalle.appendChild(elemento);	
	// });
}

export function modificarDatosUsuario(codigoUsuario) {
	let usuarioDatos = getAllUsuarios().find(item => {
		return item._codigo == codigoUsuario ? item : "";
	});


	let usuarioEstado = (usuarioDatos._estado) ? "checked" : "unchecked"
	let usuarioEsAdmin = (usuarioDatos._esAdmin) ? "checked" : "unchecked"


	let modalAdminUsuarios = document.getElementById("modalBody");

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
									<input type="checkbox" class="custom-control-input" id="customSwitchEstadoAdm" ${usuarioEstado}>
									<label class="custom-control-label" for="customSwitchEstadoAdm">Estado de Usuario</label>
								</div>
							</div>
						</div>
						<div class="col-6">
							<div class="form-group">								
								<!-- Default checked -->
								<div class="custom-control custom-switch">
									<input type="checkbox" class="custom-control-input" id="customSwitchEsAdm" ${usuarioEsAdmin}>
									<label class="custom-control-label" for="customSwitchEsAdm">Administrador</label>
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
								<label for="direccion">Dirección</label>
								<input type="text" class="form-control" id="direccion" placeholder="calle y número">
							</div>
							<div class="form-group">
								<label for="direccionAdc">Dirección (datos adicionales)</label>
								<input type="text" class="form-control" id="direccionAdc"
									placeholder="piso, departamento">
							</div>
							<div class="form-row">
								<div class="form-group col-md-5">
									<label for="ciudad">Ciudad</label>
									<input type="text" class="form-control" id="ciudad">
								</div>
								<div class="form-group col-md-4">
									<label for="provincia">Provincia</label>
									<select id="provincia" class="form-control">
										<option selected>Seleccione una provincia...</option>
										<option value="bue">Buenos Aires</option>
										<option value="cat">Catamarca</option>
										<option value="ciu">Ciudad Autónoma de Buenos Aires</option>
										<option value="cor">Córdoba</option>
										<option value="tuc">Tucumán</option>
									</select>
								</div>
								<div class="form-group col-md-3">
									<label for="zip">Código Postal</label>
									<input type="text" class="form-control" id="zip" placeholder="código postal">
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer" id="modalFooter">
						<button onclick="" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
						<button id="btnGrabarUsuariosAdmin" type="button" class="btn btn-primary" data-dismiss="modal">Guardar</button>
					</div>
				</form>
				<!-- Fin seccion Formulario -->
	`;

	modalAdminUsuarios.innerHTML = contenido;
}

export function borrarUsuario(codigo) {
	let usuariosFiltrados = getAllUsuarios().filter(function (item) {
		return item._codigo != codigo
	});

	localStorage.setItem("usuarios", JSON.stringify(usuariosFiltrados));
	mostrarUsuarios();
}

export function grabarDatosUsuariosAdmin() {
	let codigo   = document.getElementById("codigoUsrAdm").value;
	let nombre 	 = document.getElementById("nombreUsrAdm").value;
	let apellido = document.getElementById("apellidoUsrAdm").value;
	let email    = document.getElementById("emailUsrAdm").value;
	let password = document.getElementById("contrasenaUsrAdm").value;
	let estado   = document.getElementById("customSwitchEstadoAdm").checked;
	let esAdmin  = document.getElementById("customSwitchEsAdm").checked;

	let usuariosArray = getAllUsuarios();

	usuariosArray.map(item => {
		if (item._codigo == codigo) {
			item._codigo = codigo;
			item._nombre = nombre;
			item._apellido = apellido;
			item._email = email;
			item._password = password;
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

	//nombre
	let nombre = document.getElementById("nombre").value.toUpperCase();
	//apellido
	let apellido = document.getElementById("apellido").value.toUpperCase();
	//email
	let email = document.getElementById("email").value.toLowerCase();
	//contraseña
	let pass = document.getElementById("contrasena").value;
	let repPass = document.getElementById("repContrasena").value;
	password = checkPass(pass, repPass);
	//direccion
	let dir = document.getElementById("direccion").value;
	let dirAdc = document.getElementById("direccionAdc").value;
	let ciudad = document.getElementById("ciudad").value;
	let pcia = document.getElementById("provincia");
	let pciaSeleccionada = pcia.options[pcia.selectedIndex].value;
	let zip = document.getElementById("zip").value;
	//ponemos la direccion en un array 
	let direccion = [];
	direccion.push(dir, dirAdc, ciudad, pciaSeleccionada, zip);
	//boletin
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

//VALIDACION DE CONTRASENIA

cont validate = () => {
	if (pass.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/)){
		return pass
	} else {
		alert("la contraseña no cumple las condiciones")
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
