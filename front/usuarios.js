class Usuario{
    constructor(idUser){
        this.username=""
        this.password=""
        this.is_admin=false
        this.points=0
        this.id=idUser
        this.items=[]
    }
    async updateuser(){
        let newuser= await getUsuarioporID(this.id);
        let inv= await getInventario(this.id)
        console.log(this.id)
        console.log(inv)
        console.log(newuser.username)
        this.username=newuser.username
        this.password=newuser.password
        this.is_admin=newuser.is_admin
        this.points=parseInt(newuser.points)
        this.items=inv
        console.log(this)

    }
}

