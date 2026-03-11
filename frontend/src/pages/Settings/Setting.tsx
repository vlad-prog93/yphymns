import { useContext } from 'react'
import style from './Settings.module.css'
import { contextSettingsFont, stateSettingsFont } from '@context/settingsSize'
import { LSSettingsFont } from '@tools/storage'
import Title from '@components/UI/Title/Title'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { accordsSlice } from '@redux/reducers/accords/AccordsSlice'
import Button from '@components/UI/Button/Button'


const Settings = () => {
  const { isRepeatAccords } = useAppSelector(s => s.accords)
  const dispatch = useAppDispatch()

  const context = useContext(contextSettingsFont)

  const handleChangeFontSetting = (e: any) => {
    context.setSettingsFont({ ...context, [e.target.name]: e.target.value })
    LSSettingsFont.set({ ...context, [e.target.name]: e.target.value })
  }

  const setDefaultFontSetting = () => {
    context.setSettingsFont({ ...stateSettingsFont })
    LSSettingsFont.set({ ...stateSettingsFont })
  }
  console.log(isRepeatAccords)
  return (
    <>
      <Title>Настройки</Title>
      <div className={style.setting__fontContent}>
        <span
          className={style.setting__text}
          style={{ fontSize: context.fontSizeText + 'px' }}>
          Размер шрифта текста: {context.fontSizeText}
        </span>
        <input
          className={style.setting__range}
          name='fontSizeText'
          value={context.fontSizeText}
          onChange={(e) => handleChangeFontSetting(e)}
          type="range"
          min="14"
          max="24" />
      </div>

      <div className={style.setting__fontContent}>
        <span
          className={style.setting__text}
          style={{ color: context.colorText }}>
          Цвет текста
        </span>
        <input
          className={style.setting__color}
          value={context.colorText}
          name='colorText'
          onChange={(e) => handleChangeFontSetting(e)}
          type="color" />
      </div>

      <div className={style.setting__fontContent}>
        <span
          className={style.setting__text}
          style={{ fontSize: context.fontSizeAccord + 'px' }}>
          Размер шрифта аккордов: {context.fontSizeAccord}
        </span>
        <input
          className={style.setting__range}
          name='fontSizeAccord'
          value={context.fontSizeAccord}
          onChange={(e) => handleChangeFontSetting(e)}
          type="range"
          min="14"
          max="24" />
      </div>

      <div className={style.setting__fontContent}>
        <span
          className={style.setting__text}
          style={{ color: context.colorAccord }}>
          Цвет текста

        </span>
        <input
          className={style.setting__color}
          value={context.colorAccord}
          name='colorAccord'
          onChange={(e) => handleChangeFontSetting(e)}
          type="color" />
      </div>
      <label className={style.setting__text} htmlFor="repeat_accords">
        Повторять аккорды:
        <input id='repeat_accords' type="checkbox" onChange={() => dispatch(accordsSlice.actions.toggleRepeatAccord())} checked={isRepeatAccords} />
      </label>

      <Button onClick={setDefaultFontSetting}> По умолчанию</Button>

    </>
  )

}


export default Settings