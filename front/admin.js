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
    for (let i=0; i<tabla.length; i++) {
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
    let objetoUsuarioAux = await getUsuarioporID(idAdmin)
    let objetoUsuario = objetoUsuarioAux[0]
    while (idAdmin == "" || objetoUsuario.length == 0) {
        idAdmin = prompt("Complete con un ID valido...")
    }
    let newPuntos = prompt("Escriba el nuevo puntaje total de " + objetoUsuario.username + ".")
    while (newPuntos == "") {
        newPuntos = prompt("El campo esta vacio, completelo...")
    }
    objetoUsuario.points = newPuntos
    alert("El nuevo puntaje de " + objetoUsuario.username + " es " + objetoUsuario.points + ".")
}

async function cheatPuntos() {
    let idAdmin = prompt("¿Que ID de usuario desea alterar?")
    let objetoUsuarioAux = await getUsuarioporID(idAdmin)
    objetoUsuario = objetoUsuarioAux[0]
    console.log(objetoUsuario)
    while (idAdmin == "" || objetoUsuario.length == 0) {
        idAdmin = prompt("Complete con un ID valido...")
    }
    objetoUsuario.points += 500
    console.log("name: ", objetoUsuario.username)
    console.log("score: ", objetoUsuario.points)
    alert("El nuevo puntaje de " + objetoUsuario.username + " es " + objetoUsuario.points + ".")
}

async function cheatItems() {
    let idAdmin = prompt("¿Que ID de usuario desea alterar?")
    let objetoUsuarioAux = await getUsuarioporID(idAdmin)
    let objetoUsuario = objetoUsuarioAux[0]
    console.log(objetoUsuario)
    while (idAdmin == "" || objetoUsuario.length == 0) {
        idAdmin = prompt("Complete con un ID valido...")
    }
    let todosLosItems = await getItems() 
    objetoUsuario.items = todosLosItems
    console.log(objetoUsuario.items)
    alert("Todos los items añadidos a " + objetoUsuario.username + ".")
}

async function verItems() {
    const tabla = await getItems()
    let elementosLista = ""
    document.getElementById("ListaDeItems").innerHTML=`
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>ImgSrc</th>
        <th>Price</th>
    </tr>`
    console.log(tabla)
    for (let i=0; i<tabla.length; i++) {
        const element = tabla[i];
        elementosLista += `
        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.imgsrc}</td>
            <td>${element.price}</td>
        </tr>
        `;        
    }
    console.log(elementosLista)
    document.getElementById("ListaDeItems").innerHTML += elementosLista
}


function creaItem(){
    let respuestaName = prompt("Ingrese su nombre de item deseado...");
    while (respuestaName == "") {
        respuestaName = prompt("Valor vacio. Por favor, ingrese uno nuevo...")
    }
    let respuestaImgSrc = prompt("Ingrese el nombre de archivo de la imagen de su item...")
    while (respuestaImgSrc == ""){
        respuestaImgSrc = prompt("Valor vacio. Completelo...")
    }
    let respuestaPrice = prompt("Ingrese el precio de su Item...")
    while (respuestaPrice == "") {
        respuestaPrice = prompt("Valor vacio. Completelo...")
    }
    let newItem = new Item()
    postItem(newItem)
    alert("Registro exitoso.")
    return newItem.id
}

async function adminUser() {
    let idAdmin = prompt("¿Que ID de usuario desea hacer administrador?")
    let objetoUsuarioAux = await getUsuarioporID(idAdmin)
    let objetoUsuario = objetoUsuarioAux[0]
    console.log(objetoUsuario)
    while (idAdmin == "" || objetoUsuario.length == 0) {
        idAdmin = prompt("Complete con un ID valido...")
    }
    objetoUsuario.isAdmin = true
    console.log("isAdmin: " + objetoUsuario.isAdmin)
    alert("Administrador designado.")
}

