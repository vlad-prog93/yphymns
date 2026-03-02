import style from './SearchedHymns.module.css'

import Title from '@components/UI/Title/Title'
import HymnList from "@components/HymnList/HymnList"
import { useSelectHymns } from '@features/hymns/hooks/useSelectHymns'
import { useAppSelector } from '@redux/hooks'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Path_of_Routes } from '@utils/routes'
import { useMapCollections } from '@features/collections/hooks/useMapCollections'

const SearchedHymns = () => {
  const navigate = useNavigate()
  const hymns = useSelectHymns()
  const collections = useMapCollections()
  const { searchHymnsBy } = useAppSelector(s => s.hymn)

  useEffect(() => {
    if (!searchHymnsBy.number && !searchHymnsBy.text) navigate(Path_of_Routes.slash)
  }, [])

  return (
    <>
      <Title title='Найденные гимны' />
      <HymnList hymns={hymns} collections={collections} />
    </>
  )
}

export default SearchedHymns