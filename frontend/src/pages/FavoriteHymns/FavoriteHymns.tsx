import HymnList from "@components/HymnList/HymnList"
import Title from "@components/UI/Title/Title"
import { useMapCollections } from "@features/collections/hooks/useMapCollections"
import { useSelectHymns } from "@features/hymns/hooks/useSelectHymns"


const FavoriteHymns = () => {
  const hymns = useSelectHymns()
  const collections = useMapCollections()
  return (
    <>
      <Title title='Избранные гимны' />
      <HymnList hymns={hymns} collections={collections} />
    </>
  )
}

export default FavoriteHymns