async function verUsers() {
    const tabla = await getUsuarios()
    let elementosLista = ""
    document.getElementById("ListaDeUsers").innerHTML=`
    <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Points</th>
    </tr>`
    console.log(tabla)
    for (let i = 0; i < tabla.length; i++) {
        const element = tabla[i];
        elementosLista += `
        <tr>
            <td>${element.id}</td>
            <td>${element.username}</td>
            <td>${element.points}</td>
        </tr>
        `;        
    }
    console.log(elementosLista)
    document.getElementById("ListaDeUsers").innerHTML += elementosLista
}

async function modPuntosUser() {
    let idAdmin = prompt("¿Que ID de usuario desea alterar?")
    objetoUsuarioAux = await getUsuarioporID(idAdmin)
    objetoUsuario = objetoUsuarioAux[0]
    if (idAdmin != "") {
        let newPuntos = prompt("Escriba el nuevo puntaje total de " + objetoUsuario.username + ".")
        if (newPuntos != "") {
            objetoUsuario.points = newPuntos
            alert("El nuevo puntaje de " + objetoUsuario.username + " es " + objetoUsuario.points + ".")
        } else {
            alert("Conjunto vacio!")
        }
    }
}

async function cheatPuntos() {
    let idAdmin = prompt("¿Que ID de usuario desea alterar?")
    console.log(objetoUsuario)
    while (idAdmin == "" || objetoUsuario.length == 0) {
        idAdmin = prompt("Complete con un ID valido...")
    }
    objetoUsuario.points += 500
    console.log("name: ",objetoUsuario.username)
    console.log("score: ",objetoUsuario.points)
    alert("El nuevo puntaje de " + objetoUsuario.username + " es " + objetoUsuario.points + ".")
}