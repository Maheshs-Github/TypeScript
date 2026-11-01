
// what are the generics (Genaral things), kinda diff to understadn it 
function wrapInArray<T>
  (item:T):T[]
  {
    return [item];
  }

  // para item of T datatype retruning T ,and all diff paras
  wrapInArray("masala");
  wrapInArray(42);
  wrapInArray({falvour:"ginger"});


  // could u tell m the syntax of thsi one 
  function pair<A,B>(a:A,b:B):[A,B]{
    return [a,b]
  }

  pair("masala","test");
  pair("masala",20);
  pair("masala",{name:"Mahesh"});


  // so we can us ethe generics for the inteface too, 
  interface Box<T>{
    content:T
  }


  // basically T means any varibale data type, below instead of number , we can have string, etc, anything 
  const numberBox:Box<number>={content:10}
  const stringBox:Box<string>={content:"hemlo"}
  const arrayBox:Box<string[]>={content:["hemlo","nthg","got","it"]}



// let's seee the pratical use of the generics
interface ApiPromise<T>{
  status:number,
  data:T
}

const res:ApiPromise<{flavour:string}>={
status:200,
data:{flavour:"masala"}
}

// nmostly generics comes as Predefined