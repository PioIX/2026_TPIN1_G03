async function getUsuarioporID(ID) {
    try {
        let datos={
            id: ID
        }
      const res = await fetch(`http://localhost:4000/Usuarios?id=${ID}`)
      const response = await res.json() 
      
      console.log(response) 
      console.log(response.message.length)
      return response.message
    } catch (error) {
      console.log('Error:', error.message)
    }
}

async function getRanking() {
    try {
      let res = await fetch("http://localhost:4000/Ranking") 
      const response = await res.json() 
      console.log(response) 
      console.log(response.message.length)
      return response.message
    } catch (error) {
      console.log('Error:', error.message)
    }
}

async function getUsuarios() {
    try {
      let res = await fetch("http://localhost:4000/Usuarios") 
      const response = await res.json() 
      console.log(response) 
      console.log(response.message.length)
      return response.message
    } catch (error) {
      console.log('Error:', error.message)
    }
}

async function getItems() {
    try {
      let res = await fetch("http://localhost:4000/Items") 
      const response = await res.json() 
      console.log(response) 
      console.log(response.message.length)
      return response.message
    } catch (error) {
      console.log('Error:', error.message)
    }
}


async function getItemporID(ID) {
    try {
        let datos={
            id: ID
        }
      const res = await fetch(`http://localhost:4000/Items?id=${ID}`)
      const response = await res.json() 
      console.log(response) 
      console.log(response.message.length)
      return response.message
    } catch (error) {
      console.log('Error:', error.message)
    }
}






async function getUnItemporUnUsuario(itemID,userID) {
    try {
        let datos={
            userid: userID,
            itemid: itemID
        }
      const res = await fetch(`http://localhost:4000/ItemsporUsuario?itemid=${itemID}&userid=${userID}`)
      const response = await res.json() 
      console.log(response) 
      console.log(response.message.length)
      return response.message
    } catch (error) {
      console.log('Error:', error.message)
    }
}


async function getInventario(userID) {
    try {
        let datos={
            userid: userID,
        }
      const res = await fetch(`http://localhost:4000/ItemsporUsuario?userid=${userID}`)
      const response = await res.json() 
      console.log(response) 
      console.log(response.message.length)
      return response.message
    } catch (error) {
      console.log('Error:', error.message)
    }
}

async function getItemsporUsuario() {
    try {
      let res = await fetch("http://localhost:4000/ItemsporUsuario") 
      const response = await res.json() 
      console.log(response) 
      console.log(response.message.length)
      return response.message
    } catch (error) {
      console.log('Error:', error.message)
    }
}




async function postUsuario(datos) {
    try {
      const response = await fetch('http://localhost:4000/Usuarios',{
          method:"POST", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json",
            },
          body: JSON.stringify(datos) //JSON.stringify convierte de objeto a JSON
      })
  
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message

    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }
}


async function postItem(datos) {
    try {
      const response = await fetch('http://localhost:4000/Items',{
          method:"POST", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json",
            },
          body: JSON.stringify(datos) //JSON.stringify convierte de objeto a JSON
      })
  
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message

    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }
}


async function postItemporUsuario(datos) {
    try {
      const response = await fetch('http://localhost:4000/ItemsporUsuario',{
          method:"POST", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json",
            },
          body: JSON.stringify(datos) //JSON.stringify convierte de objeto a JSON
      })
  
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message

    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }
}

async function deleteUsuario(dato){
  try {
      const response = await fetch('http://localhost:4000/Usuarios',{
          method:"DELETE", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({id: dato}) //JSON.stringify convierte de objeto a JSON
      })
  
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message

    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }
}


async function deleteItem(dato){
  try {
      const response = await fetch('http://localhost:4000/Items',{
          method:"DELETE", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({id: dato}) //JSON.stringify convierte de objeto a JSON
      })
  
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message

    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }
}

async function deleteItemporUsuario(dato){
  try {
      const response = await fetch('http://localhost:4000/ItemsporUsuario',{
          method:"DELETE", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({id: dato}) //JSON.stringify convierte de objeto a JSON
      })
  
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message

    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }
}


async function putUsername(newuser,ID){
  try {
    console.log(newuser,ID)
      const response = await fetch('http://localhost:4000/Usuarios',{
          method:"PUT", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({id:ID, username:newuser}) //JSON.stringify convierte de objeto a JSON
      })
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message

    } catch (error) {
      console.log('Error:', error.message)
      return error.message
      
    }}


async function putPassword(newpass,ID){
  try {
      const response = await fetch('http://localhost:4000/Usuarios',{
          method:"PUT", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({id:ID,password:newpass }) //JSON.stringify convierte de objeto a JSON
      })
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message

    
    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }}


async function putPoints(newpoints,ID){
  try {
      const response = await fetch('http://localhost:4000/Usuarios',{
          method:"PUT", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({id:ID,points:newpoints }) //JSON.stringify convierte de objeto a JSON
      })
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message
    
    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }}


async function putAdmin(isadmin,ID){
  try {
      const response = await fetch('http://localhost:4000/Usuarios',{
          method:"PUT", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({id:ID,is_admin:isadmin }) //JSON.stringify convierte de objeto a JSON
      })
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message
    
    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }}


async function putItemName(newname,ID){
  try {
      const response = await fetch('http://localhost:4000/Items',{
          method:"PUT", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({id:ID,name:newname }) //JSON.stringify convierte de objeto a JSON
      })
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message
    
    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }}

async function putItemSRC(newsrc,ID){
  try {
      const response = await fetch('http://localhost:4000/Items',{
          method:"PUT", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({id:ID,imgsrc:newsrc}) //JSON.stringify convierte de objeto a JSON
      })
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message    
    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }}

async function putPrice(newprice,ID){
  try {
      const response = await fetch('http://localhost:4000/Items',{
          method:"PUT", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({id:ID,price:newprice }) //JSON.stringify convierte de objeto a JSON
      })
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message
    
    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }}


  async function activateItem(itemID,userID){
  try {
      const response = await fetch('http://localhost:4000/onactive',{
          method:"PUT", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({userid:userID,itemid:itemID}) //JSON.stringify convierte de objeto a JSON
      })
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message
    
    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }}



     async function deactivateItem(itemID,userID){
  try {
      const response = await fetch('http://localhost:4000/offactive',{
          method:"PUT", //GET, POST, PUT o DELETE
          headers: { //Esto va siempre, solo aclaro que va en tipo JSON
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({userid:userID,itemid:itemID}) //JSON.stringify convierte de objeto a JSON
      })
      console.log(response) //Imprimo la respuesta en formato JSON
      
      let result = await response.json()//Desarma el json y lo arma como un objeto
      console.log(result)
      return result.message
    
    } catch (error) {
      console.log('Error:', error.message)
      return error.message
    }}

