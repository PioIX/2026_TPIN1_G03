let UserLogged = {} // despues = objeto de usuario loggeado


function handleSignup(){
    const respuestaUsername = prompt("Ingrese su nombre de usuario deseado...");
    if (respuestaUsername == "" || getUsuarioporUsername(respuestaUsername).length !== 0) {
        const respuestaUsername = prompt("Valor en uso o vacio. Por favor, ingrese uno nuevo...")
    } else {
        const respuestaPassword = prompt("Ingrese su contraseña deseada...")
        if (respuestaPassword == ""){
            const respuestaPassword = prompt("Valor vacio. Completelo...")
        }
    }
    let newUsuario = new Usuario(idUser)
    postUsuario(newUsuario)
    return newUsuario.idUser
}

function handleLogin(){
    const respuestaUsername = prompt("Ingrese su nombre de usuario...")
    const respuestaPassword = prompt("Ingrese la contraseña del usuario...")
    let leerUsername = getUsuarioporUsername(respuestaUsername)

    if (leerUsername.length !== 0) {
        if (respuestaPassword == leerUsername.password) {
            UserLogged = new Usuario(leerUsername.id)
            UserLogged.updateuser()
        }else {
            alert("La contraseña no es correcta.")
        }
    }
}

function tryAdmin() {
    if (UserLogged.is_admin == true) {
        window.location.href = 'admin.html'
    } else if (UserLogged.is_admin == false) {
        alert("Este usuario no cuenta con privilegios de administracion.")
    } else {
        alert("No hay usuario logueado.")
    }
}