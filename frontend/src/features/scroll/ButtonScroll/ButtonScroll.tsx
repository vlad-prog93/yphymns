import { useCallback, useEffect, useRef } from 'react'
import style from './ButtonScroll.module.css'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { SPEED_CONFIG } from '@utils/const'
import MyButton from '@components/UI/Button/Button'

import icon_stop from '@assets/icons/arrows/stop.png'
import icon_run_0 from '@assets/icons/arrows/arrow-down.png'
import { scrollSlice } from '@redux/reducers/scroll/ScrollSlice'
import { useLocation } from 'react-router-dom'
// автоскролл работает по такому принципу:
// 1 - если нажать кнопку "скроллить"

// автоскролл останавливается по такому принципу:
// 1 - если нажать кнопку "STOP"
// 2 - если нажать на бургер для открытия меню
// 3 - если полоса прокрутки дошла до конца (флагом являемтся тэг внизу гимна)
// 4 - если нажать кнопку перелистывания гимнов
// 5 - если нажать клавишу перелистывания гимнов


const ButtonScroll = () => {
  // пригодится при скролле мы делаем через таймер. через id его потом останавливать и удалять
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const location = useLocation()
  const { isScroll, speedScroll } = useAppSelector(s => s.scroll)
  const { isMenuActive } = useAppSelector(s => s.menu)

  const dispatch = useAppDispatch()

  const scroll = useCallback(() => {
    window.scrollBy(0, 1)
  }, [])

  const clearCurrentInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const stopScroll = () => {
    clearCurrentInterval()
    dispatch(scrollSlice.actions.offScroll())
    dispatch(scrollSlice.actions.setSpeedScroll(0))
  }

  const runScroll = () => {
    const nextSpeed = speedScroll >= SPEED_CONFIG.length ? 1 : speedScroll + 1

    clearCurrentInterval()
    if (!isScroll) {
      dispatch(scrollSlice.actions.onScroll())
    }

    dispatch(scrollSlice.actions.setSpeedScroll(nextSpeed))
    intervalRef.current = setInterval(
      scroll,
      SPEED_CONFIG[nextSpeed]
    )
  }

  useEffect(() => stopScroll, [location.pathname])

  useEffect(() => {
    if (isMenuActive) {
      stopScroll()
    }
  }, [isMenuActive])

  return (
    <div className={style.scrollContainer}>
      <MyButton variant='control' onClick={stopScroll}>
        <img src={icon_stop} alt="stop" />
      </MyButton>
      <span className={style.speedScroll}>{speedScroll}</span>
      <MyButton variant='control' onClick={runScroll}>
        <img src={icon_run_0} alt="run" />
      </MyButton>
    </div>
  )
}

export default ButtonScroll