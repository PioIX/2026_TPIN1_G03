

let juego = {};

let winpoints=1
let tempuser=JSON.parse(sessionStorage.getItem("User"))
if (tempuser!=null){
  UserLogged= new Usuario(tempuser.id)  
  UserLogged.updateuser()
}else{
  UserLogged={}
}

const buttonhit = document.getElementById("buttonhit");
const buttonstand = document.getElementById("buttonstand");

const cartasrefP = [
  "img/cartas/AV.png",
  "img/cartas/2V.png",
  "img/cartas/3V.png",
  "img/cartas/4V.png",
  "img/cartas/5V.png",
  "img/cartas/6V.png",
  "img/cartas/7V.png",
  "img/cartas/8V.png",
  "img/cartas/9V.png",
  "img/cartas/10V.png",
  "img/cartas/JV.png",
  "img/cartas/QV.png",
  "img/cartas/KV.png",
];
const cartasrefD = [
  "img/cartas/A0.png",
  "img/cartas/20.png",
  "img/cartas/30.png",
  "img/cartas/40.png",
  "img/cartas/50.png",
  "img/cartas/60.png",
  "img/cartas/70.png",
  "img/cartas/80.png",
  "img/cartas/90.png",
  "img/cartas/100.png",
  "img/cartas/J0.png",
  "img/cartas/Q0.png",
  "img/cartas/KV.png",


];

//CHEQUEA LOGIN Y MANEJA APUESTA
async function handleir(){
  let tempuser=JSON.parse(sessionStorage.getItem("User"))
  if (tempuser!=null){
  UserLogged= new Usuario(tempuser.id)  
  }else{
  UserLogged={}
  }
  if (Object.keys(UserLogged).length === 0 || Object.keys(UserLogged).length === undefined || UserLogged === null){
    document.getElementById("homeaviso").innerText="Inicie sesión para poder jugar"
  }else{
    await UserLogged.updateuser()
    modal=document.getElementById("dialogpoints")
    conf=document.getElementById("confirmpoints")
    document.getElementById("showuserpoints").innerText=UserLogged.points
    modal.showModal()
    conf.addEventListener("click", () =>{
    winpoints=document.getElementById("inputpoints").value
    if ((UserLogged.points<winpoints && !(UserLogged.points<=0 && winpoints==1)) || winpoints==0){
      document.getElementById("ppoints").innerText="Seleccione una cantidad válida"
    }else{
      sessionStorage.setItem("winpoints",winpoints)
      window.location.href='juego.html';
    }
    
    })
  }
}

//CREA UN JUEGO NUEVO
async function iraljuego() {
  document.getElementById("buttonhit").disabled=false
  document.getElementById("buttonstand").disabled=false
  UserLogged.updateuser()
  console.log(UserLogged)
  console.log("points: ")
  console.log(sessionStorage.getItem("winpoints"))
  console.log("juego"); 
  juego = new Blackjack();
  juego.givedealcard();
  actualizarDealer();
  juego.giveusercard();
  actualizarUser();
}


//FUNCIONES PROPIAS DEL JUEGO
function actualizarUser() {
  let carta = 0;
  document.getElementById("cartasuser").innerHTML=`<div id="cartasuser"></div>`
  for (i = 0; i < juego.usercards.length; i++) {
    carta = juego.cards.indexOf(juego.usercards[i][0]);
    if (juego.usercards[i][1]){
    document.getElementById("cartasuser").innerHTML +=
          `<img src="${cartasrefP[carta]}" alt="${juego.cards[carta]}">
    `;
    }else{
      document.getElementById("cartasuser").innerHTML +=
          `<img src="${cartasrefD[carta]}" alt="${juego.cards[carta]}">
    `;
    }
    
  
  }
  document.getElementById("sumauser").innerText=juego.usersum
}
function actualizarDealer() {
  let carta = 0;
      document.getElementById("cartasdealer").innerHTML=`<div id="cartasdealer" class="cartas"></div>`

  for (i = 0; i < juego.dealcards.length; i++) {
    carta = juego.cards.indexOf(juego.dealcards[i][0]);
    if (juego.dealcards[i][1]){
      document.getElementById("cartasdealer").innerHTML +=
      `<img src="${cartasrefP[carta]}" alt="${juego.cards[carta]}">
`;
    }else{
      document.getElementById("cartasdealer").innerHTML +=
      `<img src="${cartasrefD[carta]}" alt="${juego.cards[carta]}">
`;
    }
    
  }
    document.getElementById("sumadealer").innerText=juego.dealsum

}

