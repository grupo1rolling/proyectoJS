import { Usuario, ItemCarrito } from "./clases.js";
import { agregarProducto, mostrarProductos,  } from "./funcionesProductos.js";
import { agregarUsuario, mostrarUsuarios } from "./funcionesUsuarios.js";
import { actualizarTotalesCarrito, mostrarTarjetas } from "./funcionesCarrito.js";

localStorage.clear();
cargaInicialDatos();

actualizarTotalesCarrito(); //actualiza cantidad de productos y total compra en la barra
mostrarTarjetas();

mostrarUsuarios();
mostrarProductos();

function cargaInicialDatos() {
    // -------------- [inicializamos ADMINISTRADOR)] -------------- //
	let admin = new Usuario(0, "Administrador", "Supremo","admin@naturecollection.com", "admin", [], [], true, true);
	agregarUsuario(admin);
	//---------------[Creacion de usuarios (Ejemplo)]---------------//
	let ale = new Usuario(1, "ALE", "CAROL","ale@ale.com", "12345", [], [], true, false);
	let mary = new Usuario(2, "MARY","BOSCH" ,"mary@mary.com", "65546", [], [], true, true);
	let silvia = new Usuario(3, "SILVIA", "SOSA", "silvia@silvia", "lalala", [], [], true, false);
	let lucas = new Usuario(4, "LUCAS", "RAMUNNI","lucas@lucas.com", "20565", [], [], true, true);
    let franco = new Usuario(5, "FRANCO", "LEIRO","franco@franco.com", "59842", [], [], true, false);
    // -------- [Agregamos usuarios (por instancias de objetos)] -------- //
	agregarUsuario(ale);
	agregarUsuario(mary);
	agregarUsuario(silvia);
	agregarUsuario(lucas);
	agregarUsuario(franco);

	// ---------- [Creacion de Productos (por instancias de objetos)] ---------- //
	let prod1 = new Producto(1, "prod uno", "ideal para primavera verano", "M", "C:\Users\Silvia\Desktop\_ProyectoJS-G1\img\tMedidasTop.jpg", 750, 3, ["frío","viajar" ]);
	let prod2 = new Producto(2, "prod dos", "ideal para primavera verano", "G", "C:\Users\Silvia\Desktop\_ProyectoJS-G1\img\tTalleBoxer.jpg", 1000, 4, ["calor","viajar" ]);
	let prod3 = new Producto(3, "prod tres",  "ideal para primavera verano", "U", "C:\Users\Silvia\Desktop\_ProyectoJS-G1\img\tMedidasTop.jpg", 1999,99, 3, ["calor","todos los días" ]);
	let prod4 = new Producto(4, "prod cuatro","ideal para primavera verano", "P", "C:\Users\Silvia\Desktop\_ProyectoJS-G1\img\tTalleBoxer.jpg", 999,9, 3, ["calor"]);
	let prod5 = new Producto(5, "prod cinco", "ideal para primavera verano", "M", "C:\Users\Silvia\Desktop\_ProyectoJS-G1\img\tMedidasTop.jpg", 799,99, 1, ["todos los días" ]);
	let prod6 = new Producto(6, "prod seis","ideal para primavera verano", "M", "C:\Users\Silvia\Desktop\_ProyectoJS-G1\img\tMedidasTop.jpg", 850, 3, ["frío" ]);
	// -------- [Agregamos Productos a la BD (por instancias de objetos)] -------- //
	agregarProducto(prod1);
	agregarProducto(prod2);
	agregarProducto(prod3);
	agregarProducto(prod4);
	agregarProducto(prod5);
	agregarProducto(prod6);
}