function modPuntosUser() {
    let idAdmin = prompt("¿Que ID de usuario desea alterar?")
    if (idAdmin != "") {
        let newPuntos = prompt("Escriba el nuevo puntaje total de ", getUsuarioporID(idAdmin).username, ".")
        if (newPuntos != "") {
            getUsuarioporID(idAdmin).points = newPuntos
        }
    }
}
