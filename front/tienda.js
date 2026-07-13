
let temppuser=JSON.parse(sessionStorage.getItem("User"))
if (temppuser!=null){
  UserLogged= new Usuario(temppuser.id)  
  UserLogged.updateuser()
}else{
  UserLogged={}
}
let items=[]
let bgs=[]



async function genItems(){
    let bog=false
    let invitem={}
    await UserLogged.updateuser()
    //carga items y fondos y separa

    document.getElementById("userpoints2").innerText=UserLogged.points  

    document.getElementById("titems").innerHTML = ``
    document.getElementById("tbackgrounds").innerHTML = ``
    let getitems= await getItems()
    for (i=0;i<getitems.length;i++){
        if (!getitems[i].name.includes("Fondo")){
        items.push(getitems[i])
        }else{
        bgs.push(getitems[i])
        }
    }
    console.log(UserLogged)
    let invent= await getInventario(UserLogged.id) || []
    console.log(invent)
//rellena tabla items

 for (i=0;i<items.length;i++){
    bog=false
    invitem={}
    for(j=0;j<invent.length;j++){
        if(items[i].id ==invent[j].itemid){
            bog=true
            invitem=invent[j]
        }
        
    }

    if(bog && invitem.active==0){
        document.getElementById("titems").innerHTML+= `
        <td><img src="${items[i].imgsrc}" alt="item" class="storespr"></td>
        <td>Comprado</td>
        <td>
        
        <button class="equip" id="equipitem${items[i].id}" onclick="itemequip(${items[i].id})">Equipar</button>
        </td>`
    }else if(bog && invitem.active==1){
        document.getElementById("titems").innerHTML+= `
        <td><img src="${items[i].imgsrc}" alt="item" class="storespr"></td>
        <td>Comprado</td>
        <td>
        <button class="equipped" id="equippeditem${items[i].id}" onclick="unequip(${items[i].id})">Equipado
        </button>
        </td>`
    }else {
        document.getElementById("titems").innerHTML+= `
        <td><img src="${items[i].imgsrc}" alt="item" class="storespr"></td>
        <td>$${items[i].price}</td>
        <td>
        <p></p> 
        <button class="buyitem" id="buyitem${items[i].id}" onclick="additem(${items[i].id})">
        Comprar
        </button>
        </td>`
    }
    
 }

//rellena tabla fondos


for (i=0;i<bgs.length;i++){
    bog=false
    invitem={}
    for(j=0;j<invent.length;j++){
        if(bgs[i].id ==invent[j].itemid){
            bog=true
            invitem=invent[j]
        }
        
    }
  
    if(bog && invitem.active==0){
        document.getElementById("tbackgrounds").innerHTML+= `
        <td><img src="${bgs[i].imgsrc}" alt="fondo" class="storespr"></td>
        <td>Comprado</td>
        <td>
        <button class="equip" id="equipbg${bgs[i].id}" onclick="itemequip(${bgs[i].id})">Equipar</button>
        </td>`
    }else if(bog && invitem.active==1){
        document.getElementById("tbackgrounds").innerHTML+= `
        <td><img src="${bgs[i].imgsrc}" alt="fondo" class="storespr"></td>
        <td>Comprado</td>
        <td>
        <button class="equipped" id="equippedbg${bgs[i].id}" onclick="unequip(${bgs[i].id})">Equipado
        </button>
        </td>`
    }else{
        document.getElementById("tbackgrounds").innerHTML+= `
        <td><img src="${bgs[i].imgsrc}" alt="fondo" class="storespr"></td>
        <td>$${bgs[i].price}</td>
        <td>
        <p></p> 
        <button class="buyitem" id="buybg${bgs[i].id}" onclick="additem(${bgs[i].id})">
        Comprar
        </button>
        </td>`


    }

}

}

