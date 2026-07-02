window.addEventListener("load", genTable());

async function genTable(){
    document.getElementById("ranktable").innerHTML = `<tr>
    <th>ID</th>
    <th>Username</th>
    <th>Puntaje</th>
  </tr>`
 let rank= await getRanking() 
 for (i=0;i<rank.length;i++){
    document.getElementById("ranktable").innerHTML+= `<tr>
    <td>${rank[i].id}</td>
    <td>${rank[i].username}</td>
    <td>${rank[i].points}</td>
  </tr>`
 }
}