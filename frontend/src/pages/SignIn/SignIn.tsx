import style from './SignIn.module.css'
import Title from '@components/UI/Title/Title'
import { useState } from "react"
import { toLoginUser, resetPassword } from "@redux/reducers/users/ActionCreatorUsers"
import Input from '@components/UI/Input/Input'
import Button from '@components/UI/Button/Button'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { logout } from '@redux/reducers/users/UsersSlice'

const SignIn = () => {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, isLoading } = useAppSelector(s => s.user)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    dispatch(toLoginUser({ email, password }))
  }

  const handlelogout = () => {
    dispatch(logout())
  }

  const handleResetPassword = () => {
    dispatch(resetPassword(email))
  }

  if (isAuthenticated) {
    return (
      <div className={style.signIn}>
        <Title>Вход</Title>
        {isAuthenticated && <p>Вы вошли под пользователем: {user?.email}, Роль: {user?.role}</p>}
        <Button onClick={handlelogout}>Выйти</Button>
      </div>
    )
  }

  return (
    <div className={style.signIn}>
      <Title>Вход</Title>

      <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={handleLogin} disabled={isLoading}>Войти</Button>
      <span>Забыли пароль? <Button variant='control' onClick={handleResetPassword}>Отправить пароль на почту</Button></span>


    </div>
  )

}


export default SignIn