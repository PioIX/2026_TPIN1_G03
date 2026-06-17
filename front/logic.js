let UserLogged = {} // despues = objeto de usuario loggeado


function handleSignup(){
    const username = prompt("Ingrese su nombre de usuario deseado...");
    if (username == "" || getUsuarioporUsername(username).length !== 0) {
        const username = prompt("Valor en uso o vacio. Por favor, ingrese uno nuevo...")
    } else {
        const password = prompt("Ingrese su contraseña deseada...")
        if (password == ""){
            const password = prompt("Valor vacio. Completelo...")
        }
    }

    // let idUsuario = login(username, password)
    // if (idUsuario = 0) {
    //     return 0
    // } else {
    //     let newUsuario = new Usuario(idUser)
    //     users.push(newUsuario)
    //     return newUsuario.idUser
    // }
}

function login(username,password){
    for (let i = 0; i < users.length; i++) {
        if (username == users[i].username) {
            if (password == users[i].password) {
                return users[i].idUser /*<-- hacer que retorne id del logeado*/
            } else {
                return 0
            }
        }
    }
    return -1
}

function handleLogin(username,password){
    const username = prompt("Ingrese su nombre de usuario...")
    const password = prompt("Ingrese la contraseña del usuario...")
    
    let idUsuario = login(username, password)
    if (idUsuario == -1) {
        alert("Usuario no reconocido")
    } else if (idUsuario == 0) {
        alert("Una contraseña mas mi gente")
    } else {
        UserLogged = 
    }
}

// el array users es inutil porque tenemos fetch de base de datos. Usa eso como "getUsuarioporUsername(username)"
//if getUsuarioporUsername() == 0 (para ver si retorna algo en caso de logear algo que no existe)