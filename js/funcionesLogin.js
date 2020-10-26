
 
// ------------------- [inicializamos variables] ------------------- //      
let usuarioLog = {
         idUsuario: "",
         autenticado: "false",
    };
localStorage.setItem("log", JSON.stringify(usuarioLog));
usuarioLog = JSON.parse(localStorage.getItem("log"));

let dbUsuarios=[];
let emailLogin, passwordLogin;
let usuarioOK = null;
// --------------------- [llamado a funciones] --------------------- //

getUsuarios();

// ------------- [traemos dbUsuarios del localStorage] ------------- //          
function getUsuarios() {
	dbUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
} // fin getUsuarios()

// -----------------  [Obtenemos datos del fLogin] ----------------- //
document
  .getElementById("flogin")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    //
    mailLogin=document.getElementById("mailLogin").value;
    passwordLogin=document.getElementById("passwordLogin").value;

    if (mailLogin === "" || passwordLogin === "") {
        return alert("Debe completar los campos");
    }
        
    checkLogin(mailLogin, passwordLogin);

    if (usuarioOK != null) {
        alert("usuario confirmado");
        // enviamos al localStorage el usuario autenticado=true
        usuarioLog.idUsuario=usuarioOK._codigo;
        usuarioLog.autenticado='true';
        localStorage.setItem("log", JSON.stringify(usuarioLog));
    } else {
        alert("usuario o contraseña incorrectos");
        }
   
    fLoginLimpiar();
    console.warn(usuarioLog);
  });

// ------------------------ [limpia fLogin] ------------------------ //
function fLoginLimpiar() {
    document.getElementById("mailLogin").value = "";
    document.getElementById("passwordLogin").value = "";
} // fin fLoginLimpiar

// -------- función que chequea el mail y password de usuariosArray -------- //
function checkLogin(mailL, passL) {
    usuarioOK = dbUsuarios.find(item => {
        return ((item._email === mailL) && (item._password === passL)) ;
    })
} // fin checkLogin
//si chequeamos que tambien esté activo
/*
function checkLogin(mailL, passL) {
    usuarioOK = dbUsuarios.find(item => {
        return (((item._email === mailL) && (item._password === passL)) && item._estado==true);
    })
}
*/

// -------------------- [olvidaste contraseña] --------------------- //
function olvidoPass() {
    let mailUsuario = document.getElementById('mailOlvidoPass').value;
    emailOlvidoLleno(mailUsuario);
    getUsuarios();
    traerUsuario(mailUsuario);
    if (usuarioOK != null) {
        alert('revisa tu correo');
    } else {
        alert("usuario inexistente");
    }
} // fin olvidoPass

// ---------------------- [emailOlvidoLleno] --------------------- //
function emailOlvidoLleno(mail) {
    if (!!mail) {
        return true;
    } else {
        alert("Debe completar el correo electrónico");
        return false;
    }
} // fin emailOlvidoLleno

// ------------------------- [traeUsuario] ------------------------- //
function traerUsuario(mail) {
    usuarioOK = dbUsuarios.find(item => {
        return (item._email === mail);
    })
} // fin traerUsuario

// ------------------------ [limpia fOlvido] ----------------------- //
function fOlvidoLimpiar() {
    document.getElementById("mailLogin").value = "";
}