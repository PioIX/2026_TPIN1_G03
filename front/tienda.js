window.addEventListener("load", genItems());
let temppuser=JSON.parse(sessionStorage.getItem("User"))
if (temppuser!=null){
  UserLogged= new Usuario(temppuser.id)  
}else{
  UserLogged={}
  }
async function genItems(){
    document.getElementById("titems").innerHTML = ``

 let items= await getItems()
 let invent= await getInventario(UserLogged.id)
 


 for (i=0;i<items.length;i++){
    let bog=false
    let invitem={}
    for(i=0;i<invent.length;i++){
        if(items[i].id ==invent[i].itemid){
            bog=true
            invitem=invent[i]
        }
        
    }

    if(bog && invitem.active==0){
        document.getElementById("titems").innerHTML+= `
        <td>${items[i].name}</td>
        <td></td>
        <td>
        <p>Equipado:</p> 
        <button id="equipitem${items[i].id}" onclick="itemequip(${items[i].id})">Equipar</button>
        </td>`
    }else if(bog && invitem.active==1){
        document.getElementById("titems").innerHTML+= `
        <td>${items[i].name}</td>
        <td></td>
        <td>
        <p>Equipado:</p> 
        <p id="equippeditem${items[i].id}">Equipado</p>
        </td>`
    }else {
        document.getElementById("titems").innerHTML+= `
        <td>${items[i].name}</td>
        <td>Precio</td>
        <td>
        <p>Equipado:</p> 
        <button id="buyitem${items[i].id}" onclick="additem(${items[i].id})">
        Comprar
        </button>
        </td>`
    }
    
 }
}


//falta seguir con la carga de objetos y ver que onda