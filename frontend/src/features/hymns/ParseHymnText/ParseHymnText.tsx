import transposeAccords from '@features/hymns/transposeAccords';
import style from './ParseHymnText.module.css'

interface ParseHymnTextProps {
  raw: string
  lvlTranspose: number
  btnClick: (spell: string) => void
}


const ParseHymnText = ({ raw, lvlTranspose, btnClick }: ParseHymnTextProps) => {

  return raw.split(/\[(.+?)\]/g).map((word, wordIndex) => {
    // Простое слово
    if (wordIndex % 2 === 0) return <>{word}</>;

    // Слово с аккордами
    return (
      <span
        key={`word-${wordIndex}`}
        className={style.hymn__word_with_accord}
      >
        {word.split(/\{(.+?)\}/g).map((spell, spellIndex) => {

          if (spellIndex % 2 === 0) return spell

          return (
            // аккорды (кнопка). может быть вид G-C, или просто А
            <button
              key={`inner-${wordIndex}-${spellIndex}`}
              className={style.hymn__accord}
              onClick={() => btnClick(spell)}
            >
              {transposeAccords(spell, lvlTranspose)}
            </button>
          );
        })}
      </span>
    );
  });
}

export default ParseHymnText