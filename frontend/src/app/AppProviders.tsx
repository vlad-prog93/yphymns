// app/AppProviders.tsx
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { useMemo, useState } from 'react'

import { store } from '@redux/store'

import { contextSettingsFont, stateSettingsFont } from '@context/settingsSize'
import { LSSettingsFont } from '@tools/storage'
import { ISettingsFont } from '@models/settingsFont'

interface Props {
  children: React.ReactNode
}

const AppProviders = ({ children }: Props) => {
  const [settingsFont, setSettingsFont] = useState<ISettingsFont>(LSSettingsFont.get() || stateSettingsFont)
  const contextValue: ISettingsFont = useMemo(() => ({
    ...settingsFont,
    setSettingsFont
  }), [settingsFont])

  return (
    <Provider store={store}>
      <contextSettingsFont.Provider value={contextValue}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </contextSettingsFont.Provider>
    </Provider>
  )
}

export default AppProviders