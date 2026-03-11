import style from './Button.module.css'

type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'control'
  size?: 'sm' | 'md' | 'lg'
}

const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => {
  const classes = [
    style.button,
    style[variant],
    className
  ].join(' ')

  return (
    <button className={classes} {...props}>
      {props.children}
    </button>
  )
}

export default Button