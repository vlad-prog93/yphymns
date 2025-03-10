import { useCallback, useEffect, useState } from 'react'
import style from './ButtonScroll.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { hymnsSlice } from '../../redux/reducers/HymnSlice'
import { SPEED_CONFIG } from '../../utils/const'
import MyButton from '../MyButton/MyButton'

import icon_stop from '../../assets/icons/arrows/stop.png'
import icon_run_0 from '../../assets/icons/arrows/arrow-down.png'
import icon_run_1 from '../../assets/icons/arrows/arrow-down-1.png'
import icon_run_2 from '../../assets/icons/arrows/arrow-down-2.png'
import icon_run_3 from '../../assets/icons/arrows/arrow-down-3.png'
// автоскролл работает по такому принципу:
// 1 - если нажать кнопку "скроллить"

// автоскролл останавливается по такому принципу:
// 1 - если нажать кнопку "STOP"
// 2 - если нажать на бургер для открытия меню
// 3 - если полоса прокрутки дошла до конца (флагом являемтся тэг внизу гимна)
// 4 - если нажать кнопку перелистывания гимнов
// 5 - если нажать клавишу перелистывания гимнов

const ButtonScroll = ({ alreadyBottom }: { alreadyBottom: boolean }) => {
  // пригодится при скролле мы делаем через таймер. через id его потом останавливать и удалять
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null)
  // скорость скролла. всего 3 скорости
  const [speedScroll, setSpeedScroll] = useState<number>(0)

  const { isScroll } = useAppSelector(state => state.hymnReducer)
  const { isMenuActive } = useAppSelector(state => state.menuReducer)
  const dispatch = useAppDispatch()

  const scroll = useCallback(() => {
    window.scrollBy({ top: 1, behavior: 'smooth' })
  }, [])

  const stopScroll = () => {
    intervalId && clearInterval(intervalId)
    setIntervalId(null)
  }

  const runScroll = () => {
    dispatch(hymnsSlice.actions.onScroll())
    setSpeedScroll(prev => prev === SPEED_CONFIG.length ? 1 : ++prev)
  }

  useEffect(() => {
    stopScroll()
    if (isMenuActive || alreadyBottom || !isScroll) {
      isScroll && dispatch(hymnsSlice.actions.offScroll())
      setSpeedScroll(0)
      return
    }
    const toScroll = setInterval(scroll, SPEED_CONFIG[speedScroll - 1])
    setIntervalId(toScroll)

  }, [isMenuActive, isScroll, alreadyBottom, speedScroll])

  return (
    <div className={style.buttonContainer}>
      <MyButton onClick={() => dispatch(hymnsSlice.actions.offScroll())}>
        <img src={icon_stop} alt="stop" />
      </MyButton>
      <span className={style.speedScroll}>{speedScroll}</span>
      <MyButton onClick={runScroll}>
        {(speedScroll === 0 || speedScroll) && <img src={icon_run_0} alt="run" />}
        {/* {speedScroll === 1 && <img src={icon_run_1} alt="run-1" />}
        {speedScroll === 2 && <img src={icon_run_2} alt="run-2" />}
        {speedScroll === 3 && <img src={icon_run_3} alt="run-3" />} */}
      </MyButton>
    </div>
  )
}

export default ButtonScroll