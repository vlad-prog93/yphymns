import style from './WrapperPage.module.css'

const WrapperPage = (props: React.ComponentProps<'main'>) => {
  return <main className={style.wrapper} {...props}>
    {props.children}
  </main>
}

export default WrapperPage
