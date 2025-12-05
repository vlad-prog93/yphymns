import { ReactNode } from "react";
import "./App.css"


import Header from "@components/layout/Header/Header"
import Menu from "@components/layout/Menu/Menu"
import OverLays from "@components/layout/OverLays/OverLays"

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {


  return (
    <div className='app' >
      <Menu />
      <Header />
      <main className='app__wrapper'>
        {children}
      </main>
      <OverLays />
    </div>
  )
}

export default AppLayout