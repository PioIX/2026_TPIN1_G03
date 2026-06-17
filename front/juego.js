let juego = {};

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

async function iraljuego() {
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
      document.getElementById("cartasdealer").innerHTML=`<div id="cartasdealer"></div>`

  for (i = 0; i < juego.dealcards.length; i++) {
    carta = juego.cards.indexOf(juego.dealcards[i]);
    document.getElementById("cartasdealer").innerHTML +=
      `<img src="${cartasref[carta]}" alt="${juego.cards[carta]}">
`;
  }
    document.getElementById("sumadealer").innerText=juego.dealsum

}

function hit() {
  res = juego.userTurn();
  actualizarUser();
  console.log(res)

   if (res==1){
      console.log("w")
      document.getElementById("aviso").innerText = "Ganaste!";
      turn=false
      win()
       
    }else{if(res==-1){
      console.log("l")
      document.getElementById("aviso").innerText = "Perdiste";
      turn=false
      lose()
    }
      
      
    }
}

function stand(){
  let turn=true
  while (turn){
    let res=juego.dealerTurn()
    actualizarDealer()
    console.log(res)
    if (res==1){
      console.log("w")
      document.getElementById("aviso").innerText = "Ganaste!";
      turn=false
      win()
       
    }else{if(res==-1){
      console.log("l")
      document.getElementById("aviso").innerText = "Perdiste";
      turn=false
      lose()
    }
      
      
    }
      
    
  

  }

}



function win(){
  const modal = document.getElementById("win");
  alert(juego.dealsum)
  alert(juego.usersum)//terminar de mostrar valores
  document.getElementById("sumadealer2").innerText=juego.dealsum
  document.getElementById("sumauser2").innerText=juego.usersum
  modal.showModal();
}

function lose(){
  const modal = document.getElementById("lose");
  modal.showModal();
}
