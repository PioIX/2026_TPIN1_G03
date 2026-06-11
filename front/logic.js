let users = []



function handleSignup(){
    const username = prompt("Ingrese su nombre de usuario deseado...");
    for (i=0; i<users.length; i++) {
        while (username == users[i].username){
            const username = prompt("Nombre de usuario en uso. Por favor, ingrese uno nuevo...")
        }
    }
    const password = prompt("Ingrese su contraseña deseada...")
}

function logicLogin(username,password){

}

function handleLogin(username,password){
    
}
