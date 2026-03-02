import style from './Button_2.module.css'

const Button_2 = (props: { disabled?: boolean, children: string, onClick?: () => void, type?: 'button' | 'submit' | 'reset' }) => {
  return (
    <button className={style.button} {...props} />
  )
}

export default Button_2