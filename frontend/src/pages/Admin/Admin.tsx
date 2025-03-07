import style from './Admin.module.css'
import { useAppSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { toDeleteHymn, toDownloadFileWithHymns, toFetchHymns, toUploadFile } from '../../redux/reducers/ActionCreator'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import Button from '../../components/UI/Button/Button'
import { useEffect, useId, useRef } from 'react'
import { hymnsSlice } from '../../redux/reducers/HymnSlice'

const Admin = () => {
  const navigate = useNavigate()
  const uploadRef = useRef<HTMLFormElement>(null)

  const { hymns } = useAppSelector(state => state.hymnReducer)
  const dispatch = useDispatch()



  const handleDelete = (id: string) => {
    toDeleteHymn(dispatch, id)
  }

  const handleEdit = (id: string) => {
    navigate(`hymns/${id}`)
  }

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.target.files && toUploadFile(e.target.files[0])
  }

  useEffect(() => {
    window.scrollTo({ top: 1 })
    dispatch(hymnsSlice.actions.deleteCurrentHymn())
    toFetchHymns(dispatch)
  }, [])

  return (
    <div className={style.admin}>

      <h3 className={style.admin__title}>Выберите действие</h3>
      <div className={style.admin__buttonContainer}>
        <Link className={style.admin__link} to={ROUTES.admin + ROUTES.hymns + ROUTES.newHymn} children='Создать гимн' />
        <button className={style.admin__link} onClick={toDownloadFileWithHymns} children='Скачать файл из БД' />
        <form className={style.admin__form} ref={uploadRef}>
          <label className={style.input__file}>
            <input type="file" name="file" onChange={(e) => uploadFile(e)} />
            <span>Загрузить файл в БД</span>
          </label>
        </form>
      </div>

      <ul className={style.admin__list}>
        {[...hymns].sort((hymn_1, hymn_2) => hymn_1.number - hymn_2.number).map(hymn => {
          return (
            <li className={style.admin__item} key={hymn._id}>
              <span className={style.admin__number}>{hymn.number} - </span>
              <span className={style.admin__text}>{hymn.shortText}</span>
              <button className={style.admin__button} onClick={() => hymn._id && handleEdit(hymn._id)}>Редактировать</button>
              <button className={style.admin__button} onClick={() => hymn._id && handleDelete(hymn._id)}>Удалить</button>
            </li>)
        })}
      </ul>
    </div>
  )
}

export default Admin