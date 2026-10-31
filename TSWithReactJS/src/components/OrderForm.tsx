import React, { useState } from 'react'

interface OrderFormProps{
  onSubmit(order:{name:string;cups:number}):void
}
const OrderForm = ({onSubmit}:OrderFormProps) => {
  const [name,setName]=useState<string>("Mango Shake");
  const [cups,setCups]=useState(2);
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    onSubmit({name,cups});
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Menu label</label>
      <input value={name} id='name'
      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} />

      <label htmlFor="cups">Cups</label>
      <input value={cups} id='cups' type='number'
      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setCups(Number(e.target.value || 0))} />
      <button>Submit</button>
    </form>
  )
}

export default OrderForm
