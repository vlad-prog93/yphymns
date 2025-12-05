// //импорт из пакетов
// import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { useCallback, useEffect, useMemo } from 'react'

// //импорт стилей
// import style from './Admin.module.css'

// //импорт store
// import { useAppSelector } from '../../redux/hooks'
// import { useDispatch } from 'react-redux'
// import { toDeleteHymn, toDownloadFileWithHymns, toFetchHymns, toUploadFile } from '@redux/reducers/ActionCreatorHymns'
// import { hymnsSlice } from '@redux/reducers/HymnSlice'
// import { CollectionSlice } from '@redux/reducers/CollectionSlice'

// //импорт констант
// import { ROUTES } from '../../utils/routes'
// import { ICollection } from '../../models/collection'

// const Admin = () => {
//   //работа с пакетами
//   const navigate = useNavigate()

//   //работа со store
//   const { hymns } = useAppSelector(state => state.hymn)
//   const { collections } = useAppSelector(state => state.collections)
//   const dispatch = useDispatch()


//   //управление кнопками
//   const handleDelete = useCallback((id: string) => {
//     toDeleteHymn(dispatch, id)
//   }, [dispatch])

//   const handleEdit = useCallback((id: string) => {
//     navigate(`hymns/${id}`)
//   }, [navigate])

//   const uploadFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault()
//     e.target.files && toUploadFile(e.target.files[0])
//   }, [])

//   const handleCreateCollection = useCallback(() => {
//     dispatch(CollectionSlice.actions.showModal())
//   }, [dispatch])

//   const handleEditCollection = useCallback((collection: ICollection) => {
//     dispatch(CollectionSlice.actions.setCurrentCollection(collection))
//     dispatch(CollectionSlice.actions.showModal())
//   }, [dispatch])

//   const hymnsMap = useMemo(() => {
//     return new Map(hymns.map(hymn => [hymn._id, hymn]))
//   }, [hymns])

//   //работа с побочными эффектами
//   useEffect(() => {
//     window.scrollTo({ top: 1 })
//     dispatch(hymnsSlice.actions.deleteCurrentHymn())
//     toFetchHymns(dispatch)
//   }, [dispatch])


//   return (
//     <section className={style.admin}>


//       {/* шапка страницы */}
//       <h3 className={style.admin__title}>Выберите действие</h3>
//       <div className={style.admin__buttonContainer}>
//         <Link className={style.admin__link} to={ROUTES.admin + ROUTES.hymns + ROUTES.newHymn} children='Создать гимн' />
//         <button className={style.admin__link} onClick={handleCreateCollection} children='Создать сборник' />
//         <button className={style.admin__link} onClick={toDownloadFileWithHymns} children='Скачать файл из БД' />
//         <form>
//           <label className={style.input__file}>
//             <input type="file" name="file" onChange={uploadFile} />
//             <span>Загрузить файл в БД</span>
//           </label>
//         </form>
//       </div>

//       {/* основная информация */}
//       <h3 className={style.admin__title}>Сборники</h3>
//       <ul className={style.admin__list}>
//         {collections.map(col => {
//           return (
//             <li className={style.admin__item} key={col._id}>
//               <details className={style.admin__details} >
//                 <summary className={style.admin__summary}>
//                   <div className={style.admin__summaryContent}>
//                     {col.name}
//                   </div>

//                 </summary>
//                 <div className={style.admin__buttons}>
//                   <button className={style.admin__button} onClick={() => handleEditCollection(col)}>Редактировать</button>
//                   <button className={style.admin__button} onClick={() => console.log('remove:', col._id)}>Удалить</button>
//                 </div>
//                 <ul className={style.admin__list}>
//                   {col.hymns.map(id => {
//                     const hymn = hymnsMap.get(id)
//                     if (!hymn) return null
//                     return <li className={style.admin__item} key={hymn._id}>
//                       <span className={style.admin__number}>{hymn.number} - </span>
//                       <span className={style.admin__text}>{hymn.shortText}</span>
//                       <button className={style.admin__button} onClick={() => hymn._id && handleEdit(hymn._id)}>Редактировать</button>
//                       <button className={style.admin__button} onClick={() => hymn._id && handleDelete(hymn._id)}>Удалить</button>
//                     </li>
//                   })}
//                 </ul>
//               </details>
//             </li>
//           )
//         })}
//       </ul>
//     </section>
//   )
// }

// export default Admin

const Admin = () => {
  return <>sdfasdlfkj</>
}

export default Admin