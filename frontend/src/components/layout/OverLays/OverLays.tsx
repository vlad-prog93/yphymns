import { useEffect } from "react"
import { useInView } from 'react-intersection-observer'

import ModalError from "@components/feedback/ModalError/ModalError"
import ModalLoading from "@components/feedback/ModalLoading/ModalLoading"
import Arrows from "@components/navigation/Arrows/Arrows"
import ModalAccords from "@features/accords/ModalAccords/ModalAccords"
import ModalCollection from "@features/collections/ModalCollection/ModalCollection"
import ButtonScroll from "@features/scroll/ButtonScroll/ButtonScroll"

import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { collectionSlice } from "@redux/reducers/collections/CollectionSlice"
import { hymnsSlice } from "@redux/reducers/hymns/HymnSlice"

const OverLays = () => {
    // для компонента автоскролла
    const [refView, inView] = useInView({ rootMargin: '0px 0px' })

    const hymn = useAppSelector(s => s.hymn)
    const collections = useAppSelector(s => s.collections)
    const accords = useAppSelector(s => s.accords)

    const dispatch = useAppDispatch()

    const error = hymn.error || collections.error
    const isLoading = hymn.isLoading || collections.isLoading

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
            {error && <ModalError error={error} />}
            {isLoading && <ModalLoading />}
            {accords.isModalActive && <ModalAccords />}
            {collections.isModalActive && <ModalCollection />}
            {!inView && <ButtonScroll />}
            {<div style={{ height: '1px' }} ref={refView} />}
            {hymn.currentHymn && <Arrows />}
        </>
    )
}

export default OverLays