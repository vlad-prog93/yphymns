import React from "react";
import { ISettingsFont } from '../models/settingsFont'

export const stateSettingsFont: ISettingsFont = {
  fontSizeText: '18',
  fontSizeAccord: '18',

  colorText: '#000000',
  colorAccord: '#000000',

  setSettingsFont: (obj: ISettingsFont) => { }
}


export const contextSettingsFont = React.createContext<ISettingsFont>(stateSettingsFont)