import HymnList from "@components/HymnList/HymnList"
import { useSelectHymns } from "@features/hymns/hooks/useSelectHymns"
import { useLocation } from "react-router-dom"


const FavoriteHymns = () => {
  const location = useLocation()
  const hymns = useSelectHymns(location.pathname)
  return (
    <>
      <div>Избранные гимны</div>
      <HymnList hymns={hymns} />
    </>
  )
}

export default FavoriteHymns