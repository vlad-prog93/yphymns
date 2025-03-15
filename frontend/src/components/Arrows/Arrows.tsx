import { Link, useNavigate } from 'react-router-dom'

// стили
import style from './arrows.module.css'
import arrow_back from '../../assets/icons/arrows/arrow-back.png'
import arrow_next from '../../assets/icons/arrows/arrow-next.png'


// redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { hymnsSlice } from '../../redux/reducers/HymnSlice'
import { ROUTES } from '../../utils/routes'
import { useEffect } from 'react'

// components
import MyButton from '../MyButton/MyButton'

const Arrows = () => {
  const { currentHymn, hymns } = useAppSelector(state => state.hymnReducer)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    navigate(ROUTES.home + ROUTES.hymns + '/' + currentHymn?._id)
  }, [currentHymn])

  const prevHymn = () => {
    dispatch(hymnsSlice.actions.offScroll())
    dispatch(hymnsSlice.actions.prevHymn())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const nextHymn = () => {
    dispatch(hymnsSlice.actions.offScroll())
    dispatch(hymnsSlice.actions.nextHymn())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div className={style.arrows}>
      {currentHymn?.number !== 1 && <MyButton onClick={prevHymn}>
        <img src={arrow_back} alt="back" />
      </MyButton>}
      {hymns.length !== currentHymn?.number && <MyButton onClick={nextHymn}>
        <img src={arrow_next} alt="next" />
      </MyButton>}
    </div>
  )
}

export default Arrows