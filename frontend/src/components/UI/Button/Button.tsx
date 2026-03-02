import style from './Button.module.css'

interface ButtonProps {
  disabled?: boolean,
  children?: string | React.ReactNode,
  onClick?: () => void,
  type?: 'button' | 'submit' | 'reset'
  style?: any
}

const Button = (props: ButtonProps) => {
  return (
    <button className={style.button} {...props}>{props.children}</button>
  )
}

export default Button