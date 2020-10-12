export class Usuario {
	constructor(nombre, email, password, codigosProductos = [], direccion = [],
		// direccion = {
		// 	dir1,
		// 	dir2,
		// 	provincia,
		// 	localidad,
		// 	cp
		// },
		estado, esAdmin
	) {
		this._nombre = nombre;
		this._email = email;
		this._password = password;
		this._codigosProductos = codigosProductos;
		this._direccion = direccion;
		this._estado = estado;
		this._esAdmin = esAdmin;
	}

	//-----[Getter]-----//
	get nombre() {
		return this._nombre;
	}

	get email() {
		return this._email;
	}

	get password() {
		return this._password;
	}

	get codigosProductos() {
		return this._codigosProductos;
	}

	get direccion() {
		return this._direccion;
	}

	get estado() {
		return this._estado;
	}

	get esAdmin() {
		return this._esAdmin;
	}


	//-----[Setter]-----//
	set nombre(nombre) {
		this._nombre = nombre;
	}

	set email(email) {
		this._email = email;
	}

	set password(password) {
		this._password = password;
	}

	set codigosProductos(codigosProductos) {
		this._codigosProductos = codigosProductos;
	}

	set estado(estado) {
		this._estado = estado;
	}

	set esAdmin(esAdmin) {
		this._esAdmin = esAdmin;
	}
}

export class Producto {
	constructor(codigo, nombre, talle, costo, precio, stock) {
		this._codigo = codigo;
		this._nombre = nombre;
		this._talle = talle;
		this._costo = costo;
		this._precio = precio;
		this._stock = stock;
	}

	// GETTER
	get codigo() {
		return this._codigo;
	}

	get nombre() {
		return this._nombre;
	}

	get talle() {
		return this._talle;
	}

	get costo() {
		return this._costo;
	}

	get precio() {
		return this._precio;
	}

	get stock() {
		return this._stock;
	}

	// SETTER 
	set codigo(codigo) {
		this._codigo = codigo;
	}

	set nombre(nombre) {
		this._nombre = nombre;
	}

	set talle(talle) {
		this._talle = talle;
	}

	set costo(costo) {
		this._costo = costo;
	}

	set precio(precio) {
		this._precio = precio;
	}

	set stock(stock) {
		this._stock = stock;
	}
}
