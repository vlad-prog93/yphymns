import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// стили
import style from './search.module.css'

// redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { hymnsSlice } from '../../redux/reducers/HymnSlice'

// utils
import { ROUTES } from '../../utils/routes'

// components
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'


const Search = () => {
  const { searchHymnsBy } = useAppSelector(state => state.hymnReducer)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const inputNumberRef = useRef<HTMLInputElement>(null);


  const toSearch = (e: React.FormEvent): void => {
    e.preventDefault()
    navigate(ROUTES.foundedHymns)
  }

  useEffect(() => {
    dispatch(hymnsSlice.actions.deleteCurrentHymn())
    inputNumberRef?.current?.focus()
  }, [dispatch])

  return (
    <div className={style.search}>
      <form className={style.search__form} onSubmit={toSearch}>
        <Input
          value={searchHymnsBy.number}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(hymnsSlice.actions.setSearchHymnsBy({ ...searchHymnsBy, number: Number(e.target.value) }))}
          type="number"
          placeholder='Поиск по номеру'
          ref={inputNumberRef}
        />
        <Input
          value={searchHymnsBy.text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(hymnsSlice.actions.setSearchHymnsBy({ ...searchHymnsBy, text: e.target.value }))}
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