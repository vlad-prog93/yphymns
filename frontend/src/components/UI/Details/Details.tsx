import style from './Details.module.css'

type DetailsProps = React.ComponentProps<'details'> & {
  variant?: 'primary' | 'control'
  size?: 'sm' | 'md' | 'lg'
}

const Details = ({ className = '', ...props }: DetailsProps) => {
  const classes = [
    style.details,
    className
  ].join(' ')

  return (
    <details className={classes} {...props}>
      {props.children}
    </details>
  )
}

export default Details