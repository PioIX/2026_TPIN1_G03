let UserLogged = {}

function handleSignup(){
    let leerUsername = getUsuarioporUsername(respuestaUsername)
    const respuestaUsername = prompt("Ingrese su nombre de usuario deseado...");
    if (respuestaUsername == "" || getUsuarioporUsername(respuestaUsername).length !== 0) {
        const respuestaUsername = prompt("Valor en uso o vacio. Por favor, ingrese uno nuevo...")
    } else {
        const respuestaPassword = prompt("Ingrese su contraseña deseada...")
        if (respuestaPassword == ""){
            const respuestaPassword = prompt("Valor vacio. Completelo...")
        }
    }
    let newUsuario = new Usuario(leerUsername.id)
    postUsuario(newUsuario)
    return newUsuario.id
}

async function handleLogin(){
    const respuestaUsername = prompt("Ingrese su nombre de usuario...")
    const respuestaPassword = prompt("Ingrese la contraseña del usuario...")
    let leerUsername = await getUsuarioporUsername(respuestaUsername)
    console.log(leerUsername.password)
    if (leerUsername.length !== 0) {
        for (i=0; i<leerUsername.length; i++) {
            if (respuestaPassword == leerUsername.password) {
                UserLogged == new Usuario(leerUsername.id)
                UserLogged.updateuser()
            }else {
                alert("La contraseña no es correcta.")
            }
        }
    }
}