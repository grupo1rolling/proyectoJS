import { Usuario, Producto } from "./clases.js";
import { agregarProducto, getProductos } from "./funcionesProductos.js";
import { agregarUsuario, getAllUsuarios } from "./funcionesUsuarios.js";


// ------------- [Carga inicial de datos USUARIOS Y PRODUCTOS] ------------- //
export function cargaInicialDatos() {
	localStorage.clear();
	// -------------- [Inicializacion de ADMINISTRADOR)] -------------- //
	let admin = new Usuario(0, "Administrador", "Supremo", "admin@naturecollection.com", "admin", [], { dir1: "", dir2: "", ciudad: "San Miguel de Tucumán", provincia: "Tucumán", codPostal: 4000 }, true, true);
	agregarUsuario(admin);

	//---------------[Creacion de usuarios (Ejemplo)]---------------//
	let ale = new Usuario(1, "ALE", "CAROL", "ale@ale.com", "12345", [1001, 1002], { dir1: "Av. Belgrano 2500", dir2: "", ciudad: "San Miguel de Tucumán", provincia: "Tucumán", codPostal: 4000 }, true, false);
	let mary = new Usuario(2, "MARY", "BOSCH", "mary@mary.com", "65546", [1001, 1002, 1003, 1005, 1006], { dir1: "Marcos Paz 2500", dir2: "", ciudad: "Carlos Paz", provincia: "Córdoba", codPostal: 4000 }, true, false);
	let silvia = new Usuario(3, "SILVIA", "SOSA", "silvia@silvia.com", "lalala", [], { dir1: "San Juan 650", dir2: "", ciudad: "San Salvador de Jujuy", provincia: "Jujuy", codPostal: 4000 }, true, true);
	let lucas = new Usuario(4, "LUCAS", "RAMUNNI", "lucas@lucas.com", "20565", [], { dir1: "Av. Roca 1100", dir2: "", ciudad: "La Plata", provincia: "Buenos Aires", codPostal: 4000 }, true, false);
	let franco = new Usuario(5, "FRANCO", "LEIRO", "franco@franco.com", "59842", [1002, 1006, 1003], { dir1: "Av. Mate de Luna 750", dir2: "", ciudad: "Metam", provincia: "Salta", codPostal: 4000 }, true, false);

	// -------- [Agregamos usuarios (por instancias de objetos)] -------- //
	agregarUsuario(ale);
	agregarUsuario(mary);
	agregarUsuario(silvia);
	agregarUsuario(lucas);
	agregarUsuario(franco);

	// ---------- [Creacion de Productos (por instancias de objetos)] ---------- //
	let prod1 = new Producto(1001, "Sweater", "Ideal para los días más fríos", "M", "https://via.placeholder.com/150/f66b97", 750, 2, "Frío");
	let prod2 = new Producto(1002, "Top", "Ideal para días más cálidos", "S", "https://via.placeholder.com/150/24f355", 1000, 2, "Calor");
	let prod3 = new Producto(1003, "Short de baño", "Para la piscina o la playa", "G", "https://via.placeholder.com/150/771796", 1810, 3, "Calor");
	let prod4 = new Producto(1004, "Bolso extensible", "Para todo lo que necesites llevar", "U", "https://via.placeholder.com/150/92c952", 999, 3, "Viaje");
	let prod5 = new Producto(1005, "Jeans", "Jeans unisex negros", "M", "https://via.placeholder.com/150/f66b97", 876, 0, "Todos los días");
	let prod6 = new Producto(1006, "Polar", "Polar gris", "U", "https://via.placeholder.com/150/771796", 850, 3, "Frío");

	// -------- [Agregamos Productos a la BD (por instancias de objetos)] -------- //
	agregarProducto(prod1);
	agregarProducto(prod2);
	agregarProducto(prod3);
	agregarProducto(prod4);
	agregarProducto(prod5);
	agregarProducto(prod6);

} // FIN [carga inicial de datos PRODUCTOS Y USUARIOS]

export function getTalles() {
	let arrayTalles = [];
	return arrayTalles = ["XS", "S", "M", "L", "XL", "G", "U"];
}

export function getCategorias() {
	let arrayCategorias = [];
	return arrayCategorias = [
		"Frío",
		"Calor",
		"Viajar",
		"Todos los días"
	];
}

export function getCodigoGeneradoByKey(tabla) {
	let cantRegistros = 0;
	let datosArray = [];
	let codigosDatosArray = [];
	let maxCodigo = 0;

	switch (tabla) {
		case "usuarios":
			datosArray = getAllUsuarios();
			break;

		case "productos":
			datosArray = getProductos();
			break;

		default:
			break;
	}

	cantRegistros = datosArray.length;

	if (cantRegistros > 0) {
		codigosDatosArray = datosArray.map((item) => {
			return item._codigo;
		});

		maxCodigo = Math.max.apply(null, codigosDatosArray);
		maxCodigo += 1;
	}
	else {
		maxCodigo = 1;
	}

	return maxCodigo;
}

export function getProvincias() {
	let arrayProvincias = [];
	return arrayProvincias = [
		"Buenos Aires",
		"Catamarca",
		"Chaco",
		"Chubut",
		"Córdoba",
		"Corrientes",
		"Entre Ríos",
		"Formosa",
		"Jujuy",
		"La Pampa",
		"La Rioja",
		"Mendoza",
		"Misiones",
		"Neuquén",
		"Río Negro",
		"Salta",
		"San Juan",
		"San Luis",
		"Santa Cruz",
		"Santa Fe",
		"Santiago",
		"Tierra del Fuego",
		"Tucumán"
	];
}

//VALIDACION DE CONTRASENIA
export function validarPassword(pass) {
	if (pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/)) {
		console.log(`${pass}: True`);
		return true;
	} else {
		alert("La contraseña no cumple las condiciones requeridas.\n\nDebe contener:\n♦ Entre 8 y 15 caracteres.\n♦ Al menos una letra mayúscula.\n♦ Al menos una letra minúscula.\n♦ Al menos un dígito.\n♦ No espacios en blanco.\n♦ Al menos un caracter especial.");
		console.log(`${pass}: False`);
		return false
	}
}


