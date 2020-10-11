//import { Usuario, Producto } from "./clases.js";
import { agregarProducto, mostrarProductosUsuario, getProductos, mostrarProductos } from "./funcionesProductos.js";
import { agregarUsuario, getUsuarios, mostrarUsuarios } from "./funcionesUsuarios.js";
import {cargaInicialDatos} from "./funcionesAuxiliares.js";

cargaInicialDatos();

mostrarUsuarios();
mostrarProductos();


