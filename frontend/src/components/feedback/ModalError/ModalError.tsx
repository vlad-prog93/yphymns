import style from './ModalError.module.css'

const ModalError = ({ error }: { error: string }) => {

  return (
    <div className={style.modal}>
      <span className={style.modal__text}>{error}</span>
    </div>
  )
}

export default ModalError