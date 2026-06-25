let idAdmin

function modPuntosUser() {
    idAdmin = prompt("¿Que ID de usuario desea alterar?")
    if (idAdmin != "") {
        let newPuntos = prompt("Escriba el nuevo puntaje total de ", getUsuarioporID(idAdmin).username, ".")
        if (newPuntos != "") {
            getUsuarioporID(idAdmin).points = newPuntos
        }
    }
}

async function cheatPuntos() {
    idAdmin=1
    idAdmin = prompt("¿Que ID de usuario desea alterar?")
    objetoUsuario = await getUsuarioporID(idAdmin)
    while (idAdmin == "" || objetoUsuario[0].length == 0) {
        idAdmin = prompt("Complete con un ID valido...")
    }
    objetoUsuario[0].points = objetoUsuario[0].points + 500
    alert("El nuevo puntaje de ", objetoUsuario[0].username," es ", objetoUsuario[0].points,".")
}