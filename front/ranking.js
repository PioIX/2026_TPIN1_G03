window.addEventListener("load", genTable());

async function genTable(){
    document.getElementById("ranktable").innerHTML = `      <thead>
        <th>Posición</th>
        <th>Username</th>
        <th>Puntaje</th>
        <th>ID</th>

      </thead>
      
      `
 let rank= await getRanking() 
 console.log(rank)
 for (i=0;i<rank.length;i++){
  console.log(rank[i].username)
    document.getElementById("ranktable").innerHTML+= `<tr>
    <td>${i+1}</td>
    <td>${rank[i].username}</td>
    <td>${rank[i].points}</td>
    <td>${rank[i].id}</td>

  </tr>`
 }
}