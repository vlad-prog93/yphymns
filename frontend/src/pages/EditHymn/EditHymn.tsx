import { useNavigate, useParams } from 'react-router-dom'
import React, { FormEvent, useEffect, useState } from 'react'
// import { v4 } from 'uuid'

// styles
import style from './EditHymn.module.css'

// redux
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { toEditOneHymn } from '@redux/reducers/hymns/ActionCreatorHymns'
import { toGetOneHymn } from "@redux/reducers/hymns/ActionCreatorHymns"


import { IHymn } from '@features/hymns/model/hymns'
import { handleTranslate, changeViewTextHymn, moveAccordsInText, deleteAccords } from '@features/hymns/workWithTextHymns'
import FormHymn from '@features/hymns/FormHymn/FormHymn'
import { Path_of_Routes } from '@utils/routes'


const EditHymn = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { hymns } = useAppSelector(s => s.hymn)
  const { collections } = useAppSelector(s => s.collections)
  const dispatch = useAppDispatch()

  const hymn = id ? hymns.find(h => h._id === id) : undefined

  const editHymnFromStore = hymn && {
    ...hymn,
    text: changeViewTextHymn(hymn.text)
  }

  const [editHymn, setEditHymn] = useState<IHymn | undefined>(editHymnFromStore)

  useEffect(() => {
    if (!id || !hymn) {
      navigate(Path_of_Routes.slash)
      return
    }
  }, [id, navigate, hymn])

  const saveHymn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editHymn) {
      const hymn: IHymn = { ...editHymn, text: moveAccordsInText(editHymn.text) }
      dispatch(toEditOneHymn(hymn))
      navigate('/admin')
    }
  }

  return (
    <>
      <h4 className={style.editHymn__title}>
        Редактируемый гимн
      </h4>
      {editHymn && <FormHymn collections={collections} hymn={editHymn} setHymn={setEditHymn} saveHymn={saveHymn} />}

    </>
  )
}

export default EditHymn