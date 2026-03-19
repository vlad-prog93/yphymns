import React from "react";
import { ISettingsFontContext, ISettingsFontState } from "@models/settingsFont";

export const stateSettingsFont: ISettingsFontState = {
  fontSizeText: 18,
  fontSizeAccord: 18,
  colorText: '#000000',
  colorAccord: '#000000',
}

export const contextSettingsFont = React.createContext<ISettingsFontContext>({
  ...stateSettingsFont,
  setSettingsFont: () => { }
})