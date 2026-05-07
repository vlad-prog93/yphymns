import style from './Admin.module.css'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { toGetAllEdits } from "@redux/reducers/editEntity/ActionCreatorEditEntity"
import { resetPassword, toDeleteUser, toGetAllUsers } from "@redux/reducers/users/ActionCreatorUsers"
import Details from "@components/UI/Details/Details"
import Summary from "@components/UI/Summary/Summary"
import Button from "@components/UI/Button/Button"
import { Link } from 'react-router-dom'
import { ICollection } from '@features/collections/model/collection'
import { IEntityEdit } from '@redux/reducers/editEntity/EditEntitySlice'
import { IHymn } from '@features/hymns/model/hymns'
import { Path_of_Routes } from '@utils/routes'

const Admin = () => {
  const dispatch = useAppDispatch()
  const { edits } = useAppSelector(s => s.editEntity)
  const { users } = useAppSelector(s => s.user)

  useEffect(() => {
    dispatch(toGetAllEdits())
    dispatch(toGetAllUsers())
  }, [users.length, edits.length, dispatch])


  const renderEntity = (edit: IEntityEdit) => {
    if (edit.type === 'update' && edit.entityType === 'hymn') {
      return (
        <>
          'Гимн: '
          {'🆕'}
          {edit.entityType}
          <Button><Link to={Path_of_Routes.compareHymn(edit.data)}>Открыть</Link></Button>
        </>
      )
    }


  }

  return (
    <div>
      <h1>Админ панель</h1>

      {/* 👇 Пользователи */}
      <Details open>
        <Summary>Пользователи</Summary>

        <ul className={style.admin__list}>
          {users?.map(user => (
            <li className={style.admin__item} key={user._id}>
              <span className={style.admin__email}>{user.email}</span>
              <Button onClick={() => dispatch(resetPassword(user.email))}>Сбросить пароль</Button>
              <Button onClick={() => dispatch(toDeleteUser(user._id))}>Удалить</Button>
            </li>
          ))}
        </ul>
      </Details>

      {/* 👇 Правки гимнов */}
      <Details open>
        <Summary>Редактируемые объекты</Summary>

        <ul className={style.admin__list}>
          {edits.map(edit => (
            <li className={style.admin__item} key={edit.data._id}>
              {edit && renderEntity(edit)}
            </li>
          ))}
        </ul>
      </Details>
    </div >
  )
}

export default Admin