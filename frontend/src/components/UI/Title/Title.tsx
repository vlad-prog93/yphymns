import style from './Title.module.css'

const Title = ({ title }: { title: string }) => {
  return (
    <h2 className={style.title}>{title}</h2>
  )
}

export default Title