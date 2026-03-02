//импорт стилей
import style from './modalCollection.module.css'

//импорт компонентов
import { ModalCollectionForm } from "../ModalCollectionForm/ModalCollectionForm"

//импорт store
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { collectionSlice } from '@redux/reducers/collections/CollectionSlice'
import { toCreateCol, toEditOneCol } from '@redux/reducers/collections/ActionCreatorCollections'



const ModalCollection = () => {
  const dispatch = useAppDispatch()
  const { currentCollection } = useAppSelector(s => s.collections)

  const handleClick = (e: React.FormEvent, name: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget !== e.target) {
      dispatch(collectionSlice.actions.setError('Непредвиденная ошибка'))
      return null
    }
    if (!currentCollection) dispatch(toCreateCol(name))
    else dispatch(toEditOneCol({ ...currentCollection, name }))
    dispatch(collectionSlice.actions.hideModal())
    dispatch(collectionSlice.actions.clearError())
  }

  return (
    <section className={style.modalCollection}>
      <ModalCollectionForm submit={(e: React.FormEvent, name: string) => handleClick(e, name)} />
    </section>
  )
}

export default ModalCollection