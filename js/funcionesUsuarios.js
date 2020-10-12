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

export function mostrarUsuarios() {
	getAllUsuarios().map(function (item) {
		let elemento = document.createElement("tr");
		let usuarioInactivo = '';
		let usuarioAdmin = '';

		if (item._estado == false) {
			usuarioInactivo = 'bg-danger';
		}

		if (item._esAdmin == true) {
			usuarioAdmin = 'bg-success';
		}

		let detalle = `
		<tr>
			<th scope="row" class="${usuarioInactivo} ${usuarioAdmin}">-</th>
				<td class="${usuarioInactivo} ${usuarioAdmin}">${item._nombre}</td>
				<td class="${usuarioInactivo} ${usuarioAdmin}">${item._email}</td>
				<td class="${usuarioInactivo} ${usuarioAdmin} text-center"><a href="">Ver Productos</a></td>
				<td class="${usuarioInactivo} ${usuarioAdmin}">${item._password}</td>
				<td class="${usuarioInactivo} ${usuarioAdmin} text-center">${item._estado}</td>
				<td class="${usuarioInactivo} ${usuarioAdmin} text-center">${item._esAdmin}</td>
				<td class="text-center"><button onclick="" type="button" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#usuario">Modificar</button></td>
				<td class="text-center"><button onclick="" type="button" class="btn btn-danger btn-sm">X</button></td>
		</tr>
		`;

		elemento.innerHTML = detalle;
		usuariosDetalle.appendChild(elemento);
	});
}

// <td class="text-center"><button onclick="fnselect()" type="button" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#contacto">Modificar</button></td>
// <td class="text-center"><button onclick="modalEliminarUsuario()" type="button" class="btn btn-danger btn-sm">X</button></td>
