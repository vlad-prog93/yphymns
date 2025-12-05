//импорт стилей
import style from './modalCollection.module.css'

//импорт компонентов
import { ModalCollectionForm } from "../ModalCollectionForm/ModalCollectionForm"

//импорт store
import { useAppDispatch } from '@redux/hooks'
import { collectionSlice } from '@redux/reducers/collections/CollectionSlice'



const ModalCollection = () => {
  const dispatch = useAppDispatch()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation()
      dispatch(collectionSlice.actions.hideModal())
    }

  }

  return (
    <section className={style.modalCollection} onClick={handleClick}>
      <ModalCollectionForm />
    </section>
  )
}

export default ModalCollection