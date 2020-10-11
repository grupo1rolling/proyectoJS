export class Usuario {
	constructor(
		nombre,
		email,
		password,
		codigoProductos = [],
		estadoActivo,
		admin
	) {
		this.nombre = nombre;
		this.email = email;
		this.password = password;
		this.codigoProductos = codigoProductos;
		this.estadoActivo = estadoActivo;
		this.admin = admin;
	}
}

export class Producto {
	constructor(codigo, nombre, precio) {
		this.codigo = codigo;
		this.nombre = nombre;
		this.precio = precio;
		//Agrega Pablo -- falta stock-----------
	}
}