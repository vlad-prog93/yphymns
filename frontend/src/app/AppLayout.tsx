const AppLayout = (children: any) => {


  return (
    {(hymnReducer.error || collectionsReducer.error) && <PopupError />}
{ (hymnReducer.isLoading || collectionsReducer.isLoading) && <PopupError /> }
        <Menu />
        <Header />
{ isModalActive && <ModalAccords /> }
{ collectionsReducer.isModalShow && <ModalCreateCollection /> }

<div className='App' >
  <div className='App__header'>
    {scrollReducer.isShowAutoScroll && <ButtonScroll alreadyBottom={inView} />}
  </div>
  {children}
  {hymnReducer.currentHymn && <div style={{ height: '1px' }} ref={refView} />}
  <div className='App__footer'>
    {hymnReducer.currentHymn && <Arrows />}
  </div>

</div>
  )
}

export default AppLayout