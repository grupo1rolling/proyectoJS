export function agregarUsuario(usuario) {
	let usuariosArray = [];

	//-- Verifico si existe la key 'usuarios' en LocalStorage
	//-- Si existe y tiene productos, capturo la informacion en un array
	usuariosArray =
		JSON.parse(localStorage.getItem("usuarios")) == null
			? []
			: JSON.parse(localStorage.getItem("usuarios"));

	//-- Verifico si ya existe el nombre de Usuario ingresado
	let existeUsuario = usuariosArray.find(function (item) {
		return item.nombre == usuario.nombre ? true : false;
	});

	if (existeUsuario) {
		//console.log("Usuario existente");
	} else {
		usuariosArray.push(usuario);
		localStorage.setItem("usuarios", JSON.stringify(usuariosArray));
	}
}

export function getUsuarios() {
	//-- Capturo el listado de todos los usuarios almacenados en LocalStorage
	let usuariosJSON = JSON.parse(localStorage.getItem("usuarios"));
	return usuariosJSON;
}

export function mostrarUsuarios() {
	getUsuarios().map(function (item) {
		let elemento = document.createElement("tr");
		//elemento.className = "col-md-4";

		let usuarioInactivo = '';
		let usuarioAdmin = '';

		if (item.estadoActivo == false) {
			usuarioInactivo = 'bg-danger';
		}

		if (item.admin == true) {
			usuarioAdmin = 'bg-success';
		}

		let detalle = `
		<tr>
			<th scope="row" class="${usuarioInactivo} ${usuarioAdmin}">-</th>
				<td class="${usuarioInactivo} ${usuarioAdmin}">${item.nombre}</td>
				<td class="${usuarioInactivo} ${usuarioAdmin}">${item.email}</td>
				<td class="${usuarioInactivo} ${usuarioAdmin} text-center"><a href="">Ver Productos</a></td>
				<td class="${usuarioInactivo} ${usuarioAdmin}">${item.password}</td>
				<td class="${usuarioInactivo} ${usuarioAdmin} text-center">${item.estadoActivo}</td>
				<td class="${usuarioInactivo} ${usuarioAdmin} text-center">${item.admin}</td>
				<td class="text-center"><button onclick="modalModificarUsuario()" type="button" class="btn btn-outline-warning btn-sm">Modificar</button></td>
				<td class="text-center"><button onclick="modalEliminarUsuario()" type="button" class="btn btn-danger btn-sm">X</button></td>
		</tr>
		`;

		elemento.innerHTML = detalle;
		usuariosDetalle.appendChild(elemento);
	});
}