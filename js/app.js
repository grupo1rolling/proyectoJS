//import { Usuario, Producto } from "./clases.js";
import { agregarProducto, mostrarProductosUsuario, getProductos, mostrarProductos } from "./funcionesProductos.js";
import { agregarUsuario, getAllUsuarios, mostrarUsuarios } from "./funcionesUsuarios.js";
import {cargaInicialDatos} from "./funcionesAuxiliares.js";

localStorage.clear();
cargaInicialDatos();

mostrarUsuarios();
mostrarProductos();