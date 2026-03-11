import { IHymnText } from "@features/hymns/model/hymns"
import style from './HymnText.module.css'
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { accordsSlice } from "@redux/reducers/accords/AccordsSlice"
import ParseHymnText from "@features/hymns/ParseHymnText/ParseHymnText"
import transposeAccords from "@features/hymns/transposeAccords"

interface Props {
  text: IHymnText
  showAccords: boolean,
  isRepeatAccords: boolean
}

export const HymnText = ({ text, showAccords, isRepeatAccords }: Props) => {
  const { lvlTranspose } = useAppSelector(s => s.accords)
  const dispatch = useAppDispatch();

  const hideAccords = !showAccords
  const hideRepeat = showAccords && !isRepeatAccords

  const checkStartSectionHymn = (section: string) => {
    return (section.startsWith("1 verse") || section.endsWith("bridge") || section.startsWith("1 chorus"))
  }

  const handleChordClick = (chord: string) => {
    dispatch(accordsSlice.actions.setCurrentAccords(transposeAccords(chord, lvlTranspose).split('-')));
  };

  const renderContent = (section: string, content: string) => {

    const isStartSection = checkStartSectionHymn(section)

    if (hideAccords) {
      return <pre className={style.hymnText__text}>{content}</pre>
    }

    if (hideRepeat && !isStartSection) {
      return (
        <pre className={style.hymnText__text}>
          {content.replace(/\[|\]|{.*?}/g, "")}
        </pre>
      )
    }

    return (
      <pre className={style.hymnText__text_with_accords}>
        <ParseHymnText
          raw={content}
          lvlTranspose={lvlTranspose}
          btnClick={handleChordClick}
        />
      </pre>
    )
  }

  return (
    <div className={style.hymnText}>
      {Object.entries(text).map(([section, content]) => (
        <div key={section} className={style.hymnText__content}>
          <span className={style.hymnText__section}>
            {section.endsWith(" verse")
              ? section.replace(/ verse/g, ".")
              : ""}
          </span>
          {renderContent(section, content)}
        </div>
      ))}
    </div>
  );
};
