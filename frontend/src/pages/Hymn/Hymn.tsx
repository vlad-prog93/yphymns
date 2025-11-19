import { useContext, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// стили
import style from './hymn.module.css'

// redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { hymnsSlice } from '../../redux/reducers/HymnSlice'

// utils
import { contextSettingsFont } from '../../context/settingsSize'
import { toFetchHymn } from '../../redux/reducers/ActionCreator'
import { accordsSlice } from '../../redux/reducers/AccordsSlice'


const Hymn = () => {
  const params = useParams<{ id: string }>()
  const { currentHymn, isTextWithAccord } = useAppSelector(state => state.hymnReducer)
  const { currentAccords } = useAppSelector(state => state.accordsReducer)
  const dispatch = useAppDispatch()
  const context = useContext(contextSettingsFont)

  const navigate = useNavigate()
  const refScroll = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchHymn = async () => {
      try {
        params?.id && !currentHymn && await toFetchHymn(dispatch, params.id)
      } catch (e) {
        navigate('/')
      }
    }
    fetchHymn()
  }, [currentHymn, navigate, dispatch, params])

  useEffect(() => {
    const event = function (e: any) {
      if (e.key === 'ArrowRight') {
        dispatch(hymnsSlice.actions.nextHymn())
        dispatch(hymnsSlice.actions.offScroll())
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      if (e.key === 'ArrowLeft') {
        dispatch(hymnsSlice.actions.prevHymn())
        dispatch(hymnsSlice.actions.offScroll())
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }
    document.addEventListener('keyup', event)
    return () => document.removeEventListener('keyup', event)
  }, [navigate, dispatch])


  useEffect(() => {
    const isNeedToScroll = refScroll?.current && window.innerHeight - 50 <= refScroll?.current?.offsetHeight
    if (isNeedToScroll) {
      dispatch(hymnsSlice.actions.showAutoScroll())
    } else {
      dispatch(hymnsSlice.actions.hideAutoScroll())
    }
    return (() => {
      dispatch(hymnsSlice.actions.hideAutoScroll())
    })
  }, [isTextWithAccord, currentHymn, dispatch])

  const setCurrentAccords = (value: string) => {
    const accords = value.split('-')
    dispatch(accordsSlice.actions.toogleModalActive(true))
    dispatch(accordsSlice.actions.setCurrentAccords(accords))
  }

  const parseHymnText = (text: string) => {
    return text.split(/\[(.+?)\]/g).map((t_1, i) => {
      if (i % 2 === 0) return t_1
      return <span
        // key={t_1}
        className={style.hymn__word_with_accord}
      >
        {t_1.split(/\{(.+?)\}/g).map((t_2, i) => {
          if (i % 2 === 0) return t_2
          return <button
            key={t_2}
            style={{
              fontSize: context.fontSizeAccord + 'px',
              color: context.colorAccord,
              transform: `translate(calc(-0.6 * ${context.fontSizeAccord}px - 0.4px), calc(-0.6 * ${context.fontSizeAccord}px + 0.1px))`
            }}
            className={style.hymn__accord}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => setCurrentAccords(t_2)}
            value={t_2}
          >
            {t_2}
          </button>
        })}
      </span>
    })
  }

  return (
    <div ref={refScroll} className={style.hymn}>
      <h3
        style={{ fontSize: (1.2 * Number(context.fontSizeText)).toString() + 'px' }}
        className={style.hymn__title}
      >
        Сборник:
      </h3>
      <h3
        style={{ fontSize: (1.2 * Number(context.fontSizeText)).toString() + 'px' }}
        className={style.hymn__title}
      >
        {currentHymn?.collection}
      </h3>
      {!isTextWithAccord
        ?
        <p className={style.hymn__text_container}>
          {currentHymn && Object.keys(currentHymn.text).map((key) => {
            const spacesBeforeText = key.endsWith(' verse') ? '0px' : '10px' // это чтобы в тексте различать куплет от припева или перехода
            return (
              <>
                <pre
                  style={{ fontSize: context.fontSizeText + 'px', margin: 0 }}
                  className={style.hymn__text}
                >
                  {key.endsWith(' verse') ? key.replace(/ verse/g, '.') : ''}
                </pre>
                <pre
                  className={style.hymn__text}
                  style={{ fontSize: context.fontSizeText + 'px', color: context.colorText, paddingLeft: spacesBeforeText }}
                >
                  {currentHymn.text[key]}
                </pre>
              </>)
          })}
        </p>
        :
        <p className={style.hymn__text_container}>
          {currentHymn && Object.keys(currentHymn.text_with_accords).map((key) => {
            const spacesBeforeText = key.endsWith(' verse') ? '0px' : '13px' // это чтобы в тексте различать куплет от припева или перехода
            return (
              <>
                <pre
                  style={{ fontSize: context.fontSizeText + 'px', margin: 0, lineHeight: `calc(${context.fontSizeText}px * 2)` }}
                  className={style.hymn__text_with_accords}
                >
                  {key.endsWith(' verse') ? key.replace(/ verse/g, '.') : ''}
                </pre>
                <pre
                  className={style.hymn__text_with_accords}
                  style={{ fontSize: context.fontSizeText + 'px', color: context.colorText, paddingLeft: spacesBeforeText, lineHeight: `calc(${context.fontSizeText}px * 2)` }}
                >
                  {parseHymnText(currentHymn.text_with_accords[key])}
                </pre>
              </>
            )
          })}
        </p>
      }
    </div >
  )
}

export default Hymn