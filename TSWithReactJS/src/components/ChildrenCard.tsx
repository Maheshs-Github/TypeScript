import React, { type PropsWithChildren, type ReactNode } from 'react'

interface ChildrenCardProps extends PropsWithChildren{
  title:string,
  footer?:ReactNode,
}
const ChildrenCard = ({title,children,footer}:ChildrenCardProps) => {
  return (
    <section>
      <h2>{title}</h2>
      {children}
      {footer && <footer>{footer}</footer>}
      
    </section>
  )
}

export default ChildrenCard
