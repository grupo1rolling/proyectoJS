class Usuario 
{ 
    constructor(codigo, nombre, apellido, email, password, codigosProductos = [], direccion = [], 
        estado, esAdmin) 
    {
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


// ------------------------   Inicializamos -------------------//
localStorage.clear();
let admin = new Usuario(0, "Administrador", "Supremo", "admin@naturecollection.com", "admin", [], [], true, true);
agregarUsuario(admin);
let usuarioOK; mailLogin; passwordLogin; 

//---------------[Creacion de usuarios (Ejemplos)]---------------//
let ale = new Usuario(1, "Ale", "Ale", "aaa@ddd.com", "12345", [1, 5], [], true, false);
let mary = new Usuario(2, "Mary", "Mary", "mmary@ddd.com", "65546", [2, 5], [], true, true);
let silvia = new Usuario(3, "SILVIA", "SOSA", "silviaesgrima@gmail.com", "lalala", [3, 4, 5], [], true, false);
let lucas = new Usuario(4, "Lucas", "Lucas", "llucas@ddd.com", "20565", [1, 2], [], true, true);
let franco = new Usuario(5, "Franco", "Franco", "ffranco@ddd.com", "59842", [2, 4, 5], [], true, false);
agregarUsuario(ale);
agregarUsuario(mary);
agregarUsuario(silvia);
agregarUsuario(lucas);
agregarUsuario(franco);
// -------------------------------------------------------------//




// ------- funcion que se invoca antes de agregar usuario ------- //
function existeUsuario(usuario) {
	let usuariosArray = getAllUsuarios();

	let existeUsuario = usuariosArray.find(item => {
		return item._email == usuario.email ? true : false;
	});

	return existeUsuario;
}
// -------------------------------------------------------------//
// --------------------- Agregar Usuarios --------------------- //
function agregarUsuario(usuario) {
	let usuariosArray = [];
	let existeUs = false;
	//-- Verifico si ya existe el nombre de Usuario ingresado
	existeUs = existeUsuario(usuario);

	if (existeUs) {
		console.log("Usuario existente");
	} else {
		usuariosArray = getAllUsuarios();
		usuariosArray.push(usuario);
		localStorage.setItem("usuarios", JSON.stringify(usuariosArray));
	}
}
// -------------------------------------------------------------//

// ---------- bajamos el localStorage a usuariosArray ----------//
function getAllUsuarios() {
    usuariosArray =
        JSON.parse(localStorage.getItem("usuarios")) == null
            ? []
            : JSON.parse(localStorage.getItem("usuarios"));
    return usuariosArray;
}
// ------------------------------------------------------------ //
// ----------- Obtenemos datos del form de REGISTRO ----------- //
function obtenerDatos() {
    //SIN VALIDAR AUN
    // nombre, apellido, email
    let nombre = document.getElementById("nombre").value.toUpperCase();
    let apellido = document.getElementById("apellido").value.toUpperCase();
    let email = document.getElementById("email").value.toLowerCase();
  
    //contraseña
    let pass = document.getElementById("contrasena").value;
    let repPass= document.getElementById("repContrasena").value;
    password= checkPass(pass, repPass);
    
    //direccion
    let dir=document.getElementById("direccion").value;
    let dirAdc=document.getElementById("direccionAdc").value;
    let ciudad=document.getElementById("ciudad").value;
    let pcia = document.getElementById("provincia");
    let pciaSeleccionada = pcia.options[pcia.selectedIndex].value;
    let zip=document.getElementById("zip").value;
    //ponemos la direccion en un array 
    let direccion=[];
    direccion.push(dir, dirAdc, ciudad, pciaSeleccionada, zip); 
    
    //boletin
    let boletin = document.getElementById("boletin").checked;
       
    //creamos INSTANCIA DE LA CLASE USUARIO
    let estado, admin, codUsuario="US", codigosProductos;
    usuario= new Usuario (codigo, nombre, apellido, email, password, codigosProductos, direccion, estado, admin);
    codUsuario=codUsuario+usuariosArray.lenght*10;
    //inicializamos INSTANCIA USUARIO
    usuario.codigo = codUsuario;
    usuario.nombre = nombre;
    usuario.apellido= apellido;
	usuario.email = email;
	usuario.password = password;
    usuario.codigosProductos = [];
    usuario.direccion=direccion; 
    usuario.estado=true;
    usuario.admin=false;  
    
    existeUsuario(usuario);
    if (existe!=null) {
        alert('el usuario ya existe');
    }   else {
        usuarios.push(usuario);
        localStorage.setItem('usuario',JSON.stringify(usuarios))
        } 

} //fin de obtenerDatos() del registro de usuarios









// ------------  Obtenemos datos del form de LOGIN ------------ //

const form = document.forms.flogin
function formLogLleno() {
    if (!!form.mailLogin.value && !!form.passwordLogin.value ) {
        return true
    } else {
        alert("Debe completar el formulario")
        return false
    }
}

function formLimpiar() {
    form.emailLogin.value = ""
    form.passwordLogin = ""
}

function obtenerDatosLogin() {
   
    formLogLleno();
    mailLogin = form.mailLogin.value.toLowerCase();
    passwordLogin = form.passwordLogin.value;
    
    checkLogin(mailLogin, passwordLogin);

    if (usuarioOK != null) {
        console.log(`usuario confirmado`);


        //////HAY QE MANDAR AL LOCAL STORAGE EL USUARIO ACTIVO
    } else {
        window.alert("usuario o contraseña incorrectos");
    }
}
// -------------------------------------------------------------//

// -- función que chequea el mail y password de usuariosArray --//
function checkLogin(mailL, passL) {
    usuarioOK = usuariosArray.find(item => {
        return (item._email === mailL) && (item._password === passL)
    })
}
// ------------------------------------------------------------ //
// ------------------- olvidaste contraseña ------------------- //

function olvidoPass() {
    let mailUsuario = document.getElementById('mailOlvidoPass').value;
    emailOlvidoLleno(mailUsuario);
    getAllUsuarios();
    traerUsuario(mailUsuario)
    if (usuarioOK != null) {
        alert('revisa tu correo');
    } else {
        alert("usuario inexistente");
    }

}


function emailOlvidoLleno(mail) {
    if (!!mail) {
        return true
    } else {
        alert("Debe completar el correo electrónico")
        return false
    }
}

function traerUsuario(mail) {
    usuarioOK = usuariosArray.find(item => {
        return (item._email === mail) 
    })
}