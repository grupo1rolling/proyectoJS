
import { Usuario, Producto } from "./clases.js";
import { agregarProducto, mostrarProductosUsuario, getProductos, mostrarProductos } from "./funcionesProductos.js";
import { agregarUsuario, getAllUsuarios, mostrarUsuarios } from "./funcionesUsuarios.js";

export function cargaInicialDatos() {

	//---------------[Creacion de usuarios (Ejemplo)]---------------//
	let ale = new Usuario("Ale", "aaa@ddd.com", "12345", [1, 5], [], true, false);
	let mary = new Usuario("Mary", "mmary@ddd.com", "65546", [2, 5], [], true, true);
	let silvia = new Usuario("Silvia", "ssilvia@ddd.com", "35215", [3, 4, 5], [], true, false);
	let lucas = new Usuario("Lucas", "llucas@ddd.com", "20565", [1, 2], [], true, true);
	let franco = new Usuario("Franco", "ffranco@ddd.com", "59842", [2, 4, 5], [], true, false);

	let marianela = new Usuario("Marianela", "mn@ddd.com", "sfgfv99", [2, 4, 5], [], false, false);
	let jose = new Usuario("José", "js@ddd.com", "19s8dcdd", [], [], true, false);
	let manuel = new Usuario("Manuel", "mns.sd@ddd.com", "7s8df9sd", [2, 4, 5], [], true, false);
	let juan = new Usuario("Juan", "j.eeerf@ddd.com", "2ds6df54s", [], [], true, false);
	let gabriela = new Usuario("Gabriela", "gg.rter@ddd.com", "98s48s", [], [], true, false);
	let sergio = new Usuario("Sergio", "srgo.ph@ddd.com", "6as4d6a5s4", [1], [], false, false);
	let lourdes = new Usuario("Lourdes", "lou.27@ddd.com", "6as54a", [], [], true, false);

	agregarUsuario(ale);
	agregarUsuario(mary);
	agregarUsuario(silvia);
	agregarUsuario(lucas);
	agregarUsuario(franco);

	agregarUsuario(marianela);
	agregarUsuario(jose);
	agregarUsuario(manuel);
	agregarUsuario(juan);
	agregarUsuario(gabriela);
	agregarUsuario(sergio);
	agregarUsuario(lourdes);

	mostrarProductosUsuario(ale);

	//---[Creacion de Productos (por instancias de objetos)]
	let pantalon1 = new Producto(1, "Pantalon1", "M", 600, 800, 20);
	let pantalon2 = new Producto(2, "Pantalon2", "M", 580, 700, 0);
	let pantalon3 = new Producto(3, "Pantalon3", "M", 700, 850, 3);
	let pantalon4 = new Producto(4, "Pantalon4", "M", 650, 860, 15);
	let pantalon5 = new Producto(5, "Pantalon5", "M", 590, 790, 23);
	let pantalon6 = new Producto(6, "Pantalon6", "M", 610, 810, 5);

	//-- Llamado a las funciones
	agregarProducto(pantalon1);
	agregarProducto(pantalon2);
	agregarProducto(pantalon3);
	agregarProducto(pantalon4);
	agregarProducto(pantalon5);
	agregarProducto(pantalon6);

	//mostrarProductosUsuario(ale);
}