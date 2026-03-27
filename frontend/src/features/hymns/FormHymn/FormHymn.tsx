import React, { createRef, FormEvent, useId, useRef, useState } from 'react'
import style from './FormHymn.module.css'
import Input from '@components/UI/Input/Input'
import Button from '@components/UI/Button/Button'
import { IHymn, IHymnText } from '@features/hymns/model/hymns'
import { handleTranslate } from '../workWithTextHymns'
import { hymnsSlice } from '@redux/reducers/hymns/HymnSlice'
import { useAppDispatch } from '@redux/hooks'
import { ICollection } from '@features/collections/model/collection'

interface IFormHymnProps {
    hymn: Omit<IHymn, '_id'>,
    collections: ICollection[],
    setHymn: (obj: Omit<IHymn, '_id'> | IHymn | undefined) => void,
    saveHymn: (e: React.FormEvent<HTMLFormElement>) => void,
}

const FormHymn = ({ hymn, setHymn, saveHymn, collections }: IFormHymnProps) => {
    const ids = { col: useId(), num: useId(), title: useId() }
    const refs: any = useRef(Object.keys(hymn.text).map(() => createRef()))
    const [selectedCol, setSelectedCol] = useState(collections[0]._id)

    const dispatch = useAppDispatch()

    const generateAccords = (text: IHymnText) => {

        if (text) {
            const arrAccordsVerse: string[] = []
            const arrAccordsChorus: string[] = []
            const TEXT_WITH_ACCORDS: { [key: string]: string } = {} // объект с куплетами и припевами
            let text_with_accords: string //куплет или припев
            const countRowsOfVersusWithAccords = hymn.text['1 verse']
                ?.split('\n').length || 0
            const countRowsOfChorusWithAccords = hymn.text['1 chorus']
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
            Object.keys(hymn.text).forEach(key => {
                const array_with_text = hymn.text[key].split('\n')

                if (key.endsWith(' verse') &&
                    (array_with_text.length !== countRowsOfVersusWithAccords &&
                        array_with_text.length !== (countRowsOfVersusWithAccords / 2))) {
                    TEXT_WITH_ACCORDS[key] = hymn.text[key]
                    dispatch(hymnsSlice.actions.setError(`Ошибка! не хватает строчки или лишняя в: ${key}`))
                    return
                }

                if (key.endsWith(' chorus') &&
                    (array_with_text.length !== countRowsOfChorusWithAccords &&
                        array_with_text.length !== (countRowsOfChorusWithAccords / 2))) {
                    TEXT_WITH_ACCORDS[key] = hymn.text[key]
                    dispatch(hymnsSlice.actions.setError(`Ошибка! не хватает строчки или лишняя в: ${key}`))
                    return
                }

                if (key === '1 verse') {
                    TEXT_WITH_ACCORDS[key] = hymn.text[key]
                    array_with_text.forEach((el, ind) => ind % 2 === 0 && arrAccordsVerse.push(el))
                    return
                }
                if (key === '1 chorus') {
                    TEXT_WITH_ACCORDS[key] = hymn.text[key]
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
                    && hymn.text[key].split('\n').length !== countRowsOfChorusWithAccords) {
                    text_with_accords = array_with_text
                        .map((el, ind) => arrAccordsChorus[ind] + '\n' + el)
                        .join('\n')
                    TEXT_WITH_ACCORDS[key] = text_with_accords
                    return
                }
                TEXT_WITH_ACCORDS[key] = hymn.text[key]

            })

            return TEXT_WITH_ACCORDS
        }



    }

    const save = (e: React.FormEvent<HTMLFormElement>) => {
        setHymn({ ...hymn, collection: selectedCol })
        saveHymn(e)
    }

    const handleChangeCol = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCol(e.target.value)
        setHymn({ ...hymn, collection: e.target.value })
    }

    if (collections.length === 0) return <>Создайте сперва хотя бы один сборник</>
    return (
        <form className={style.formHymn__form} onSubmit={(e) => save(e)}>
            <div className={style.formHymn__inputContainer}>
                <label htmlFor={ids.title} className={style.formHymn__label}>Сборник</label>
                <select
                    name="Сборник"
                    defaultValue={selectedCol}
                    id={ids.title}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeCol(e)}
                >
                    {collections.map(col => {
                        return <option value={col._id}>{col.name}</option>

                    })}
                </select>
            </div>
            <div className={style.formHymn__inputContainer}>
                <label htmlFor={ids.num} className={style.formHymn__label}>Номер</label>
                <Input
                    id={ids.num}
                    type='text'
                    defaultValue={hymn?.number}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHymn({ ...hymn, number: Number(e.target.value) })}
                />
            </div>
            <div className={style.formHymn__inputContainer}>
                <label htmlFor={ids.title} className={style.formHymn__label}>Название гимна</label>
                <Input
                    id={ids.title}
                    type='text'
                    defaultValue={hymn?.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHymn({ ...hymn, title: e.target.value })}
                />
            </div>

            {Object.keys(hymn?.text).map((key, index) => {
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
                            rows={{ ...hymn }.text[key].split('\n').length}
                            value={hymn.text[key]}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setHymn({ ...hymn, text: { ...hymn.text, [e.target.name]: e.target.value } })}
                        />
                    </div >
                )
            })}
            <Button type='button' children='Генерировать аккорды' onClick={() => setHymn({ ...hymn, text: generateAccords(hymn.text) })} />
            <Button type='submit' children='Сохранить' />

        </form>
    )
}

export default FormHymn