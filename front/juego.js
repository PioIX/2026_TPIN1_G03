let juego = {};
let winpoints = 1
tempuser = JSON.parse(sessionStorage.getItem("User"))
UserLogged = new Usuario(tempuser.id)

const cartasref = [
  "1",
  "2",
  "3",
  "img/c4.png",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const buttonhit = document.getElementById("buttonhit");
const buttonstand = document.getElementById("buttonstand");
window.addEventListener("load", iraljuego());

async function handleir(){
  await UserLogged.updateuser()
  modal=document.getElementById("dialogpoints")
  conf=document.getElementById("confirmpoints")
  document.getElementById("showuserpoints").innerText=UserLogged.points
  modal.showModal()
  conf.addEventListener("click", () =>{
  winpoints=document.getElementById("inputpoints").value
    if ((UserLogged.points<winpoints && !(UserLogged.points==0 && winpoints==1)) || winpoints==0){
      document.getElementById("ppoints").innerText="Seleccione una cantidad válida"
    }else{
      sessionStorage.setItem("winpoints",winpoints)
      window.location.href='juego.html';
    }
    
  })
  
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
    carta = juego.cards.indexOf(juego.usercards[i]);
    document.getElementById("cartasuser").innerHTML +=
      `<img src="${cartasref[carta]}" alt="${juego.cards[carta]}">
`;
  
  }
  document.getElementById("sumauser").innerText=juego.usersum
}
function actualizarDealer() {
  let carta = 0;
      document.getElementById("cartasdealer").innerHTML=`<div id="cartasdealer" class="cartas"></div>`

  for (i = 0; i < juego.dealcards.length; i++) {
    carta = juego.cards.indexOf(juego.dealcards[i]);
    document.getElementById("cartasdealer").innerHTML +=
      `<img src="${cartasref[carta]}" alt="${juego.cards[carta]}">
`;
  }
    document.getElementById("sumadealer").innerText=juego.dealsum

}

async function hit() {
  res = juego.userTurn();
  actualizarUser();
  console.log(res)

   if (res==1){
      console.log("w")
      document.getElementById("aviso").innerText = "Ganaste!";
      turn=false
      await win()
       
    }else{if(res==-1){
      console.log("l")
      document.getElementById("aviso").innerText = "Perdiste";
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
      document.getElementById("aviso").innerText = "Ganaste!";
      turn=false
      await win()
       
    }else{if(res==-1){
      console.log("l")
      document.getElementById("aviso").innerText = "Perdiste";
      turn=false
      await lose()
    }
      
      
    }
      
    
  

  }

}
function replay(){
  winpoints=sessionStorage.getItem("winpoints")
   if ((UserLogged.points<winpoints && !(UserLogged.points==0 && winpoints==1)) || winpoints==0){
 //mostrar modal que dice que no se puede continuar con la misma apuesta
   }else{
    window.location.reload();
   }
  
}


async function win(){
  winpoints=sessionStorage.getItem("winpoints")
  console.log(winpoints)
  console.log(UserLogged)
  UserLogged.points+=winpoints
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
  UserLogged.points-=winpoints
  console.log(UserLogged)
  
  await putPoints(UserLogged.points,UserLogged.id)
  const modal = document.getElementById("lose");
  document.getElementById("sumadealer2").innerText=juego.dealsum
  document.getElementById("sumauser2").innerText=juego.usersum
  document.getElementById("points2").innerText=UserLogged.points
  modal.showModal();
}
