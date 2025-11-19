import { useContext, useEffect, useRef } from 'react'
import style from './Settings.module.css'
import { contextSettingsFont, stateSettingsFont } from '../../context/settingsSize'
import { setSettingFontLS } from '../../tools/storage'


const Settings = () => {
  const context = useContext(contextSettingsFont)

  const handleChangeFontSetting = (e: any) => {
    context.setSettingsFont({ ...context, [e.target.name]: e.target.value })
    setSettingFontLS({ ...context, [e.target.name]: e.target.value })
  }

  const setDefaultFontSetting = () => {
    context.setSettingsFont({ ...stateSettingsFont })
    setSettingFontLS({ ...stateSettingsFont })
  }

  return (
    <div className={style.setting}>
      <h3 className={style.setting__title}>Настройки</h3>
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

      <button onClick={setDefaultFontSetting}> По умолчанию</button>

    </div >
  )
}


export default Settings