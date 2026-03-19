import { IHymnText } from "@features/hymns/model/hymns"
import style from './HymnText.module.css'

import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { accordsSlice } from "@redux/reducers/accords/AccordsSlice"

import ParseHymnText from "@features/hymns/ParseHymnText/ParseHymnText"
import transposeAccords from "@features/hymns/transposeAccords"

interface Props {
  text: IHymnText
  showAccords: boolean
  isRepeatAccords: boolean
}

export const HymnText = ({ text, showAccords, isRepeatAccords }: Props) => {
  const { lvlTranspose } = useAppSelector(s => s.accords)
  const dispatch = useAppDispatch()

  const hideAccords = !showAccords
  const hideRepeat = showAccords && !isRepeatAccords

  const isStartSection = (section: string) =>
    section.startsWith("1 verse") ||
    section.startsWith("1 chorus") ||
    section.endsWith("bridge")

  const handleChordClick = (chord: string) => {
    const transposed = transposeAccords(chord, lvlTranspose)

    dispatch(
      accordsSlice.actions.setCurrentAccords(
        transposed.split("-")
      )
    )
  }

  const removeAccords = (text: string) =>
    text.replace(/\[|\]|{.*?}/g, "")

  const getTextClass = (section: string) => {
    const startSection = isStartSection(section)

    if (!showAccords) {
      return style.hymnText__text
    }

    if (isRepeatAccords) {
      return style.hymnText__text_with_accords
    }

    return startSection
      ? style.hymnText__text_with_accords
      : style.hymnText__text
  }

  const renderContent = (section: string, content: string) => {
    const startSection = isStartSection(section)

    if (hideAccords) {
      return content
    }

    if (hideRepeat && !startSection) {
      return removeAccords(content)
    }

    return (
      <ParseHymnText
        raw={content}
        lvlTranspose={lvlTranspose}
        btnClick={handleChordClick}
      />
    )
  }

  const renderSectionNumber = (section: string) => {
    if (!section.endsWith(" verse")) return ""

    return section.replace(/ verse/g, ".")
  }

  const sections = Object.entries(text)

  return (
    <div className={style.hymnText}>
      {sections.map(([section, content]) => (
        <div key={section} className={style.hymnText__content}>

          <span className={getTextClass(section)}>
            {renderSectionNumber(section)}
          </span>

          <pre className={getTextClass(section)}>
            {renderContent(section, content)}
          </pre>

        </div>
      ))}
    </div>
  )
}