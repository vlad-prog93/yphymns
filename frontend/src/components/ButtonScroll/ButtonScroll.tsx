import { useCallback, useEffect, useState } from 'react'
import style from './ButtonScroll.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { hymnsSlice } from '../../redux/reducers/HymnSlice'
import { SPEED_CONFIG } from '../../utils/const'
import MyButton from '../MyButton/MyButton'


const ButtonScroll = ({ alreadyBottom }: { alreadyBottom: boolean }) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null)

  const [speed, setSpeed] = useState<1 | 2 | 3>(1)

  const { isScroll } = useAppSelector(state => state.hymnReducer)
  const { isMenuActive } = useAppSelector(state => state.menuReducer)
  const dispatch = useAppDispatch()

  const scroll = useCallback(() => {
    window.scrollBy(0, 1)
    console.log('scroll on')
  }, [])

  const handleScroll = () => {
    const interval = SPEED_CONFIG[speed]
    setSpeed(prev => {
      if (prev === 1) return 2
      if (prev === 2) return 3
      return 1
    })
    intervalId && clearInterval(intervalId)
    setIntervalId(null)
    dispatch(hymnsSlice.actions.offScroll())
    const toScroll = setInterval(scroll, interval)
    setIntervalId(toScroll)
    dispatch(hymnsSlice.actions.onScroll())
  }

  const stopScroll = () => {
    if (isScroll) {
      intervalId && clearInterval(intervalId)
      setIntervalId(null)
      dispatch(hymnsSlice.actions.offScroll())
      setSpeed(1)
    }
  }

  useEffect(() => {
    if (alreadyBottom) {
      stopScroll()
    }
  }, [alreadyBottom])

  useEffect(() => {
    stopScroll()
  }, [isMenuActive])

  useEffect(() => {
    return stopScroll()
  }, [])

  return (
    <div className={style.buttonContainer}>
      <MyButton onClick={() => stopScroll()}>S</MyButton>
      <MyButton onClick={() => handleScroll()}>&darr;</MyButton>
    </div>
  )
}

export default ButtonScroll