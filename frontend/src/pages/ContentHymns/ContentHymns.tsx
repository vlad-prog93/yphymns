import Title from '@components/UI/Title/Title'
import style from './ContentHymns.module.css'

import HymnList from "@components/HymnList/HymnList"
import { useSelectHymns } from '@features/hymns/hooks/useSelectHymns'
import { useMemo, useState } from 'react'
import { useMapCollections } from '@features/collections/hooks/useMapCollections'

const ContentHymns = () => {
  const hymns = useSelectHymns()
  const collections = useMapCollections()
  const [selectSort, setSelectSort] = useState<string>('номер')

  const sortedHymns = useMemo(() => {
    return [...hymns].sort((a, b) => {
      if (selectSort === 'номер') return a.number - b.number
      if (selectSort === 'название') return a.title.localeCompare(b.title)
      if (selectSort === 'сборник') return a.collection.localeCompare(b.collection)
      return 0
    })
  }, [hymns, selectSort])


  return (
    <>
      <Title title='Содержание' />
      <label className={style.hymnList__selectWrapper}>
        <span className={style.hymnList__selectTitle}>Сортировать по:</span>
        <select
          value={selectSort}
          className={style.hymnList__select}
          name="selectSort"
          onChange={e => setSelectSort(e.target.value)}
        >
          <option value="номер">номер</option>
          <option value="название">название</option>
          <option value="сборник">сборник</option>
        </select>
      </label>


      <HymnList hymns={sortedHymns} collections={collections} />
    </>
  )
}

export default ContentHymns