async function adminUserNon() {
    let idAdmin = prompt("¿Que ID de usuario desea descartar como administrador?")
    let objetoUsuarioAux = await getUsuarioporID(idAdmin)
    let objetoUsuario = objetoUsuarioAux[0]
    console.log(objetoUsuario)
    while (idAdmin == "" || objetoUsuario.length == 0) {
        idAdmin = prompt("Complete con un ID valido...")
    }
    objetoUsuario.isAdmin = false
    console.log("isAdmin: " + objetoUsuario.isAdmin)
    alert("Administrador descartado.")
}

async function addItemUser() {
    let idAdmin = prompt("¿Que ID de usuario desea añadir el item?")
    let objetoUsuarioAux = await getUsuarioporID(idAdmin)
    let objetoUsuario = objetoUsuarioAux[0]
    while (idAdmin == "" || objetoUsuario.length == 0) {
        idAdmin = prompt("Complete con un ID valido...")
    }
    let idItem = prompt("Escriba el ID del item que le dara a " + objetoUsuario.username + ".")
    let objetoItemAux = await getItemporID(idItem)
    let objetoItem = objetoItemAux[0]
    while (idItem == "" || objetoItem == undefined) {
        idItem = prompt("Complete con un dato valido.")
    }
    objetoUsuario.items.push(giveItem)
    alert("Item añadido a " + objetoUsuario.username + ".")
}

async function borrarItem() {
    let idItem = prompt("¿Que ID de item desea eliminar?")
    let objetoItemAux = await getItemporID(idItem)
    let objetoItem = objetoItemAux[0]
    while (idItem == "" || objetoItem == undefined) {
        idItem = prompt("Complete con un dato valido.")
    }
    deleteItem(idItem)
    alert("Item borrado.")
}

async function borrarUser() {
    let idAdmin = prompt("¿Que ID de usuario desea eliminar?")
    let objetoUsuarioAux = await getUsuarioporID(idAdmin)
    let objetoUsuario = objetoUsuarioAux[0]
    console.log(objetoUsuario)
    while (itemBorrar == "" || objetoUsuario.length == 0) {
        itemBorrar = prompt("Complete con un dato valido.")
    }
    deleteUsuario(idAdmin)
    alert("Usuario Borrado.")
}

async function modItemPrice() {
    let idItem = prompt("¿Que ID de item desea alterar?")
    let objetoItemAux = await getItemporID(idItem)
    let objetoItem = objetoItemAux[0]
    while (idItem == "" || objetoItem == undefined) {
        idItem = prompt("Complete con un dato valido.")
    }
    let newPrice = prompt("Ingrese el nuevo precio de su Item.")
    while (newPrice == "") {
        newPrice = prompt("Llene los campos.")
    }
    objetoItem.price = newPrice
    alert("Precio modificado.")
}

async function modItemImage(){
    let idItem = prompt("¿Que ID de item desea alterar?")
    let objetoItemAux = await getItemporID(idItem)
    let objetoItem = objetoItemAux[0]
    while (idItem == "" || objetoItem == undefined) {
        idItem = prompt("Complete con un dato valido.")
    }
    let newImgSrc = prompt("Escriba el nuevo nombre del archivo de la imagen de su item.")
    while (newImgSrc == "") {
        newImgSrc = prompt("Llene los campos.")
    }
    objetoItem.imgsrc = newImgSrc
    console.log(objetoItem.imgsrc)
    alert("Imagen modificada.")
}


// function coincidirItem(objetoItemAux,idItem) {
//     for (i=0; i<objetoItemAux.length; i++){
//         if (objetoItemAux[i].id == idItem){
//             coincidencia = true
//             valorPosicion = i
//             console.log("Vieja posicion de I del user: ", valorPosicion)
//             break
//         } else {
//             coincidencia = false
//         }
//     }
// }

// function coincidirUser(leerUsername,respuestaUsername) {
//     for (i=0; i<leerUsername.length; i++){
//         if (leerUsername[i].username == respuestaUsername){
//             coincidencia = true
//             valorPosicion = i
//             console.log("Vieja posicion de I del user: ", valorPosicion)
//             break
//         } else {
//             coincidencia = false
//         }
//     }
// }