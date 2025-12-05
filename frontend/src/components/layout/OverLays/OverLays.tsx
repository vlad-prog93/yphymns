import ModalError from "@components/feedback/ModalError/ModalError"
import ModalLoading from "@components/feedback/ModalLoading/ModalLoading"
import Arrows from "@components/navigation/Arrows/Arrows"
import ModalAccords from "@features/accords/ModalAccords/ModalAccords"
import ModalCollection from "@features/collections/ModalCollection/ModalCollection"
// import ButtonScroll from "@features/scroll/ButtonScroll/ButtonScroll"

import { useAppSelector } from "@redux/hooks"

const OverLays = () => {

    const hymn = useAppSelector(s => s.hymn)
    const collections = useAppSelector(s => s.collections)
    const accords = useAppSelector(s => s.accords)
    // const scrollReducer = useAppSelector(s => s.scroll)

    const error = hymn.error || collections.error
    const isLoading = hymn.isLoading || collections.isLoading

    return (
        <>
            {error && <ModalError error={error} />}
            {isLoading && <ModalLoading />}
            {accords.isModalActive && <ModalAccords />}
            {collections.isModalActive && <ModalCollection />}
            {/* {scroll.isShowAutoScroll && <ButtonScroll alreadyBottom={inView} />}
{hymn.currentHymn && <div style={{ height: '1px' }} ref={refView} />} */}
            {hymn.currentHymn && <Arrows />}
        </>
    )
}

export default OverLays