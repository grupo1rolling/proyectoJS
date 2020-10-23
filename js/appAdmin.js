import { mostrarProductos } from "./funcionesProductos.js";
import { mostrarUsuarios, modificarDatosUsuario, borrarUsuario, grabarDatosUsuariosAdmin } from "./funcionesUsuarios.js";
import { cargaInicialDatos } from "./funcionesAuxiliares.js";


localStorage.clear();
cargaInicialDatos();

//actualizarTotalesCarrito(); //actualiza cantidad de productos y total compra en la barra 
// mostrarTarjetas();

mostrarUsuarios();
mostrarProductos();

//-----[Eventos de botones escuchando - USUARIOS]-----//
const btnModificarUsuario = document.querySelector("#contenedorUsuariosAdmin");
btnModificarUsuario.addEventListener("click", (e) => {

	/*Evento del boton para editar un usuario (Pagina Admin)*/
	if (e.target.id == "btnModificarUsuariosAdmin") {
		modificarDatosUsuario(e.target.dataset.codigo);
	}

	/*Evento del boton para editar un usuario (Pagina Admin)*/
	if (e.target.id == "btnBorrarUsuariosAdmin") {
		borrarUsuario(e.target.dataset.codigo);
	}
});

/*Evento del boton para guardar los cambios de un usuario (Pagina Admin)*/
const modalModificaUsuarioAdmin = document.querySelector("#contenedorModificarUsuariosAdmin");
modalModificaUsuarioAdmin.addEventListener("click", (e) => {
	if (e.target.id == "btnGrabarUsuariosAdmin") {
		grabarDatosUsuariosAdmin();
	}

	// if(e.target.id == "customSwitchEstadoAdm"){
	// 	let valor = document.getElementById("customSwitchEstadoAdm").checked;
	// 	console.log(valor);
	// }

	// if(e.target.id == "customSwitchEsAdm"){
	// 	let valor = document.getElementById("customSwitchEsAdm").checked;
	// 	console.log(valor);
	// }
});



//-----[Eventos de botones escuchando - PRODUCTOS]-----//