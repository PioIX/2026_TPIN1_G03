let idItem=1
class Item{
    constructor(name,imgsrc,price){
        this.name=name
        this.imgsrc=imgsrc
        this.price=price
        this.idItem=idItem
        idItem++
    }
}

const mySkibidi= new Item("Josu","Imgsrc",123421321321)
const noSkibidi= new Item("Joooooosu","imgsrc2",321)
