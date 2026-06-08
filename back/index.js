var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const MySQL = require('./modulos/mysql');

var app = express();
var port = process.env.PORT || 4000;
app.use(cors());


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', function(req, res){
	res.status(200).send({
		message: `Hola`
	});
});


app.get('/Ranking', async function(req, res){
	try {
		console.log(req.query)
			
			respuesta = await MySQL.realizarQuery(`SELECT * FROM Usuarios order by points desc;`)
	
		
				
		res.status(200).send({
				message: respuesta
			});
	} catch (error) {
console.log('Error:', error.message)
		res.status(500).send({
			message: "Error al obtener el ranking"
		});
	}
});


app.get('/Usuario', async function(req, res){
	try {
		console.log(req.query)
		id=req.query.id
		if (id){
			respuesta = await MySQL.realizarQuery(`SELECT * FROM Usuarios WHERE id = ${id};`)

		}else{
			respuesta = await MySQL.realizarQuery(`SELECT * FROM Usuarios;`)
		}
	
			
	
		res.status(200).send({
			message: respuesta
		});
		console.log('Usuario enviado')
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error al obtener el usuario"
		});
	}
});


app.get('/Items', async function(req, res){
	try {
		console.log(req.query)
		id=req.query.id
		ordered=req.query.ordered

		if (id){
			respuesta = await MySQL.realizarQuery(`SELECT * FROM Items WHERE id = ${id};`)

		}else{if(ordered){
			respuesta = await MySQL.realizarQuery(`SELECT * FROM Items order by price asc;`)
		}else{
			respuesta = await MySQL.realizarQuery(`SELECT * FROM Items;`)
		}
			
		}
	
			
	
		res.status(200).send({
			message: respuesta
		});
		console.log('Item enviado')
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error al obtener el item"
		});
	}
});



app.get('/ItemsporUsuario', async function(req, res){
	try {
		console.log(req.query)
		userid=req.query.userid
		itemid=req.query.itemid

		if (userid && itemid){
			respuesta = await MySQL.realizarQuery(`SELECT * FROM ItemsporUsuario WHERE userid = ${userid} AND itemid = ${itemid};`)

		}else{if(userid){
			respuesta = await MySQL.realizarQuery(`SELECT * FROM ItemsporUsuario WHERE userid = ${userid};`)
		}else{
			respuesta = await MySQL.realizarQuery(`SELECT * FROM ItemsporUsuario;`)
		}
			
		}
	
			
	
		res.status(200).send({
			message: respuesta
		});
		console.log('ItemporUsuario enviado')
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error al obtener el itemporusuario"
		});
	}
});

app.post('/Usuarios', async function(req, res){
	try {
		console.log(req.body);
		existe = await MySQL.realizarQuery(`SELECT * FROM Usuarios WHERE username="${req.body.username}" AND password = "${req.body.password}";`)
		if (existe.length===0){
			await MySQL.realizarQuery(`INSERT INTO Usuarios (username,password,points,is_admin)
			VALUES ("${req.body.username}", "${req.body.password}", ${req.body.points}, ${req.body.is_admin});`)
			res.send({message: "Usuario agregado"})
		}else{
			res.send({message: "usuario ya existe"})
		};
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error al agregar el usuario"
		});

	}
});

app.post('/Items', async function(req, res){
	try {
		console.log(req.body);
		existe = await MySQL.realizarQuery(`SELECT * FROM Items WHERE name="${req.body.name}";`)
		if (existe.length===0){
			await MySQL.realizarQuery(`INSERT INTO Items (name,imgsrc,price)
			VALUES ("${req.body.name}", "${req.body.imgsrc}", ${req.body.price});`)
			res.send({message: "Item agregado"})
		}else{
			res.send({message: "Item ya existe"})
		};
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error al agregar el item"
		});

	}
});


