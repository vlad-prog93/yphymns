//импорт из пакетов
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useCallback } from 'react'

//импорт стилей
import style from './Admin.module.css'

//импорт store
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { toDeleteOneHymn, toPullDataHymns, toPushDataHymns } from '@redux/reducers/hymns/ActionCreatorHymns'
import { collectionSlice } from '@redux/reducers/collections/CollectionSlice'

//импорт констант
import { Path_of_Routes } from '@utils/routes'
import { ICollection } from '@models/collection'
import { toDeleteOneCol } from '@redux/reducers/collections/ActionCreatorCollections'
import { Details } from '@components/UI/Details/Details'
import Button_2 from '@components/UI/Button_2/Button_2'

const Admin = () => {
  //работа с пакетами
  const navigate = useNavigate()

  //работа со store
  const { hymns } = useAppSelector(state => state.hymn)
  const { collections } = useAppSelector(state => state.collections)
  const dispatch = useAppDispatch()


  //управление кнопками
  const handleDelete = useCallback((id: string) => {
    dispatch(toDeleteOneHymn(id))
  }, [dispatch])

  const handleEdit = useCallback((id: string) => {
    navigate(`hymns/hymn/${id}`)
  }, [navigate])

  const uploadFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target?.files) {
      dispatch(toPushDataHymns(e.target.files[0]))
    }
  }, [dispatch])

  const handleCreateCollection = useCallback(() => {
    dispatch(collectionSlice.actions.showModal())
  }, [dispatch])

  const handleEditCollection = useCallback((collection: ICollection) => {
    dispatch(collectionSlice.actions.setCurrentCollection(collection))
    dispatch(collectionSlice.actions.showModal())
  }, [dispatch])

  return (
    <section className={style.admin}>


      {/* шапка страницы */}
      <h3 className={style.admin__title}>Выберите действие</h3>
      <div className={style.admin__buttonContainer}>
        <Link className={style.admin__link} to={Path_of_Routes.newHymn} children='Создать гимн' />
        <button className={style.admin__link} onClick={handleCreateCollection} children='Создать сборник' />
        <button className={style.admin__link} onClick={() => dispatch(toPullDataHymns())} children='Скачать файл из БД' />
        <form>
          <label className={style.input__file}>
            <input type="file" name="file" onChange={uploadFile} />
            <span>Загрузить файл в БД</span>
          </label>
        </form>
      </div>

      {/* основная информация */}
      <h3 className={style.admin__title}>Сборники</h3>
      {collections.map((collection) => {
        const hymnsInCollection = hymns.filter(h => h.collection === collection._id)
        return (
          <Details
            key={collection._id}
            title={`${collection.name} - ${hymnsInCollection.length} гимнов`}
          >
            <div className={style.details__config}>
              <p>Сборник: </p>
              <Button_2 onClick={() => handleEditCollection(collection)}>Редактировать</Button_2>
              <Button_2 onClick={() => dispatch(toDeleteOneCol(collection._id))}>Удалить</Button_2>
            </div>
            <ul className={style.admin__list}>
              {hymnsInCollection.map(h => (
                <li key={h._id} className={style.admin__item}>
                  <span className={style.admin__itemNumber}>{h.number}</span>
                  <span className={style.admin__itemTitle}>{h.title}</span>
                  <Button_2 onClick={() => handleEdit(h._id)}>Редактировать</Button_2>
                  <Button_2 onClick={() => handleDelete(h._id)}>Удалить</Button_2>
                </li>
              ))}
            </ul>
          </Details>
        )
      })}
    </section>
  )
}

export default Admin

