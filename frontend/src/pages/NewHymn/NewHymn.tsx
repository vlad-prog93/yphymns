import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import style from './NewHymn.module.css'

import { Path_of_Routes } from "@utils/routes"

import { IHymn } from "@models/hymns"

import FormHymn from "@features/hymns/FormHymn/FormHymn"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { moveAccordsInText } from "@features/hymns/workWithTextHymns"
import { hymnsSlice } from "@redux/reducers/hymns/HymnSlice"
import { toCreateHymn } from "@redux/reducers/hymns/ActionCreatorHymns"



const NewHymn = () => {
  const { collections } = useAppSelector(s => s.collections)

  const [newHymn, setNewHymn] = useState<Omit<IHymn, '_id'>>()
  const [quantityVerse, setQuantityVerse] = useState<number>(0)
  const [quantityBridge, setQuantityBridge] = useState<number>(1)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const AddVerse = () => {
    setQuantityVerse(prev => prev + 1)
    if (newHymn) setNewHymn({ ...newHymn, text: { ...newHymn.text, [(quantityVerse + 1).toString() + ' verse']: '' } })
    else setNewHymn({ number: 0, collection: '', title: '', text: { [(quantityVerse + 1).toString() + ' verse']: '' } })
  }

  const AddChorus = () => {
    if (newHymn) setNewHymn({ ...newHymn, text: { ...newHymn.text, [(quantityVerse).toString() + ' chorus']: '' } })
    else setNewHymn({ number: 0, collection: '', title: '', text: { [(quantityVerse).toString() + ' chorus']: '' } })
  }
  const AddBridge = () => {
    setQuantityBridge(prev => prev + 1)
    if (newHymn) setNewHymn({ ...newHymn, text: { ...newHymn.text, [(quantityVerse).toString() + ' verse ' + (quantityBridge).toString() + ' bridge']: '' } })
    else setNewHymn({ number: 0, collection: '', title: '', text: { [(quantityVerse).toString() + ' verse ' + (quantityBridge).toString() + ' bridge']: '' } })
  }


  const saveHymn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(newHymn)
    if (newHymn) {
      const hymn: Omit<IHymn, '_id'> = { ...newHymn, text: moveAccordsInText(newHymn.text) }

      if (!hymn.title) {
        dispatch(hymnsSlice.actions.setError('Введите название гимна'))
        return
      }
      if (!hymn.collection) {
        dispatch(hymnsSlice.actions.setError('Заполните поле "сборник"'))
        return
      }
      if (!hymn.number) {
        dispatch(hymnsSlice.actions.setError('Заполните поле "номер"'))
        return
      }
      console.log(hymn)

      setNewHymn({ ...hymn })
      dispatch(toCreateHymn(hymn))
      navigate('/admin')
    }
  }


  return (
    <section className={style.newHymn}>
      <Link className={style.newHymn__link} to={Path_of_Routes.admin} children='Назад' />
      <h4 className={style.newHymn__title}>Создание нового гимна</h4>
      <ul className={style.newHymn__list}>
        <li className={style.newHymn__item}>
          <button className={style.newHymn__button} children='Добавить куплет' onClick={AddVerse} />
        </li>
        <li className={style.newHymn__item}>
          <button className={style.newHymn__button} children='Добавить припев' onClick={AddChorus} />
        </li>
        <li className={style.newHymn__item}>
          <button className={style.newHymn__button} children='Добавить мост' onClick={AddBridge} />
        </li>
      </ul>

      {newHymn && <FormHymn collections={collections} hymn={newHymn} setHymn={setNewHymn} saveHymn={saveHymn} />}

    </section>
  )
}

export default NewHymn