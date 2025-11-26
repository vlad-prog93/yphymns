import { useState } from 'react'
import Input from '../UI/Input/Input'
import style from './ModalCollectionForm.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import Button from '../UI/Button/Button'
import { toCreateCollection, toEditCollection } from '../../redux/reducers/ActionCreatorCollections'
import { ICollection } from '../../models/collection'

export const ModalCollectionForm = () => {
  const [name, setInputName] = useState('')
  const col = useAppSelector(state => state.collectionsReducer)
  const dispatch = useAppDispatch()

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (col.currentCollection) {
      const data: ICollection = { ...col.currentCollection, name }
      toEditCollection(dispatch, data)
      return
    }
    toCreateCollection(dispatch, name)
    return
  }


  return (
    <form className={style.modalCollection__form} onSubmit={handleSubmitForm}>
      <h4
        className={style.modalCollection__title}
      >
        {col.currentCollection?.name || 'Введите название нового сборника'}
      </h4>
      <Input
        className={style.modalCollection__input}
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.currentTarget.value)}
      />
      <Button children={col.currentCollection?.name ? 'Редактировать' : 'Создать'} />
    </form>
  )
}