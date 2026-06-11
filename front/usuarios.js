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
        this.username=newuser.username
        this.password=newuser.password
        this.is_admin=newuser.is_admin
        this.points=newuser.points
        this.items=getInventario(this.id)
    }
}

