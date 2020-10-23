import { Usuario} from "./clases.js";
import { agregarProducto } from "./funcionesProductos.js";
import { agregarUsuario } from "./funcionesUsuarios.js";
import { cargaInicialDatos, actualizarTotalesCarrito, mostrarTarjetas } from "./funcionesCarrito.js";

localStorage.clear();
cargaInicialDatos();

actualizarTotalesCarrito(); //actualiza cantidad de productos y total compra en la barra 
mostrarTarjetas();

mostrarUsuarios();
mostrarProductos();