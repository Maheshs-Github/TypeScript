interface CardProp{
  name:string,
  email:string,
  price:number,
  isSpecial?:boolean,
}
const Card=({name,email,price,isSpecial=false}:CardProp)=>{
  return(
    <>
    <h2>Hello There, {name}</h2>
    <p>{email}</p>
    <p>{price}</p>
    <p>{isSpecial && <span>Special</span>}</p>
    </>
  );
}

export default Card;