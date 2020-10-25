
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