app.post('/ItemsporUsuario', async function(req, res){
	try {
		console.log(req.body);
		existe = await MySQL.realizarQuery(`SELECT * FROM ItemsporUsuario WHERE userid=${req.body.userid} AND itemid=${req.body.itemid};`)
		if (existe.length===0){
			await MySQL.realizarQuery(`INSERT INTO ItemsporUsuario (itemid,userid,active)
			VALUES (${req.body.userid},${req.body.itemid},${req.body.active});`)
			res.send({message: "Item agregado al usuario"})
		}else{
			res.send({message: "Item ya estaba en el usuario"})
		};
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error al agregar el item al usuario"
		});

	}
});


app.delete('/Usuarios', async function(req, res){
	try {
		await MySQL.realizarQuery(`DELETE FROM Usuarios WHERE id = ${req.body.id};`)
		res.send({message: "Usuario eliminado"})
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error al eliminar el usuario"
		});
	}
});

app.delete('/Items', async function(req, res){
	try {
		await MySQL.realizarQuery(`DELETE FROM Items WHERE id = ${req.body.id};`)
		res.send({message: "Item eliminado"})
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error al eliminar el item"
		});
	}
});


app.delete('/ItemsporUsuario', async function(req, res){
	try {
		await MySQL.realizarQuery(`DELETE FROM ItemsporUsuario WHERE userid = ${req.body.userid} AND itemid= ${req.body.itemid};`)
		res.send({message: "Item eliminado del usuario"})
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error al eliminar el item del usuario"
		});
	}
});



app.put('/Usuarios', async function(req, res){
try {
		username=req.query.username
		password=req.query.password
		points=req.query.points
		is_admin=req.query.is_admin
		id=req.query.id
		if(username){
			await MySQL.realizarQuery(`UPDATE Usuarios SET 
			username = "${req.body.username}" WHERE id = ${req.body.id};`)
		}
		if(password){
			await MySQL.realizarQuery(`UPDATE Usuarios SET 
			password = "${req.body.password}" WHERE id = ${req.body.id};`)
		}
		if(points){
			await MySQL.realizarQuery(`UPDATE Usuarios SET 
			points = ${req.body.points} WHERE id = ${req.body.id};`)
		}
		if(is_admin){
			await MySQL.realizarQuery(`UPDATE Usuarios SET 
			is_admin = ${req.body.is_admin} WHERE id = ${req.body.id};`)
		}
		res.send({message: "Usuario actualizado"})
} catch (error) {
	console.log('Error:', error.message)
	res.status(500).send({
		message: "Error al actualizar el usuario"
	});
}
});



app.put('/Items', async function(req, res){
try {
		name=req.query.name
		imgsrc=req.query.imgsrc
		price=req.query.price
		id=req.query.id
		if(name){
			await MySQL.realizarQuery(`UPDATE Items SET 
			name = "${req.body.name}" WHERE id = ${req.body.id};`)
		}
		if(imgsrc){
			await MySQL.realizarQuery(`UPDATE Items SET 
			imgsrc = "${req.body.imgsrc}" WHERE id = ${req.body.id};`)
		}
		if(price){
			await MySQL.realizarQuery(`UPDATE Items SET 
			price = ${req.body.price} WHERE id = ${req.body.id};`)
		}
		
		res.send({message: "Item actualizado"})
} catch (error) {
	console.log('Error:', error.message)
	res.status(500).send({
		message: "Error al actualizar el item"
	});
}
});


app.put('/onactive', async function(req, res){
try {
		userid=req.query.userid
		itemid=req.query.itemid

			await MySQL.realizarQuery(`UPDATE ItemsporUsuario SET 
			active = True WHERE userid = ${req.body.userid} AND itemid = ${req.body.itemid};`)
		
		res.send({message: "Item activado"})
} catch (error) {
	console.log('Error:', error.message)
	res.status(500).send({
		message: "Error al activar el item"
	});
}
});

app.put('/offactive', async function(req, res){
try {
		userid=req.query.userid
		itemid=req.query.itemid

			await MySQL.realizarQuery(`UPDATE ItemsporUsuario SET 
			active = False WHERE userid = ${req.body.userid} AND itemid = ${req.body.itemid};`)
		
		res.send({message: "Item desactivado"})
} catch (error) {
	console.log('Error:', error.message)
	res.status(500).send({
		message: "Error al desactivar el item"
	});
}
});










app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('[GET] http://localhost:4000/');
});
