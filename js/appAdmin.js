import { mostrarProductos, modificarDatosProductos, grabarModificacionProductoAdmin } from "./funcionesProductos.js";
import { mostrarUsuarios, modificarDatosUsuario, borrarUsuario, grabarModificacionUsuariosAdmin,
		btnModalAltaUsuarioAdminPage, grabarAltaUsuarioAdminPage} from "./funcionesUsuarios.js";
import { cargaInicialDatos } from "./funcionesAuxiliares.js";


localStorage.clear();
cargaInicialDatos();

//actualizarTotalesCarrito(); //actualiza cantidad de productos y total compra en la barra 
//mostrarTarjetas();

mostrarUsuarios();
mostrarProductos();
btnModalAltaUsuarioAdminPage();

//-----[Eventos de botones escuchando - USUARIOS]-----//
const btnModificarUsuario = document.querySelector("#contenedorUsuariosAdmin");
btnModificarUsuario.addEventListener("click", (e) => {

	/*Evento del boton para editar un usuario (Pagina Admin)*/
	if (e.target.id == "btnModificarUsuariosAdmin") {
		modificarDatosUsuario(e.target.dataset.codigo);
	}

	/*Evento del boton para borrar un usuario (Pagina Admin)*/
	if (e.target.id == "btnBorrarUsuariosAdmin") {
		borrarUsuario(e.target.dataset.codigo);
	}
});

//-- ALTA USUARIO --//
const btnAltaUsuarioAdminPage = document.querySelector("#containerBtnAltaUsuarioAdmin");
btnAltaUsuarioAdminPage.addEventListener("click", (e) => {

	/*Evento del boton para editar un usuario (Pagina Admin)*/
	if (e.target.id == "btnGrabarUsuarioPagAdmin") {
		grabarAltaUsuarioAdminPage(e.target.dataset.datosUsuario);
	}
});

/*Evento del boton para guardar los cambios de un usuario (Pagina Admin)*/
const modalModificaUsuarioAdmin = document.querySelector("#modalFooterModifUsuarioAdminPage");
modalModificaUsuarioAdmin.addEventListener("click", (e) => {
	if (e.target.id == "btnGrabarUsuarioModifAdminPage") {
		grabarModificacionUsuariosAdmin();
	}

	//----- USAR PARA CAMBIAR DE COLOR EL TITULO SEGUN EL ESTADO (si hay tiempo) -----//
		// if(e.target.id == "customSwitchEstadoAdm"){
		// 	let valor = document.getElementById("customSwitchEstadoAdm").checked;
		// 	console.log(valor);
		// }

		// if(e.target.id == "customSwitchEsAdm"){
		// 	let valor = document.getElementById("customSwitchEsAdm").checked;
		// 	console.log(valor);
		// }
	//--------------------------------------------------------------------------------//
});



//-----[Eventos de botones escuchando - PRODUCTOS]-----//

const btnModificarProducto = document.querySelector("#contenedorProductosAdmin");
btnModificarProducto.addEventListener("click", (e) => {

	/*Evento del boton para editar un producto (Pagina Admin)*/
	if (e.target.id == "btnModificarProductosAdmin") {
		modificarDatosProductos(e.target.dataset.codigo);
		// console.log("Prueba boton Modificar Producto");
	}

	/*Evento del boton para borrar un producto (Pagina Admin)*/
	if (e.target.id == "btnBorrarProductosAdmin") {
		// borrarProducto(e.target.dataset.codigo);
		console.log("Prueba boton Eliminar Producto");
	}
});


/*Evento del boton para guardar los cambios de un Producto (Pagina Admin)*/
const modalModificaProductoAdmin = document.querySelector("#modalFooterProductos");
modalModificaProductoAdmin.addEventListener("click", (e) => {
	if (e.target.id == "btnGrabarProductoModifAdminPage") {
		grabarModificacionProductoAdmin();
		// console.log("Prueba boton GRABAR Producto");
	}
});