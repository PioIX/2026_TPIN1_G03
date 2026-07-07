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
    console.log(leerUsername)
    if (!leerUsername || Object.keys(leerUsername).length===0){
        coincidencia=false
    }else{
        coincidencia=true
    }
    console.log("coincidencia: ",coincidencia)
    while (respuestaUsername == "" || coincidencia == true) {
        respuestaUsername = prompt("Valor en uso o vacio. Por favor, ingrese uno nuevo...")
        leerUsername = await getUsuarioporUsername(respuestaUsername)
        if (!leerUsername || Object.keys(leerUsername).length===0){
        coincidencia=false
        }else{
        coincidencia=true
        }
    }
    let respuestaPassword = prompt("Ingrese su contraseña deseada...")
    while (respuestaPassword === ""){
        respuestaPassword = prompt("Valor vacio. Completelo...")
    }
    
    console.log(leerUsername)
    let newUsuario={
        username: respuestaUsername,
        password: respuestaPassword,
        points: 0,
        is_admin: 0
    }
    console.log(newUsuario)
    
    alert(await postUsuario(newUsuario))
    createduser = await getUsuarioporUsername(respuestaUsername)
    console.log(createduser.id)
    await postEstadistica(createduser.id)
    return newUsuario.id
}

async function handleLogin(){
    let respuestaUsername = prompt("Ingrese su nombre de usuario...")
    let leerUsername = await getUsuarioporUsername(respuestaUsername)
        if (!leerUsername || Object.keys(leerUsername).length===0){
        coincidencia=false
        }else{
        coincidencia=true
        }
    if (coincidencia == true) {
        let respuestaPassword = prompt("Ingrese la contraseña del usuario...")
        while (leerUsername.password !== respuestaPassword){
            respuestaPassword = prompt("La contraseña no es correcta. Vuelva a intentar...")
        }
        alert("Login exitoso!")
        UserLogged = new Usuario(leerUsername.id)
        UserLogged.updateuser()
        sessionStorage.setItem("User",JSON.stringify(UserLogged))
        window.location.reload()
    } else {
        alert("Usuario no encontrado. Vuelva a intentarlo.")
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


async function logout() {
    let tempuser=JSON.parse(sessionStorage.getItem("User"))
    if (tempuser==null){
        alert("No hay usuario iniciado")
    }else if(confirm("¿Está seguro de que quiere cerrar sesión?")){
        sessionStorage.setItem("User",null)
        UserLogged = {}
        alert("Sesión cerrada")
    }

}
/*nota: borrar usuario vacio que tiene nombre ""*/

