export class Usuario {
	constructor(codigo, nombre, apellido, email, password, codigosProductos = [], direccion = [],
		// direccion = {
		// 	dir1,
		// 	dir2,
		// 	provincia,
		// 	localidad,
		// 	cp
		// },
		estado, esAdmin
	) {
		this._codigo = codigo;
		this._nombre = nombre;
		this._apellido = apellido;
		this._email = email;
		this._password = password;
		this._codigosProductos = codigosProductos;
		this._direccion = direccion;
		this._estado = estado;
		this._esAdmin = esAdmin;
	}

	// OBSERVACION : podemos cambiar Apellido por usuario y en la funcion login
	//function checkLogin(mailL, passL) {
	// 	usuarioOK = usuariosArray.find(item => {
	// 		return (item._email === mailL||item_usuario === mailL) && (item._password === passL)
	// 	})
	// }
	//-----[Getter]-----//
	get codigo() {
		return this._codigo;
	}

	get nombre() {
		return this._nombre;
	}

	get apellido() {
		return this._apellido;
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
	set codigo(codigo) {
		this._codigo = codigo;
	}

	set nombre(nombre) {
		this._nombre = nombre;
	}

	set apellido(apellido) {
		this._apellido = apellido;
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


//CHECK QUE  DESCRIPCION TENGA LA MISMA CANT DE CARACTERES PARA QUE LAS CARD QUEDEN IGUALES Y NO UNA MAS ALTA QUE LA OTRA
export class Producto {
	constructor(codigo, nombre, descripcion, talle, foto, precio, stock, categoria) {
		this._codigo = codigo;
		this._nombre = nombre;
		this._descripcion = descripcion;
		this._talle = talle;
		this._foto = foto;
		this._precio = precio;
		this._stock = stock;
		this._categoria = categoria;
	}

	//-----[Getter]-----//
	get codigo() {
		return this._codigo;
	}

	get nombre() {
		return this._nombre;
	}

	get descripcion() {
		return this._descripcion;
	}

	get talle() {
		return this._talle;
	}

	get foto() {
		return this._foto;
	}

	get precio() {
		return this._precio;
	}

	get stock() {
		return this._stock;
	}

	get categoria() {
		return this._categoria;
	}

	//-----[Setter]-----//
	set codigo(codigo) {
		this._codigo = codigo;
	}

	set nombre(nombre) {
		this._nombre = nombre;
	}

	set descripcion(descripcion) {
		this.decripcion=descripcion;
	}

	set talle(talle) {
		this._talle = talle;
	}

	set foto(foto) {
		this._foto = foto;
	}

	set precio(precio) {
		this._precio = precio;
	}

	set stock(stock) {
		this._stock = stock;
	}

	set categoria(categoria) {
		this.categorias=categoria;
	}
}

export class ItemCarrito {
	constructor (idProd, nomProd, cantProd, precioProd)  {
		this._idProd = idProd;
		this._nomProd = nomProd;
		this._cantProd = cantProd;
		this._precioProd = precioProd;
	}

	//-----[Getter]-----//
	get idProd() {
		return this._idProd;
	}

	get nomPrd() {
		return this._nomProd;
	}

	get cantProd() {
		return this._cantProd;
	}

	get precioProd() {
		return this._precioProd;
	}

	//-----[Setter]-----//
	set idProd(idProd) {
		this._idProd = idProd;
	}

	set nomPrd(nomProd) {
		this._nomProd = nomProd;
	}

	set cantProd(cantProd) {
		this._cantProd = cantProd;
	}

	set precioProd(precioProd) {
		this._precioProd = precioProd;
	}
}
