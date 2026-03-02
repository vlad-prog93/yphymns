// стили
import style from './Transposes.module.css'

// redux
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { hymnsSlice } from '@redux/reducers/hymns/HymnSlice'


// components
import Button from '@components/UI/Button/Button'
import { accordsSlice } from '@redux/reducers/accords/AccordsSlice'


const Transposes = () => {
  const dispatch = useAppDispatch()


  // const transposeAccords = (option: Transpose) => {
  //   const accords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',]
  //   const objText = { ...currentHymn?.text }
  //   if (objText) {
  //     for (let el in objText) {
  //       objText[el] = objText[el].replace(/[CDEFGAB]#?/g, (match: string) => {
  //         if (option === Transpose.UP) {
  //           const i = accords.indexOf(match) + 1
  //           return accords[i > accords.length - 1 ? 0 : i]
  //         }
  //         const i = accords.indexOf(match) - 1
  //         return accords[i < 0 ? i + accords.length : i]
  //       })
  //     }
  //   }

  //   dispatch(hymnsSlice.actions.transposeAccords(objText))
  // }
  return (
    <div className={style.transpose}>
      <Button style={{ color: '#FFF', width: '30px' }} onClick={() => dispatch(accordsSlice.actions.transposeUp())}>+</Button>
      <Button style={{ color: '#FFF', width: '30px' }} onClick={() => dispatch(accordsSlice.actions.transposeDown())}>-</Button>
    </div>
  )
}

export default Transposes