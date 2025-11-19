export interface ISettingsFontLS {
  fontSizeText: string,
  fontSizeAccord: string,

  colorText: string,
  colorAccord: string
}

export interface ISettingsFont extends ISettingsFontLS {
  setSettingsFont: (obj: ISettingsFont) => void
}