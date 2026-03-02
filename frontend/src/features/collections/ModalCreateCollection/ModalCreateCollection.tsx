//импорт стилей
import style from './ModalCreateCollection.module.css'

//импорт компонентов
import { ModalCollectionForm } from "../ModalCollectionForm/ModalCollectionForm"

//импорт store
import { useAppDispatch } from '@redux/hooks'
import { collectionSlice } from '@redux/reducers/collections/CollectionSlice'
import { toEditOneCol } from '@redux/reducers/collections/ActionCreatorCollections'



export const ModalCreateCollection = () => {
  const dispatch = useAppDispatch()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation()
      dispatch(collectionSlice.actions.hideModal())
    }

  }

  return (
    <section className={style.modalCollection} onClick={handleClick}>
      <ModalCollectionForm submit={(value:) => dispatch(toEditOneCol())} />
    </section>
  )
}