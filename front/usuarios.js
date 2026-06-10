let idUser = 1
class Usuario{
    constructor(username,password){
        this.username=username
        this.password=password
        this.is_admin=false
        this.points=0
        this.idUser=idUser
        this.items=[]
        idUser++
    }
}

const awa= new Usuario("Pepe","popo")
awa.items.push(mySkibidi)