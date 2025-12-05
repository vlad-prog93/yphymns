// import { useMemo, useCallback } from 'react'
// import { useAppSelector } from '@redux/hooks'
// import { deleteAccords } from '@features/hymns/workWithTextHymns'
// import { HymnText } from '@features/hymns/HymnText/HymnText'
// import { useArrowNavigation } from '@hooks/routing/useArrowNavigation'

const Hymn = () => {
  // const { currentHymn, isTextWithAccord } = useAppSelector(state => state.hymnReducer)

  // const preparedText = useMemo(() => {
  //   if (!currentHymn) return null

  //   return isTextWithAccord
  //     ? currentHymn.text
  //     : deleteAccords(currentHymn.text)
  // }, [currentHymn, isTextWithAccord])

  // const goNext = useCallback(() => {
  //   return
  // }, [])

  // const goPrev = useCallback(() => {
  //   return
  // }, [])

  // useArrowNavigation(goPrev, goNext)

  // if (!currentHymn || !preparedText) return null

  // return (
  //   <div>
  //     <h1>
  //       {currentHymn.number}. {currentHymn.title}
  //     </h1>

  //     <HymnText
  //       text={preparedText}
  //       showAccords={isTextWithAccord}
  //     />
  //   </div>
  // )
  return (
    <>sdfdsf</>
  )
}

export default Hymn