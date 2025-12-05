import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { hymnsSlice } from '@redux/reducers/hymns/HymnSlice'
import { filterHymns } from '@features/hymns/filterHymns'
import { Path_of_Routes } from '@utils/routes'
import { ISearchForm } from '@models/hymns'

export const useSearchHymns = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { hymns, searchHymnsBy } = useAppSelector(state => state.hymn)

  const search = useCallback(() => {
    const result = filterHymns(hymns, searchHymnsBy)


    if (result.length === 0) {
      dispatch(hymnsSlice.actions.clearSearchHymnsBy())
      dispatch(hymnsSlice.actions.setError('Гимн не найден'))
      setTimeout(() => dispatch(hymnsSlice.actions.clearError()), 5000)
      navigate(Path_of_Routes.slash)
      return
    }

    if (result.length === 1) {
      dispatch(hymnsSlice.actions.clearSearchHymnsBy())
      navigate(Path_of_Routes.hymn(result[0]._id))
      return
    }

    navigate(Path_of_Routes.searhedHymns)
  }, [hymns, searchHymnsBy, dispatch, navigate])

  return {
    search,
    searchHymnsBy,
    setSearchHymnsBy: (v: ISearchForm) =>
      dispatch(hymnsSlice.actions.setSearchHymnsBy(v)),
    clear: () => dispatch(hymnsSlice.actions.clearSearchHymnsBy())
  }
}