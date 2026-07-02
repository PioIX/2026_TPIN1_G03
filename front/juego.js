let juego = {};
let winpoints=1
let tempuser=JSON.parse(sessionStorage.getItem("User"))
if (tempuser!=null){
  UserLogged= new Usuario(tempuser.id)  
}else{
  UserLogged={}
  }


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
  "img/cartas/K0.png",
];
const buttonhit = document.getElementById("buttonhit");
const buttonstand = document.getElementById("buttonstand");
window.addEventListener("load", iraljuego());

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
async function iraljuego() {
  
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

 //mostrar modal que dice que no se puede continuar con la misma apuesta
   }else{
    window.location.reload();
   }
  
}


async function win(){
  winpoints=sessionStorage.getItem("winpoints")
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
  winpoints=sessionStorage.getItem("winpoints")
  UserLogged.points-=parseInt(winpoints)
  console.log(UserLogged)
  
  await putPoints(UserLogged.points,UserLogged.id)
  const modal = document.getElementById("lose");
  document.getElementById("sumadealer2").innerText=juego.dealsum
  document.getElementById("sumauser2").innerText=juego.usersum
  document.getElementById("points2").innerText=UserLogged.points
  modal.showModal();
}

