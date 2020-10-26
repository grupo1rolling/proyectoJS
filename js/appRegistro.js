import { mostrarBtnAceptarReg, registroUsuario } from "./funcionesUsuarios.js";

mostrarBtnAceptarReg();


//-----[Evento de boton escuchando - REGISTRO DE USUARIOS]-----//
const btnModificarUsuario = document.querySelector("#contenedorBtnRegistrar");
btnModificarUsuario.addEventListener("click", (e) => {

	/*Evento del boton para registrar un usuario (Pagina registro.html)*/
	if (e.target.id == "btnAceptarReg") {
		registroUsuario();
	}

});