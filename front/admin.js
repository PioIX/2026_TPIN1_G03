async function verUsers() {
    const tabla = await getUsuarios()
    let elementosLista = ""
    document.getElementById("ListaDeUsers").innerHTML=`
    <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Points</th>
        <th>Password</th>
        <th>Admin</th>
        <th>Items</th>
    </tr>`
    console.log(tabla)
    for (let i=0; i<tabla.length; i++) {
        const element = tabla[i];
        elementosLista += `
        <tr>
            <td>${element.id}</td>
            <td>${element.username}</td>
            <td>${element.points}</td>
            <td>${element.password}</td>
            <td>${element.is_admin}</td>
            <td>${element.items}</td>
        </tr>
        `;        
    }
    console.log(elementosLista)
    document.getElementById("ListaDeUsers").innerHTML += elementosLista
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

async function borrarItem() {
    let idAdminItem = prompt("¿Que ID de item desea eliminar?")
    let objetoItemAux = await getItemporID(idAdminItem)
    let objetoItem = objetoItemAux[0]
    while (idAdminItem == "" || objetoItem == undefined) {
        idAdminItem = prompt("Complete con un dato valido.")
    }
    deleteItem(idAdminItem)
    alert("Item borrado.")
}

async function modPuntosUser() {
    let idAdmin = prompt("¿Que ID de usuario desea alterar?")
    let objetoUsuario = new Usuario(idAdmin)
    let userFetchAux = await getUsuarioporID(idAdmin)
    let userFetch = userFetchAux[0]
    while (idAdmin == "" || userFetch.length == 0) {
        idAdmin = prompt("Complete el campo con un ID valido.")
    }
    let newPuntos = prompt("Escriba el nuevo puntaje total del usuario.")
    while (newPuntos == "") {
        newPuntos = prompt("El campo esta vacio.")
    }
    putPoints(newPuntos,idAdmin)
    objetoUsuario.updateuser()
    alert("Puntaje modificado.")
}

async function cheatPuntos() {
    let idAdmin = prompt("¿Que ID de usuario desea alterar?")
    let objetoUsuario = new Usuario(idAdmin)
    let userFetchAux = await getUsuarioporID(idAdmin)
    let userFetch = userFetchAux[0]
    while (idAdmin == "" || userFetch.length == 0) {
        idAdmin = prompt("Complete el campo con un ID valido.")
    }
    let newPuntos = userFetch.points + 500
    putPoints(newPuntos,idAdmin)
    objetoUsuario.updateuser()
    alert("Puntaje modificado.")
}

async function adminUser() {
    let idAdmin = prompt("¿Que ID de usuario desea alterar?")
    let objetoUsuario = new Usuario(idAdmin)
    let userFetchAux = await getUsuarioporID(idAdmin)
    let userFetch = userFetchAux[0]
    while (idAdmin == "" || userFetch.length == 0) {
        idAdmin = prompt("Complete el campo con un ID valido.")
    }
    putAdmin(true,idAdmin)
    objetoUsuario.updateuser()
    alert("Administrador designado.")
}

async function modItemPrice() {
    let idAdminItem = prompt("¿Que ID de item desea alterar?")
    let objetoItem = new Item(idAdminItem)
    let itemFetchAux = await getItemporID(idAdminItem)
    let itemFetch = itemFetchAux[0]
    while (idAdminItem == "" || itemFetch.length == 0) {
        idAdminItem = prompt("Complete el campo con un ID valido.")
    }
    let newPrice = prompt("Ingrese el nuevo precio de su Item.")
    while (newPrice == "") {
        newPrice = prompt("Llene los campos.")
    }
    putPrice(newPrice,idAdminItem)
    objetoItem.updateitem()  
    alert("Precio modificado.")
}

async function modItemImage(){
    let idAdminItem = prompt("¿Que ID de item desea alterar?")
    let objetoItem = new Item(idAdminItem)
    let itemFetchAux = await getItemporID(idAdminItem)
    let itemFetch = itemFetchAux[0]
    while (idAdminItem == "" || itemFetch.length == 0) {
        idAdminItem = prompt("Complete el campo con un ID valido.")
    }
    let newImg = prompt("Ingrese el nuevo archivo de la imagen de su Item.")
    while (newImg == "") {
        newImg = prompt("Llene los campos.")
    }
    putItemSRC(newImg,idAdminItem)
    objetoItem.updateitem()
    alert("Imagen modificada.")
}

// ------------

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

async function adminUserNon() { /*no esta funcionando*/
    let idAdmin = prompt("¿Que ID de usuario desea alterar?")
    let objetoUsuario = new Usuario(idAdmin)
    let userFetchAux = await getUsuarioporID(idAdmin)
    let userFetch = userFetchAux[0]
    while (idAdmin == "" || userFetch.length == 0) {
        idAdmin = prompt("Complete el campo con un ID valido.")
    }
    putAdmin(false,idAdmin)
    objetoUsuario.updateuser()
    alert("Administrador descartado.")
}

async function addItemUser() {
    let idAdmin = prompt("¿Que ID de usuario desea añadir el item?")
    let objetoUsuarioAux = await getUsuarioporID(idAdmin)
    let objetoUsuario = objetoUsuarioAux[0]
    while (idAdmin == "" || objetoUsuario.length == 0) {
        idAdmin = prompt("Complete con un ID valido...")
    }
    let idAdminItem = prompt("Escriba el ID del item que le dara a " + objetoUsuario.username + ".")
    let objetoItemAux = await getItemporID(idAdminItem)
    let objetoItem = objetoItemAux[0]
    while (idAdminItem == "" || objetoItem == undefined) {
        idAdminItem = prompt("Complete con un dato valido.")
    }
    objetoUsuario.items.push(giveItem)
    alert("Item añadido a " + objetoUsuario.username + ".")
}