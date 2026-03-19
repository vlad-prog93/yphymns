// models/settingsFont.ts
export interface ISettingsFontState {
  fontSizeText: number
  fontSizeAccord: number
  colorText: string
  colorAccord: string
}

export interface ISettingsFontContext extends ISettingsFontState {
  setSettingsFont: React.Dispatch<React.SetStateAction<ISettingsFontState>>
}