import { useEffect } from "react"
import { useInView } from 'react-intersection-observer'

import ModalError from "@components/feedback/ModalError/ModalError"
import Arrows from "@components/navigation/Arrows/Arrows"
import ModalAccords from "@features/accords/ModalAccords/ModalAccords"
import ModalCollection from "@features/collections/ModalCollection/ModalCollection"
import ButtonScroll from "@features/scroll/ButtonScroll/ButtonScroll"

import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { collectionSlice } from "@redux/reducers/collections/CollectionSlice"
import { hymnsSlice } from "@redux/reducers/hymns/HymnSlice"
import { useMatch } from "react-router-dom"
import { Path_of_Routes } from "@utils/routes"
import Transposes from "@components/common/Transposes/Transposes"

const OverLays = () => {
    // для компонента автоскролла
    const [refView, inView] = useInView({ rootMargin: '0px 0px' })
    const match = useMatch(Path_of_Routes.hymn())

    const hymn = useAppSelector(s => s.hymn)
    const collections = useAppSelector(s => s.collections)
    const accords = useAppSelector(s => s.accords)

    const dispatch = useAppDispatch()

    const error = hymn.error || collections.error

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(hymnsSlice.actions.clearError())
                dispatch(collectionSlice.actions.clearError())
            }, 3000)
        }
    }, [error, dispatch])

    return (
        <>
            <Transposes />
            {error && <ModalError error={error} />}
            {accords.isModalActive && <ModalAccords />}
            {collections.isModalActive && <ModalCollection />}
            {!inView && match && <ButtonScroll />}
            {<div style={{ height: '1px' }} ref={refView} />}
            {<Arrows />}
        </>
    )
}

export default OverLays