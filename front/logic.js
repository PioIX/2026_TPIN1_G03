let UserLogged = {}
let coincidencia
let valorPosicion

function coincidir(leerUsername,respuestaUsername) {
    for (i=0; i<leerUsername.length; i++){
        if (leerUsername[i].username == respuestaUsername){
            coincidencia = true
            valorPosicion = i
            console.log("Vieja posicion de I del user: ", valorPosicion)
            break
        } else {
            coincidencia = false
        }
    }
}

async function handleSignup(){
    let respuestaUsername = prompt("Ingrese su nombre de usuario deseado...");
    let leerUsername = await getUsuarioporUsername(respuestaUsername)
    coincidir(leerUsername,respuestaUsername)
    console.log("coincidencia: ",coincidencia)
    while (respuestaUsername == "" || coincidencia == true) {
        respuestaUsername = prompt("Valor en uso o vacio. Por favor, ingrese uno nuevo...")
        coincidir(leerUsername,respuestaUsername)
    }
    let respuestaPassword = prompt("Ingrese su contraseña deseada...")
    while (respuestaPassword === ""){
        respuestaPassword = prompt("Valor vacio. Completelo...")
    }
    alert("Registro exitoso!")
    let newUsuario = new Usuario(leerUsername.id)
    postUsuario(newUsuario)
    return newUsuario.id
}

async function handleLogin(){
    let respuestaUsername = prompt("Ingrese su nombre de usuario...")
    let leerUsername = await getUsuarioporUsername(respuestaUsername)
    coincidir(leerUsername,respuestaUsername)
    if (coincidencia == true) {
        let respuestaPassword = prompt("Ingrese la contraseña del usuario...")
        console.log("Posicion en I del user: ",valorPosicion)
        while (leerUsername[valorPosicion].password !== respuestaPassword){
            respuestaPassword = prompt("La contraseña no es correcta. Vuelva a intentar...")
        }
        alert("Login exitoso!")
        UserLogged = new Usuario(leerUsername[valorPosicion].id)
        UserLogged.updateuser()
        sessionStorage.setItem("User",JSON.stringify(UserLogged))
        window.location.reload()
    } else {
        alert("Usuario no encontrado. Vuelva a intentarlo.")
    }
}

/*nota: borrar usuario vacio que tiene nombre ""*/