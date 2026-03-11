import style from './Title.module.css'

const Title = (props: React.ComponentProps<'h2'>) => {
  return (
    <h2 className={style.title} {...props} >
      {props.children}
    </h2>
  )
}

export default Title