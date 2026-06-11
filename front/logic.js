let users = []
let UserLogged = {} // despues newuser.idUser


function handleSignup(){
    const username = prompt("Ingrese su nombre de usuario deseado...");
    while (username == ""){
        const username = prompt("Llena los campos...")
    }
    for (i=0; i<users.length; i++) {
        while (username == users[i].username){
            const username = prompt("Nombre de usuario en uso. Por favor, ingrese uno nuevo...")
        }
    }
    const password = prompt("Ingrese su contraseña deseada...")
    while (password == ""){
        const password = prompt("Llena los campos...")
    }
    signup()
}

function login(username,password){
    for (let i = 0; i < users.length; i++) {
        if (username == users[i].username) {
            if (password == users[i].password) {
                return users[i].idUser
            } else {
                return 0
            }
        }
    }
}

function handleLogin(username,password){
}

function signup(username,password) {
}