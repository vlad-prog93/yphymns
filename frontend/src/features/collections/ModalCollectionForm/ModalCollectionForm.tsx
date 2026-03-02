import { useState } from 'react'
import Input from '@components/UI/Input/Input'
import style from './ModalCollectionForm.module.css'
import { useAppSelector } from '../../../redux/hooks'
import Button from '../../../components/UI/Button/Button'


export const ModalCollectionForm = ({ submit }: { submit: (e: React.FormEvent, name: string) => void }) => {
  const [name, setInputName] = useState('')
  const col = useAppSelector(state => state.collections)


  return (
    <form className={style.modalCollection__form} onSubmit={(e) => submit(e, name)}>
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