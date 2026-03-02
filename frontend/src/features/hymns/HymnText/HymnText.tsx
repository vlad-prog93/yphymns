import { IHymnText } from "@models/hymns"
import style from './HymnText.module.css'
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { accordsSlice } from "@redux/reducers/accords/AccordsSlice"

interface Props {
  text: IHymnText
  showAccords: boolean
}

export const HymnText = ({ text, showAccords }: Props) => {
  const { lvlTranspose } = useAppSelector(s => s.accords)
  const dispatch = useAppDispatch();

  const handleChordClick = (chord: string) => {
    dispatch(accordsSlice.actions.setCurrentAccords(chord.split('-')));
  };

  const transposeAccords = (accords: string) => {
    const baseAccords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',] // длина 12
    const length = baseAccords.length

    const normalized = ((lvlTranspose % length) + length) % length

    return accords.replace(/[CDEFGAB]#?/g, (match: string) => {
      const index = baseAccords.indexOf(match)
      if (index === -1) return match   // защита на всякий случай
      return baseAccords[(index + normalized) % length]
    })
  }

  const parseHymnText = (raw: string) =>
    raw.split(/\[(.+?)\]/g).map((word, wordIndex) => {
      // Простое слово
      if (wordIndex % 2 === 0) return word;

      // Слово с аккордами
      return (
        <span
          key={`word-${wordIndex}`}
          className={style.hymn__word_with_accord}
        >
          {word.split(/\{(.+?)\}/g).map((spell, spellIndex) => {
            if (spellIndex % 2 === 0) return spell;

            return (
              // аккорды (кнопка). может быть вид G-C, или просто А
              <button
                key={`inner-${wordIndex}-${spellIndex}`}
                className={style.hymn__accord}
                onClick={() => handleChordClick(spell)}
              >
                {transposeAccords(spell)}
              </button>
            );
          })}
        </span>
      );
    });

  return (
    <div className={style.hymnText}>
      {Object.entries(text).map(([section, content]) => (
        <div key={section} className={style.hymnText__content}>
          <span className={style.hymnText__section}>
            {section.endsWith(" verse")
              ? section.replace(/ verse/g, ".")
              : ""}
          </span>

          <pre className={showAccords ? style.hymnText__text_with_accords : style.hymnText__text}>
            {showAccords ? parseHymnText(content) : content}
          </pre>
        </div>
      ))}
    </div>
  );
};
