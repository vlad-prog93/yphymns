import HymnList from "@components/HymnList/HymnList"
import { useSelectHymns } from "@features/hymns/hooks/useSelectHymns"
import { useLocation } from "react-router-dom"


const HistoryHymns = () => {
  const location = useLocation()
  const hymns = useSelectHymns(location.pathname)
  return (
    <>
      <div>История</div>
      <HymnList hymns={hymns} />
    </>
  )
}

export default HistoryHymns