async function itemequip(itemid){
    //tiene que chequear si hay otro item equipado y desactivarlo, y activar el item que se quiere equipar
    item= await getItemporID(itemid)
    console.log(item)
    let invent= await getInventario(UserLogged.id) || []
    
    if(item.name.includes("Fondo")){
        for (i=0;i<bgs.length;i++){
        
        for(j=0;j<invent.length;j++){
            if(bgs[i].id ==invent[j].itemid){
                console.log(`Fondo ${invent[j].itemid} desactivado`)
                await deactivateItem(UserLogged.id,invent[j].itemid)
            }
        }
        }
    }else{
        for (i=0;i<items.length;i++){
      
        for(j=0;j<invent.length;j++){
            if(items[i].id ==invent[j].itemid){
                console.log(`Item ${invent[j].itemid} desactivado`)
                await deactivateItem(invent[j].itemid,UserLogged.id)
            }
    }
    }
    }
    await activateItem(item.id,UserLogged.id)   
    console.log(`Item ${item.id} activado`)
    UserLogged.updateuser()
    window.location.reload()
}





async function unequip(itemid) {

    await deactivateItem(itemid,UserLogged.id)
    console.log(`Item ${itemid} desactivado`)
    UserLogged.updateuser()
    window.location.reload()

}





//compra item: chequea que el usuario tenga los puntos (los resta) y lo añade al inventario
async function additem(itemid){
    item= await getItemporID(itemid)
    await UserLogged.updateuser()
    if(UserLogged.points<item.price){
        alert("No tiene suficientes puntos para comprar esto")
    }else{
        if(confirm(`Está seguro de que quiere comprar ${item.name} por $${item.price}?`)){
            console.log(item)
            newitem ={
            userid: UserLogged.id,
            itemid: item.id,
            active: 0   
            }
            console.log(newitem)
            await postItemporUsuario(newitem)
            let pp=UserLogged.points-item.price
            await putPoints(pp,UserLogged.id)
            await UserLogged.updateuser()
            window.location.reload()

        }
    }
}


async function itemCheck() {
    await UserLogged.updateuser()
    const bod = document.body
    const its=document.getElementsByClassName("decoration")
    const title=document.getElementById("titleh1")
    if (!(Object.keys(UserLogged).length === 0 || Object.keys(UserLogged).length === undefined || UserLogged === null)){
        bgs=[]
        items=[]
        let iteminv={}
        let bginv={}
        let getitems= await getItems()
        let invent= await getInventario(UserLogged.id) || []

        for (i=0;i<getitems.length;i++){
            if (!getitems[i].name.includes("Fondo")){
                items.push(getitems[i])
            }else{
                bgs.push(getitems[i])
            }
        }
        for (i=0;i<bgs.length;i++){
            for(j=0;j<invent.length;j++){
                if(bgs[i].id ==invent[j].itemid && invent[j].active){
                    bginv=bgs[i]
                    console.log(bginv)

                }
            }
        }
        for (i=0;i<items.length;i++){
            for(j=0;j<invent.length;j++){
                if(items[i].id ==invent[j].itemid && invent[j].active){
                    iteminv=items[i]
                    console.log(iteminv)
                }
            }
        }

        bod.style.backgroundImage = `url(${bginv.imgsrc})`
        for (i=0;i<its.length;i++){
            console.log(iteminv.name)
            if (iteminv.name=="Pipi"){
                
                its[i].innerHTML=`<img src="" alt="">`

                if(UserLogged.points<10){
                    console.log("huevo")
                    its[i].innerHTML=`<img src="img/spr/pipihuevo.png" alt="">`
                }else if(UserLogged.points<25){
                      console.log("medio")

                    its[i].innerHTML=`<img src="img/spr/pipimedio.png" alt="">`
                }else if(UserLogged.points<50){
                      console.log("normal")

                    its[i].innerHTML=`<img src="img/spr/pipinormal.png" alt="">`
                }else if(UserLogged.points<150){
                      console.log("amor")
                    its[i].innerHTML=`<img src="img/spr/pipiamor.png" alt="">`
                }
                
            
            }else{
                its[i].innerHTML=`<img src="${iteminv.imgsrc}" alt="">`
            }
            
            
        }
        
    }else{
        bod.style.backgroundImage = url('img/bg/def.png')
        for (i=0;i<its.length;i++){
            its[i].innerHTML=``
        }
    }
}

