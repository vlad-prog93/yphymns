import style from './SignUp.module.css'
import { Link } from 'react-router-dom'
import Title from '@components/UI/Title/Title'
import { useState } from "react"
import { toRegisterUser } from "@redux/reducers/users/ActionCreatorUsers"
import Input from '@components/UI/Input/Input'
import Button from '@components/UI/Button/Button'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { Path_of_Routes } from '@utils/routes'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(s => s.user)

  const [email, setEmail] = useState("")

  const handleRegister = () => {
    dispatch(toRegisterUser(email))
  }

  return (
    <div className={style.signUp}>
      <Title>Регистрация</Title>
      <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Button onClick={handleRegister} disabled={isLoading}>Зарегистрироваться</Button>
      <p className={style.signUp__footer}>Уже зарегистрированы?
        <Link className={style.signUp__link} to={Path_of_Routes.signIn}>
          Вход
        </Link>
      </p>
    </div>
  )
}

export default SignUp