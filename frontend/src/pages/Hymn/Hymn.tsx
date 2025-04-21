import { useContext, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// стили
import style from './hymn.module.css'

// redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { hymnsSlice } from '../../redux/reducers/HymnSlice'

// utils
import { v4 } from 'uuid'
import { contextSettingsFont } from '../../context/settingsSize'
import { toFetchHymn } from '../../redux/reducers/ActionCreator'


const Hymn = () => {
  const params = useParams<{ id: string }>()
  const { currentHymn, isTextWithAccord } = useAppSelector(state => state.hymnReducer)
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
  }, [currentHymn, navigate])

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
  }, [isTextWithAccord, currentHymn])

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
                  style={{ fontSize: context.fontSizeText + 'px', margin: 0 }}
                  className={style.hymn__text_with_accords}
                >
                  {key.endsWith(' verse') ? key.replace(/ verse/g, '.') : ''}
                </pre>
                <pre
                  className={style.hymn__text_with_accords}
                  style={{ fontSize: context.fontSizeText + 'px', color: context.colorText, paddingLeft: spacesBeforeText }}
                  dangerouslySetInnerHTML={{
                    __html: currentHymn.text_with_accords[key]
                      .replace(/\[(.+?)\]/g, (v): any => {
                        return `<span 
                        class=${style.hymn__word_with_accord}>${v.slice(1, v.length - 1)
                            .replace(/\{(.+?)\}/g, (w): any => {
                              return `<button 
                              style="font-size: ${context.fontSizeAccord + 'px'}; 
                                   color: ${context.colorAccord}; 
                                   transform: translate(calc(-0.6 * ${context.fontSizeAccord}px - 0.4px), calc(-1.75 * ${context.fontSizeAccord}px + 29.5px))" 
                              class=${style.hymn__accord}>${w.slice(1, w.length - 1)}</button>`
                            })}</span >`
                      })
                  }} />
              </>
            )
          })}
        </p>
      }
    </div >
  )
}

export default Hymn