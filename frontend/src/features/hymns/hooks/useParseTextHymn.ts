import { IHymnText } from "@models/hymns"
import { useAppSelector } from "@redux/hooks"

export const useParseTextHymn = (text: IHymnText | null) => {
  const { isShowAccords } = useAppSelector(s => s.accords)

  if (!text) return null
  if (isShowAccords) return text

  const CLEAN_REGEX = /\[|\]|{.*?}/g;

  const cleaned = Object.fromEntries(
    Object.entries(text).map(([section, value]) => [
      section,
      (value ?? "").replace(CLEAN_REGEX, "")
    ])
  ) as IHymnText

  return cleaned
}