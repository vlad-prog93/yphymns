// store
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { accordsSlice } from '../../redux/reducers/AccordsSlice'

// style
import style from './ModalAccords.module.css'

// const
import ACCORDS from '../../utils/accords'


const ModalAccords = () => {

    const { currentAccords } = useAppSelector(state => state.accordsReducer)
    const dispatch = useAppDispatch()

    const handleClickModal = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(accordsSlice.actions.deleteCurrentAccords())
        dispatch(accordsSlice.actions.toogleModalActive(false))
    }

    const parseAccords = (accords: string[] | null) => {
        if (!accords) return 'Не выбрали аккорд'
        return accords.map((accord, ind) => <img key={accord} className={style.ModalAccords__img} src={ACCORDS[accord]} />)
    }

    return (
        <div
            className={style.ModalAccords}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClickModal(e)}>
            <div
                className={style.ModalAccords__window}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
                <>{parseAccords(currentAccords)}</>
            </div>

        </div>
    )
}

export default ModalAccords