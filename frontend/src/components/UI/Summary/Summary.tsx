import style from './Summary.module.css'

type SummaryProps = React.ComponentProps<'summary'> & {
  variant?: 'primary' | 'control'
  size?: 'sm' | 'md' | 'lg'
}

const Summary = ({ className = '', ...props }: SummaryProps) => {
  const classes = [
    style.summary,
    className
  ].join(' ')

  return (
    <summary className={classes} {...props}>
      {props.children}
    </summary>
  )
}

export default Summary