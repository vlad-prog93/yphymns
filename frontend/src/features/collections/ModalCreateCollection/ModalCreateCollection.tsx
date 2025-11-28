//импорт стилей
import style from './ModalCreateCollection.module.css'

//импорт компонентов
import { ModalCollectionForm } from "../ModalCollectionForm/ModalCollectionForm"

//импорт store
import { useAppDispatch } from '../../../redux/hooks'
import { CollectionSlice } from '../../../redux/reducers/CollectionSlice'



export const ModalCreateCollection = () => {
  const dispatch = useAppDispatch()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation()
      dispatch(CollectionSlice.actions.hideModal())
    }

  }

  return (
    <section className={style.modalCollection} onClick={handleClick}>
      <ModalCollectionForm />
    </section>
  )
}