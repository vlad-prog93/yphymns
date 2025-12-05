import { ReactNode } from "react"
import { useInitApp } from "@hooks/useInitApp";

interface Props {
  children: ReactNode
}

const AppInitializer = ({ children }: Props) => {

  useInitApp()

  return (
    <>
      {children}
    </>
  )
}

export default AppInitializer