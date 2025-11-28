// app/AppProviders.tsx
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'

import { contextSettingsFont, stateSettingsFont } from '../context/settingsSize'
import { LSSettingsFont } from '../tools/storage'
import { ISettingsFont } from '../models/settingsFont'

interface Props {
  children: React.ReactNode
}

export const AppProviders = ({ children }: Props) => {
  const [settingsFont, setSettingsFont] = useState<ISettingsFont>(
    LSSettingsFont.get() || stateSettingsFont
  )

  return (
    <Provider store={store}>
      <contextSettingsFont.Provider value={{ ...settingsFont, setSettingsFont }}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </contextSettingsFont.Provider>
    </Provider>
  )
}
