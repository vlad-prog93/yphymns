import { ReactNode, useContext } from "react";
import "./App.css"


import Header from "@components/layout/Header/Header"
import Menu from "@components/layout/Menu/Menu"
import OverLays from "@components/layout/OverLays/OverLays"
import WrapperPage from "@components/layout/WrapperPage/WrapperPage";
import { contextSettingsFont } from "@context/settingsSize";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {

  const { fontSizeText, fontSizeAccord, colorText, colorAccord } = useContext(contextSettingsFont)

  return (
    <div
      className='app'
      style={{
        '--font-size-text': `${fontSizeText}px`,
        '--font-size-accord': `${fontSizeAccord}px`,
        '--color-text': colorText,
        '--color-accord': colorAccord,
      } as React.CSSProperties} >

      <Menu />
      <Header />
      <WrapperPage>
        {children}
      </WrapperPage>
      <OverLays />
    </div>
  )
}

export default AppLayout