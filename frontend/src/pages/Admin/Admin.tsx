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
import { ICollection } from '@features/collections/model/collection'
import { toDeleteOneCol } from '@redux/reducers/collections/ActionCreatorCollections'
import Details from '@components/UI/Details/Details'
import Button from '@components/UI/Button/Button'
import Summary from '@components/UI/Summary/Summary'
import Title from '@components/UI/Title/Title'

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
    <>


      {/* шапка страницы */}
      <Title>Выберите действие</Title>
      <div className={style.admin__buttonContainer}>
        <Link to={Path_of_Routes.newHymn}>
          <Button>Создать гимн</Button>
        </Link>
        <Button onClick={handleCreateCollection}>
          Создать сборник
        </Button>
        <Button onClick={() => dispatch(toPullDataHymns())}>
          Скачать файл из БД
        </Button>
        <form>
          <label className={style.input__file}>
            <input type="file" name="file" onChange={uploadFile} />
            <span>Загрузить файл в БД</span>
          </label>
        </form>
      </div>

      {/* основная информация */}
      <Title>Сборники</Title>
      {collections.map((collection) => {
        const hymnsInCollection = hymns.filter(h => h.collection === collection._id)
        return (
          <Details key={collection._id}>
            <Summary>{`${collection.name} - ${hymnsInCollection.length} гимнов`}</Summary>
            <div className={style.details__config}>
              <p>Сборник: </p>
              <Button onClick={() => handleEditCollection(collection)}>Редактировать</Button>
              <Button onClick={() => dispatch(toDeleteOneCol(collection._id))}>Удалить</Button>
            </div>
            <ul className={style.admin__list}>
              {hymnsInCollection.map(h => (
                <li key={h._id} className={style.admin__item}>
                  <span className={style.admin__itemNumber}>{h.number}</span>
                  <span className={style.admin__itemTitle}>{h.title}</span>
                  <Button onClick={() => handleEdit(h._id)}>Редактировать</Button>
                  <Button onClick={() => handleDelete(h._id)}>Удалить</Button>
                </li>
              ))}
            </ul>
          </Details>
        )
      })}
    </>
  )
}

export default Admin

