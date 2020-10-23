import { mostrarProductos } from "./funcionesProductos.js";
import { mostrarUsuarios } from "./funcionesUsuarios.js";
import { cargaInicialDatos } from "./funcionesAuxiliares.js";

localStorage.clear();
cargaInicialDatos();

//actualizarTotalesCarrito(); //actualiza cantidad de productos y total compra en la barra 
// mostrarTarjetas();

mostrarUsuarios();
mostrarProductos();