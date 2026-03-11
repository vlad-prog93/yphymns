import style from './Input.module.css'


const Input = (props: React.ComponentProps<'input'>) => {
  return (
    <input
      className={style.input}
      {...props}
    />
  )
}

export default Input