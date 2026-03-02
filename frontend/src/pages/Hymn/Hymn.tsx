// import { useMemo, useCallback } from 'react'
// import { useAppSelector } from '@redux/hooks'
// import { deleteAccords } from '@features/hymns/workWithTextHymns'
import { HymnText } from '@features/hymns/HymnText/HymnText'
// import { useArrowNavigation } from '@hooks/routing/useArrowNavigation'
import { useMapCollections } from '@features/collections/hooks/useMapCollections'
import style from './hymn.module.css'
import { useGetHymn } from "@features/hymns/hooks/useGetHymn"
import { useParseTextHymn } from "@features/hymns/hooks/useParseTextHymn"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { useEffect } from 'react'
import { setHistoryHymn } from '@redux/reducers/hymns/ActionCreatorHymns'

const Hymn = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const hymn = useGetHymn(id)
  const collection = useMapCollections()
  const parsedText = useParseTextHymn(hymn?.text || null)
  const { isShowAccords } = useAppSelector(s => s.accords)

  useEffect(() => {

    const timer = setTimeout(() => {
      if (hymn) {
        dispatch(setHistoryHymn(hymn._id))
      }
    }, 2000)

    return () => clearTimeout(timer)

  }, [hymn, dispatch])

  if (!hymn) return null
  if (!parsedText) return null

  return (
    <section className={style.hymn}>
      <h3 className={style.hymn__title}>Сборник</h3>
      <h3 className={style.hymn__title}>
        {collection.get(hymn.collection)}
      </h3>
      {<HymnText text={parsedText} showAccords={isShowAccords} />}
    </section>
  )
}

export default Hymn