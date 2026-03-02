import { forwardRef } from 'react'

import style from './Input.module.css'


const Input = forwardRef((props: any, ref) => {
  return (
    <input
      className={style.input}
      {...props}
    />
  )
})

export default Input