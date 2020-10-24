
import { Usuario, Producto } from "./clases.js";
import { agregarProducto, mostrarProductosUsuario, getProductos, mostrarProductos } from "./funcionesProductos.js";
import { agregarUsuario, getAllUsuarios, mostrarUsuarios } from "./funcionesUsuarios.js";

export function cargaInicialDatos() {

	// -------------- [Creacion del SUPER-ADMINISTRADOR)] -------------- //
	let admin = new Usuario(0, "Administrador", "Supremo", "admin@naturecollection.com", "admin", [], [], true, true);
	agregarUsuario(admin);

	//---------------[Creacion de usuarios (Ejemplo)]---------------//
	let ale = new Usuario(1, "ALE", "CAROL", "ale@ale.com", "12345", [], [], true, false);
	let mary = new Usuario(2, "MARY", "BOSCH", "mary@mary.com", "65546", [], [], true, true);
	let silvia = new Usuario(3, "SILVIA", "SOSA", "silvia@silvia", "lalala", [], [], true, false);
	let lucas = new Usuario(4, "LUCAS", "RAMUNNI", "lucas@lucas.com", "20565", [], [], true, true);
	let franco = new Usuario(5, "FRANCO", "LEIRO", "franco@franco.com", "59842", [], [], true, false);

	let marianela = new Usuario(6, "Marianela", "Mariela", "mn@ddd.com", "sfgfv99", [2, 4, 5], [], false, false);
	let jose = new Usuario(7, "José", "Jose", "js@ddd.com", "19s8dcdd", [], [], true, false);
	let manuel = new Usuario(8, "Manuel", "Manuel", "mns.sd@ddd.com", "7s8df9sd", [2, 4, 5], [], true, false);
	let juan = new Usuario(9, "Juan", "Juan", "j.eeerf@ddd.com", "2ds6df54s", [], [], true, false);
	let gabriela = new Usuario(10, "Gabriela", "Gabriela", "gg.rter@ddd.com", "98s48s", [], [], true, false);
	let sergio = new Usuario(11, "Sergio", "Díaz", "srgo.ph@ddd.com", "6as4d6a5s4", [1], [], false, false);
	let lourdes = new Usuario(12, "Lourdes", "Lourdes", "lou.27@ddd.com", "6as54a", [], [], true, false);

	// -------- [Agregamos usuarios (por instancias de objetos)] -------- //
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

	// mostrarProductosUsuario(ale);

	// PREGUNTAR CUAL DE LAS 2 CREACIONES DE PRODUCTOS VA.............................
	// // ---------- [Creacion de Productos (por instancias de objetos)] ---------- //
	// let prod1 = new Producto(1, "prod uno", "ideal para primavera verano", "M", "http2.gravatar.comavatarbe47344067db1d41b3e366b5877b558d", 750, 3,"frio");
	// let prod2 = new Producto(2, "prod dos", "ideal para primavera verano", "G", "http2.gravatar.comavatarbe47344067db1d41b3e366b5877b558d", 1000, 4, "calor");
	// let prod3 = new Producto(3, "prod tres",  "ideal para primavera verano", "U", "http2.gravatar.comavatarbe47344067db1d41b3e366b5877b558d", 1999,99, 3, "calor");
	// let prod4 = new Producto(4, "prod cuatro","ideal para primavera verano", "P", "http2.gravatar.comavatarbe47344067db1d41b3e366b5877b558d", 999,9, 3, "calor");
	// let prod5 = new Producto(5, "prod cinco", "ideal para primavera verano", "M", "http2.gravatar.comavatarbe47344067db1d41b3e366b5877b558d", 799,99, 1, "todos_los_dias");
	// let prod6 = new Producto(6, "prod seis","ideal para primavera verano", "M", "http2.gravatar.comavatarbe47344067db1d41b3e366b5877b558d", 850, 3, "frío");

	// // -------- [Agregamos Productos a la BD (por instancias de objetos)] -------- //
	// agregarProducto(prod1);
	// agregarProducto(prod2);
	// agregarProducto(prod3);
	// agregarProducto(prod4);
	// agregarProducto(prod5);
	// agregarProducto(prod6);

	let prod1 = new Producto(1, "prod uno", "Ideal para los días más fríos", "M", "https://via.placeholder.com/150/f66b97", 750, 3, "Frío");
	let prod2 = new Producto(2, "prod dos", "Ideal para primavera verano", "X", "https://via.placeholder.com/150/24f355", 1000, 4, "Calor");
	let prod3 = new Producto(3, "prod tres", "Ideal para primavera verano", "XS", "https://via.placeholder.com/150/771796", 1999, 99, "Calor");
	let prod4 = new Producto(4, "prod cuatro", "Ideal para viajar en verano", "S", "https://via.placeholder.com/150/92c952", 999, 9, "Viajar");
	let prod5 = new Producto(5, "prod cinco", "Ideal para cada día", "L", "https://via.placeholder.com/150/f66b97", 799, 99, "Todos los días");
	let prod6 = new Producto(6, "prod seis", "Ideal para viajar cómoda", "XL", "https://via.placeholder.com/150/771796", 850, 3, "Viajar");

	// -------- [Agregamos Productos a la BD (por instancias de objetos)] -------- //
	agregarProducto(prod1);
	agregarProducto(prod2);
	agregarProducto(prod3);
	agregarProducto(prod4);
	agregarProducto(prod5);
	agregarProducto(prod6);
}

export function getTalles(){
	let arrayTalles = [];
	return arrayTalles = ["XS", "S", "M", "L", "XL"];
}

export function getCategorias(){
	let arrayCategorias = [];
	return arrayCategorias = [
		"Frío",
		"Calor",
		"Viajar",
		"Todos los días"
	];
}
