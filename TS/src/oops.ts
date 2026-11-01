class Chai{
  flavour:string;
  price:number;

  // diff constructor with diff aregumne s
  // constructor(flavour:string,price:number){
  //   this.flavour=flavour;
  //   this.price=price;
  // }

    constructor(flavour:string){
    this.flavour=flavour;
  }
}

// const MaslaaChai=new Chai("Ginger",20);
const MaslaaChai=new Chai("Ginger");
MaslaaChai.flavour="masala";


// access modifiers
class Chai2{
  public flavour:string="Masala" //accessable to everyone
  private secretingrediants:string="Dunno" //only in class
  protected shopName="Chai Corner" //in class and whoever extends it 
  reveal(){
    return this.secretingrediants
  }
}

const c=new Chai2();
c.reveal(); // only methods are accessiable not a variables 

class Shop{
  protected shopName="Chai Corner"
}
class Branch extends Shop{
  getName(){
    return this.shopName;
  }
}

new Branch().getName();


// way to write privet variable 
class Wallet{
  #balance=100
  getBalance(){
    return this.#balance;
  }
}

new Wallet().getBalance();

// readonly
class Cup{
  readonly capacity:number=250;

  constructor(capacity:number){
    this.capacity=capacity;
  }
}


// gettter and setter 
class ModernChai{
  private _sugar=2;
  getSugar(){
    return this._sugar;
  }
  set sugar(value:number){
    if(value>5) throw new Error("too Sweet")
      this._sugar=this._sugar
  }
}

const c1=new ModernChai();
c1.getSugar()


//static members
class EkChai{
  static shopName="New Cahi Store"

  constructor(public falvour:string){}
}
console.log(EkChai.shopName) // can directly wthout craeting teh obj


// abstract class ,give small ecample of it too 
// what is compostion , how it is diff of inheritance