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

async function verInventario() {
    const tabla = await getItemsporUsuario()
    let elementosLista = ""
    document.getElementById("ListaDeInventarios").innerHTML=`
    <tr>
        <th>ID User</th>
        <th>ID Item</th>
        <th>Active</th>
    </tr>`
    console.log(tabla)
    for (let i=0; i<tabla.length; i++) {
        const element = tabla[i];
        elementosLista += `
        <tr>
            <td>${element.itemid}</td>
            <td>${element.userid}</td>
            <td>${element.active}</td>
        </tr>
        `;        
    }
    console.log(elementosLista)
    document.getElementById("ListaDeInventarios").innerHTML += elementosLista
}

async function borrarUser() {
    let idAdmin = prompt("¿Que ID de usuario desea eliminar?")
    let objetoUsuarioAux = await getUsuarioporID(idAdmin)
    let objetoUsuario = objetoUsuarioAux[0]
    console.log(objetoUsuario)
    while (idAdmin == "" || objetoUsuario.length == 0) {
        idAdmin = prompt("Complete con un dato valido.")
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
    let userFetch = await getUsuarioporID(idAdmin)
    while (idAdmin == "" ||  Object.keys(userFetch).length===0) {
        idAdmin = prompt("Complete el campo con un ID valido.")
        objetoUsuario = new Usuario(idAdmin)
        userFetch = await getUsuarioporID(idAdmin)
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
    let userFetch = await getUsuarioporID(idAdmin)
    while (idAdmin == "" ||  Object.keys(userFetch).length===0) {
        idAdmin = prompt("Complete el campo con un ID valido.")
        objetoUsuario = new Usuario(idAdmin)
        userFetch = await getUsuarioporID(idAdmin)
    }
    let newPuntos = userFetch.points + 500
    putPoints(newPuntos,idAdmin)
    objetoUsuario.updateuser()
    alert("Puntaje modificado.")
}

async function adminUser() {
    let idAdmin = prompt("¿Que ID de usuario desea alterar?")
    let objetoUsuario = new Usuario(idAdmin)
    let userFetch = await getUsuarioporID(idAdmin)
    while (idAdmin == "" ||  Object.keys(userFetch).length===0) {
        idAdmin = prompt("Complete el campo con un ID valido.")
        objetoUsuario = new Usuario(idAdmin)
        userFetch = await getUsuarioporID(idAdmin)
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


async function creaItem(){
    let respuestaName = prompt("Ingrese su nombre de item deseado.");
    while (respuestaName == "") {
        respuestaName = prompt("Valor vacio. Por favor, ingrese uno nuevo.")
    }
    let respuestaImgSrc = prompt("Ingrese el nombre de archivo de la imagen de su item.")
    let arrayItems = await getItems()
    for (i=0; i < await arrayItems.length; i++) {
        while (respuestaImgSrc == await arrayItems[i].imgsrc || respuestaImgSrc == "") {
            respuestaImgSrc = prompt("Valor vacio o en uso. Completelo.")
        }
        console.log("arrayItems.imgsrc: ", arrayItems[i].imgsrc)
    }
    let respuestaPrice = prompt("Ingrese el precio de su Item.")
    while (respuestaPrice == "") {
        respuestaPrice = prompt("Valor vacio. Completelo.")
    }
    let newItem = {
        name:respuestaName,
        imgsrc:respuestaImgSrc,
        price:respuestaPrice,
        id:arrayItems.length+1
    };
    postItem(newItem)
    alert("Registro exitoso.")
    console.log(newItem)
    return newItem.id
}

async function adminUserNon() {
    let idAdmin = prompt("¿Que ID de usuario desea alterar?")
    let objetoUsuario = new Usuario(idAdmin)
    let userFetch = await getUsuarioporID(idAdmin)
    while (idAdmin == "" ||  Object.keys(userFetch).length===0) {
        idAdmin = prompt("Complete el campo con un ID valido.")
        objetoUsuario = new Usuario(idAdmin)
        userFetch = await getUsuarioporID(idAdmin)
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
    let idAdminItem = prompt("Escriba el ID del item que le dara al usuario.")
    let objetoItemAux = await getItemporID(idAdminItem)
    let objetoItem = objetoItemAux[0]
    while (idAdminItem == "" || objetoItem.length == 0) {
        idAdminItem = prompt("Complete con un dato valido.")
    }
    newItemUser = {
        itemid: idAdminItem,
        userid: idAdmin,
        active: 0
    }
    postItemporUsuario(newItemUser)
    alert("Item añadido al usuario.")
}

async function cheatItems() {
    let idAdmin = prompt("¿Que ID de usuario desea alterar?")
    let objetoUsuarioAux = await getUsuarioporID(idAdmin)
    let objetoUsuario = objetoUsuarioAux[0]
    console.log(objetoUsuario)
    while (idAdmin == "" || objetoUsuario.length == 0) {
        idAdmin = prompt("Complete con un ID valido...")
    }
    let allItems = await getItems()
    for (i=0; i<allItems.length; i++){
        let idAllItems = allItems[i].id
        console.log(idAllItems)
        currentItem = {
            itemid: idAllItems,
            userid: idAdmin,
            active: 0
        }
        postItemporUsuario(currentItem)
    }
    alert("Todos los items añadidos al usuario.")
}