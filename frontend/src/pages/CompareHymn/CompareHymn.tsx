import Button from '@components/UI/Button/Button'
import style from './CompareHymn.module.css'
import Title from "@components/UI/Title/Title"
import { useMapCollections } from "@features/collections/hooks/useMapCollections"
import { HymnText } from "@features/hymns/HymnText/HymnText"
import { IHymn } from "@features/hymns/model/hymns"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { toApproveEdit, toRejectEdit } from "@redux/reducers/editEntity/ActionCreatorEditEntity"
import { IHymnEdit } from "@redux/reducers/editEntity/EditEntitySlice"
import { useParams } from "react-router-dom"
import { useMapUsers } from '@features/users/hooks/useMapUsers'

const CompareHymn = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const editHymns = useAppSelector(s => s.editHymns.edits)
  const hymns = useAppSelector(s => s.hymn.hymns)

  const currentEdit: IHymnEdit | undefined = editHymns.find((hymn: { data: { _id: string | undefined } }) => hymn.data._id === id)
  const currentHymn: IHymn | undefined = hymns.find(hymn => hymn._id === id)
  const collections = useMapCollections()
  const users = useMapUsers()


  if (!currentEdit || !currentHymn || !id) return <p>Загрузка...</p>

  return (
    <div className={style.compareHymn}>

      <section className={style.section}>
        <h2>Оригинал</h2>
        <Title>{collections.get(currentHymn.collection)}</Title>
        <p>Номер гимна: {currentHymn.number}</p>
        <p>Называние гимна: {currentHymn.title}</p>
        <HymnText text={currentHymn.text} showAccords={true} isRepeatAccords={true} />
      </section>

      <section className={style.section}>
        <h2>Предложение: {users.get(currentEdit.proposedBy)}</h2>
        <Title>{collections.get(currentEdit.data.collection)}</Title>
        <p>Номер гимна: {currentEdit.data.number}</p>
        <p>Называние гимна: {currentEdit.data.title}</p>
        <HymnText text={currentEdit.data.text} showAccords={true} isRepeatAccords={true} />
      </section>

      <div className={style.compareHymn__footer}>
        <Button variant='control' onClick={() => dispatch(toApproveEdit(currentEdit._id))}>
          ✅ Принять
        </Button>

        <Button variant='control' onClick={() => dispatch(toRejectEdit(currentEdit._id))}>
          ❌ Отклонить
        </Button>
      </div>
    </div>
  )
}

export default CompareHymn