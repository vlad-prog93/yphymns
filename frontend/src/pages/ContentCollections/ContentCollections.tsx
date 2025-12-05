import style from './ContentCollections.module.css'
import { useSelectHymns } from '@features/hymns/hooks/useSelectHymns'

import HymnList from "@components/HymnList/HymnList"
import { useLocation } from 'react-router-dom'

const ContentCollections = () => {
  const location = useLocation()
  const hymns = useSelectHymns(location.pathname)

  return (
    <>
      <div>Сборники</div>
      <HymnList hymns={hymns} />
    </>
  )
}

export default ContentCollections