import style from './Admin.module.css'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { toGetAllEdits } from "@redux/reducers/editHymns/ActionCreatorEditHymns"
import { resetPassword, toDeleteUser, toGetAllUsers } from "@redux/reducers/users/ActionCreatorUsers"
import Details from "@components/UI/Details/Details"
import Summary from "@components/UI/Summary/Summary"
import Button from "@components/UI/Button/Button"
import { Link } from 'react-router-dom'

const Admin = () => {
  const dispatch = useAppDispatch()
  const { edits } = useAppSelector(s => s.editHymns)
  const { users } = useAppSelector(s => s.user)

  useEffect(() => {
    dispatch(toGetAllEdits())
    dispatch(toGetAllUsers())
  }, [users.length, edits.length, dispatch])

  return (
    <div>
      <h1>Админ панель</h1>

      {/* 👇 Пользователи */}
      <Details open>
        <Summary>Пользователи</Summary>

        <ul className={style.admin__list}>
          {users?.map(user => (
            <li className={style.admin__item} key={user.id}>
              <span className={style.admin__email}>{user.email}</span>

              <Button onClick={() => resetPassword(user.email)}>Сбросить пароль</Button>
              <Button onClick={() => dispatch(toDeleteUser(user.id))}>Удалить</Button>
            </li>
          ))}
        </ul>
      </Details>

      {/* 👇 Правки гимнов */}
      <Details open>
        <Summary>Редактируемые гимны</Summary>

        <ul className={style.admin__list}>
          {edits.map(edit => (
            <li className={style.admin__item} key={edit.data._id}>
              {edit.data.number} — {edit.data.title} ({edit.status})

              <Button><Link to={`/admin/hymn-edit/${edit.data._id}`}>Открыть</Link></Button>
            </li>
          ))}
        </ul>
      </Details>
    </div >
  )
}

export default Admin