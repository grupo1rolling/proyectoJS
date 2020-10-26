import { cargaInicialDatos } from "./funcionesAuxiliares.js";
import { mostrarProductos, modificarAgregarDatosProductos, /*modificarDatosProductos,*/ /*grabarModificacionProductoAdmin,*/ grabarModificacionAltProductoAdmin, borrarProducto } from "./funcionesProductos.js";
import {
	mostrarUsuarios, modificarDatosUsuario, borrarUsuario, grabarModificacionUsuariosAdmin,
	btnModalAltaUsuarioAdminPage, grabarAltaUsuarioAdminPage, verProductosUsuariosAdmin, modalConfirmarBorrado
} from "./funcionesUsuarios.js";


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
	if (e.target.id == "btnConfirmarBorrado") {
		modalConfirmarBorrado(e.target.dataset.codigo, e.target.dataset.tabla);
	}

});

const btnCofirmarBorrado = document.querySelector("#modalConfirmaBorrado");
btnCofirmarBorrado.addEventListener("click", (e) => {

	/*Evento del boton para borrar un usuario (Pagina Admin)*/
	if (e.target.id == "btnBorrarConfirmado") {
		
		switch (e.target.dataset.tabla) {
			case "usuarios":
				borrarUsuario(e.target.dataset.codigo);
				break;
		
			case "productos":
				borrarProducto(e.target.dataset.codigo);
				break;
		
			default:
				break;
		}
		
	}

	/*Evento del boton para borrar un producto (Pagina Admin)*/
	// if (e.target.id == "btnBorrarProductosAdmin") {
	// 	borrarProducto(e.target.dataset.codigo);
	// 	//console.log("Prueba boton Eliminar Producto");
	// }
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
		// modificarDatosProductos(e.target.dataset.codigo);
		modificarAgregarDatosProductos(e.target.dataset.codigo);
		// console.log("Prueba boton Modificar Producto");
	}

	/*Evento del boton para borrar un producto (Pagina Admin)*/
	if (e.target.id == "btnConfirmarBorradoProd") {
		modalConfirmarBorrado(e.target.dataset.codigo, e.target.dataset.tabla);
		//console.log("Prueba boton Eliminar Producto");
	}

});

const btnAltaProducto = document.querySelector("#contenedorAltaProductosAdmin");
btnAltaProducto.addEventListener("click", (e) => {

	/*Evento del boton para editar un producto (Pagina Admin)*/
	if (e.target.id == "btnAgregarProductosAdmin") {
		modificarAgregarDatosProductos(e.target.dataset.codigo);
		// console.log("Prueba boton Modificar Producto");
	}
});

/*Evento del boton para guardar los cambios de un Producto (Pagina Admin)*/
const modalModificaProductoAdmin = document.querySelector("#modalFooterProductos");
modalModificaProductoAdmin.addEventListener("click", (e) => {
	if (e.target.id == "btnGrabarProductoModifAdminPage") {
		//grabarModificacionProductoAdmin();
		grabarModificacionAltProductoAdmin(e.target.dataset.accion);
		// console.log("Prueba boton GRABAR Producto");
	}
});

/*Evento del boton para guardar los cambios de un Producto (Pagina Admin)*/
const productosUsuarioAdmin = document.querySelector("#contenedorUsuariosAdmin");
productosUsuarioAdmin.addEventListener("click", (e) => {
	if (e.target.id == "btnProductosUsuariosAdminPage") {
		//grabarModificacionProductoAdmin();
		verProductosUsuariosAdmin(e.target.dataset.codigo);
		// console.log("Prueba boton GRABAR Producto");
	}
});

