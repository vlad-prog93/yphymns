import { createRef, FormEvent, useEffect, useId, useRef } from 'react'
import style from './FormHymn.module.css'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { IHymn } from '../../models/hymns'
import { balanceStr, handleTranslate } from '../../tools/workWithTextHymns'
import { hymnsSlice } from '../../redux/reducers/HymnSlice'
import { useAppDispatch } from '../../redux/hooks'
import { translate } from '../../utils/const'

interface IFormHymnProps {
    hymn: IHymn,
    setHymn: (obj: IHymn) => void,
    saveHymn: (e: FormEvent<HTMLFormElement>) => void,
}

const FormHymn = ({ hymn, setHymn, saveHymn }: IFormHymnProps) => {
    const idCol = useId()
    const idNum = useId()
    const idShortText = useId()
    const refs: any = useRef(Object.keys(hymn.text_with_accords).map(() => createRef()))
    const dispatch = useAppDispatch()
    // const handleDeleteFragment = (key: string) => {
    //     if (hymn) {++6
    //         const state = hymn?.text_with_accords
    //         delete state[key]
    //         hymn && setHymn({ ...hymn, text_with_accords: { ...state } })
    //     }
    // }

    const generateAccords = () => {

        if (hymn.text_with_accords) {
            let arrAccordsVerse: string[] = []
            let arrAccordsChorus: string[] = []
            let TEXT_WITH_ACCORDS: { [key: string]: string } = {} // объект с куплетами и припевами
            let text_with_accords: string //куплет или припев
            const countRowsOfVersusWithAccords = hymn.text_with_accords['1 verse']
                ?.split('\n').length || 0
            const countRowsOfChorusWithAccords = hymn.text_with_accords['1 chorus']
                ?.split('\n').length || 0

            if (countRowsOfVersusWithAccords % 2 !== 0) {
                dispatch(hymnsSlice.actions.setError('Ошибка! В 1 куплете. Не хватает строчки с аккордами или текстом'))
                return
            }

            if (countRowsOfChorusWithAccords % 2 !== 0) {
                dispatch(hymnsSlice.actions.setError('Ошибка! В 1 припеве. Не хватает строчки с аккордами или текстом'))
                return
            }

            // добавление аккордов с 1 куплета и 1 припева в массивы
            Object.keys(hymn.text_with_accords).forEach(key => {
                const array_with_text = hymn.text_with_accords[key].split('\n')

                if (key.endsWith(' verse') &&
                    (array_with_text.length !== countRowsOfVersusWithAccords &&
                        array_with_text.length !== (countRowsOfVersusWithAccords / 2))) {
                    TEXT_WITH_ACCORDS[key] = hymn.text_with_accords[key]
                    dispatch(hymnsSlice.actions.setError(`Ошибка! не хватает строчки или лишняя в: ${key}`))
                    return
                }

                if (key.endsWith(' chorus') &&
                    (array_with_text.length !== countRowsOfChorusWithAccords &&
                        array_with_text.length !== (countRowsOfChorusWithAccords / 2))) {
                    TEXT_WITH_ACCORDS[key] = hymn.text_with_accords[key]
                    dispatch(hymnsSlice.actions.setError(`Ошибка! не хватает строчки или лишняя в: ${key}`))
                    return
                }

                if (key === '1 verse') {
                    TEXT_WITH_ACCORDS[key] = hymn.text_with_accords[key]
                    array_with_text.forEach((el, ind) => ind % 2 === 0 && arrAccordsVerse.push(el))
                    return
                }
                if (key === '1 chorus') {
                    TEXT_WITH_ACCORDS[key] = hymn.text_with_accords[key]
                    array_with_text.forEach((el, ind) => ind % 2 === 0 && arrAccordsChorus.push(el))
                    return
                }
                if (key.endsWith(' verse')
                    && array_with_text.length !== countRowsOfVersusWithAccords) {
                    text_with_accords = array_with_text
                        .map((el, ind) => arrAccordsVerse[ind] + '\n' + el)
                        .join('\n')
                    TEXT_WITH_ACCORDS[key] = text_with_accords
                    return
                }
                if (key.endsWith(' chorus')
                    && hymn.text_with_accords[key].split('\n').length !== countRowsOfChorusWithAccords) {
                    text_with_accords = array_with_text
                        .map((el, ind) => arrAccordsChorus[ind] + '\n' + el)
                        .join('\n')
                    TEXT_WITH_ACCORDS[key] = text_with_accords
                    return
                }
                TEXT_WITH_ACCORDS[key] = hymn.text_with_accords[key]

            })

            Object.keys(TEXT_WITH_ACCORDS).length && setHymn({ ...hymn, text_with_accords: { ...TEXT_WITH_ACCORDS } })
        }



    }
    return (
        <form className={style.formHymn__form} onSubmit={(e) => saveHymn(e)}>
            <div className={style.formHymn__inputContainer}>
                <label htmlFor={idCol} className={style.formHymn__label}>Сборник</label>
                <Input
                    id={idCol}
                    type='text'
                    value={hymn?.collection}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHymn({ ...hymn, collection: e.target.value })}
                />
            </div>
            <div className={style.formHymn__inputContainer}>
                <label htmlFor={idNum} className={style.formHymn__label}>Номер</label>
                <Input
                    id={idNum}
                    type='text'
                    defaultValue={hymn?.number}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHymn({ ...hymn, number: Number(e.target.value) })}
                />
            </div>
            <div className={style.formHymn__inputContainer}>
                <label htmlFor={idNum} className={style.formHymn__label}>Название гимна</label>
                <Input
                    id={idShortText}
                    type='text'
                    defaultValue={hymn?.shortText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHymn({ ...hymn, shortText: e.target.value })}
                />
            </div>

            {Object.keys(hymn?.text_with_accords).map((key, index, arr) => {
                return (
                    <div key={key} className={style.formHymn__inputContainer}>
                        <Input
                            type='text'
                            defaultValue={handleTranslate(key)}
                            ref={refs[index]}
                        />
                        <textarea
                            name={key}
                            className={style.formHymn__textarea}
                            rows={{ ...hymn }.text_with_accords[key].split('\n').length}
                            value={hymn.text_with_accords[key]}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setHymn({ ...hymn, text_with_accords: { ...hymn.text_with_accords, [e.target.name]: e.target.value } })}
                        />
                        {/* <Button onClick={() => handleDeleteFragment(key)} children='Удалить' /> */}
                    </div >
                )
            })}
            <Button type='button' children='Генерировать аккорды' onClick={() => generateAccords()} />
            <Button type='submit' children='Сохранить' />

        </form>
    )
}

export default FormHymn