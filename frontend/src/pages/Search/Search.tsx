import { useEffect } from 'react'

// стили
import style from './Search.module.css'

// components
import Button from '@components/UI/Button/Button'
import Input from '@components/UI/Input/Input'

// const
import { useSearchHymns } from '@features/hymns/hooks/useSearchHymns'



const Search = () => {
  const { search, searchHymnsBy, setSearchHymnsBy, clear } = useSearchHymns()

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchHymnsBy({
      ...searchHymnsBy,
      [e.target.type]: e.target.value
    })
  }

  useEffect(() => { clear() }, [])



  return (
    <div className={style.search}>
      <form className={style.search__form} onSubmit={(e) => {
        e.preventDefault()
        search()
      }}>
        <Input
          value={searchHymnsBy.number ?? ''}
          onChange={changeInput}
          type="number"
          placeholder='Поиск по номеру'
        />
        <Input
          value={searchHymnsBy.text ?? ''}
          onChange={changeInput}
          type="text"
          placeholder='Поиск по строке' />
        <Button
          disabled={!searchHymnsBy.number && !searchHymnsBy.text}
          children='Поиск' />
      </form>
    </div>
  )
}

export default Search