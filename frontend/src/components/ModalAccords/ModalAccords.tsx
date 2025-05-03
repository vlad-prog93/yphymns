import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { accordsSlice } from '../../redux/reducers/AccordsSlice'
import style from './ModalAccords.module.css'
import G from '../../assets/icons/accords/G.png'

const ModalAccords = () => {
    const ACCORDS = {
        G: G
    }
    const { currentAccords } = useAppSelector(state => state.accordsReducer)
    const dispatch = useAppDispatch()

    const handleClickModal = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(accordsSlice.actions.deleteCurrentAccords())
        dispatch(accordsSlice.actions.toogleModalActive(false))
    }

    const parseAccords = (accords: string[] | null) => {
        if (!accords) return 'Не выбрали аккорд'
        if (accords.length === 1 && accords[0] === 'G') return <img className={style.ModalAccords__img} src={ACCORDS[accords[0]]} />
        return accords[1]
    }

    return (
        <div
            className={style.ModalAccords}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClickModal(e)}>
            <div
                className={style.ModalAccords__window}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
                <h1>{parseAccords(currentAccords)}</h1>
            </div>

        </div>
    )
}

export default ModalAccords