// стили
import Button from '@components/UI/Button/Button'
import style from './Transposes.module.css'

// redux
import { useAppDispatch, useAppSelector } from '@redux/hooks'

// components
import { accordsSlice } from '@redux/reducers/accords/AccordsSlice'


const Transposes = () => {
  const dispatch = useAppDispatch()
  const { isModalTransposeActive, isShowAccords } = useAppSelector(s => s.accords)

  const isOpen = (isShowAccords && isModalTransposeActive)

  return (
    <div className={isOpen ? `${style.transpose} ${style.transpose_active}` : style.transpose}>
      <Button onClick={() => dispatch(accordsSlice.actions.transposeUp())}>+</Button>
      <Button onClick={() => dispatch(accordsSlice.actions.transposeDown())}>-</Button>
    </div>
  )
}

export default Transposes