async function hit() {
  res = juego.userTurn();
  actualizarUser();
  console.log(res)

   if (res==1){
      console.log("w")
      turn=false
      await win()
       
    }else{if(res==-1){
      console.log("l")
      turn=false
      await lose()
    }
      
      
    }
}

async function stand(){
  let turn=true
  while (turn){
    let res=juego.dealerTurn()
    actualizarDealer()
    console.log(res)
    if (res==1){
      console.log("w")
      turn=false
      await win()
       
    }else{if(res==-1){
      console.log("l")
      turn=false
      await lose()
    }
      
      
    }
      
    
  

  }

}
function replay(){
  winpoints=sessionStorage.getItem("winpoints")
   if ((UserLogged.points<winpoints && !(UserLogged.points<=0 && winpoints==1)) || winpoints==0){
    document.getElementById("avisonopoints").innerText="No puede continuar con la misma apuesta. Vuelva y seleccione una nueva cantidad."
   }else{
    window.location.reload();
   }
  
}

async function win(){
  document.getElementById("buttonhit").disabled=true
  document.getElementById("buttonstand").disabled=true
  winpoints=sessionStorage.getItem("winpoints")
  estad= await getEstadistica(UserLogged.id)
  newestad={
    userid:UserLogged.id,
    wins:estad.wins+1,
    losses:estad.losses,
    played:estad.played+1,
    streak:estad.streak+1,
    points_lost:estad.points_lost,
    cant_items:estad.cant_items
  }
  await putEstadistica(newestad)
  console.log(winpoints)
  console.log(UserLogged)
  UserLogged.points+=parseInt(winpoints)
  console.log(UserLogged)
  await putPoints(UserLogged.points,UserLogged.id)
  const modal = document.getElementById("win");
  document.getElementById("sumadealer1").innerText=juego.dealsum
  document.getElementById("sumauser1").innerText=juego.usersum
  document.getElementById("points1").innerText=UserLogged.points
  modal.showModal();
}

async function lose(){
  document.getElementById("buttonhit").disabled=true
  document.getElementById("buttonstand").disabled=true
  winpoints=sessionStorage.getItem("winpoints")
  UserLogged.points-=parseInt(winpoints)
  console.log(UserLogged)
  estad= await getEstadistica(UserLogged.id)
  newestad={
    userid:UserLogged.id,
    wins:estad.wins,
    losses:estad.losses+1,
    played:estad.played+1,
    streak:1,
    points_lost:estad.points_lost+parseInt(winpoints),
    cant_items:estad.cant_items
  }
  await putEstadistica(newestad)
  await putPoints(UserLogged.points,UserLogged.id)
  const modal = document.getElementById("lose");
  document.getElementById("sumadealer2").innerText=juego.dealsum
  document.getElementById("sumauser2").innerText=juego.usersum
  document.getElementById("points2").innerText=UserLogged.points
  modal.showModal();
}




//PERFIL DE USUARIO
async function showstats() {
  if(Object.keys(UserLogged).length === 0 || Object.keys(UserLogged).length === undefined || UserLogged === null){
    document.getElementById("homeaviso").innerText="Inicie sesión para ver sus estadísticas"
  }else{
    modal=document.getElementById("dialoguser")
    UserLogged.updateuser()
    stats= await getEstadistica(UserLogged.id)
    document.getElementById("statpoints").innerText=UserLogged.points
    document.getElementById("statwins").innerText=stats.wins
    document.getElementById("statlosses").innerText=stats.losses
    if(stats.streak==0){
      document.getElementById("statstreak").innerText=stats.streak
    }else{
      document.getElementById("statstreak").innerText=stats.streak-1

    }
    document.getElementById("statplayed").innerText=stats.played
    document.getElementById("statlostpoints").innerText=stats.points_lost
    document.getElementById("statitems").innerText=stats.cant_items
    document.getElementById("h2user").innerText=UserLogged.username

    modal.showModal();

  }

}


//CHEQUEAR LOGIN PARA TIENDA
function handletienda(){
  if(Object.keys(UserLogged).length === 0 || Object.keys(UserLogged).length === undefined || UserLogged === null){
    document.getElementById("homeaviso").innerText="Inicie sesión para ir a la tienda"
  }else{
    window.location.href='tienda.html';
  }
}