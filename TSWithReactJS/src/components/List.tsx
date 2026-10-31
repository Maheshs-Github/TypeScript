import type { Chai } from "../types";
import Card from "./Card";

interface itemsProps{
  items:Chai[],
}
const List=({items}:itemsProps)=>{
  return(
    <>
    <div>Hello There is a List</div>
    {items.map((item)=><Card key={item.id} name={item.name} email={item.email} price={item.price} isSpecial={item.isSpecial} />
    )}
    </>
  )
}
export default List;