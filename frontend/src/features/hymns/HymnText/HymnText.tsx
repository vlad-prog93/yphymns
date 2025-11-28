import { IHymnText } from "../../../models/hymns"
import { parseHymnText } from "../workWithTextHymns"

interface Props {
  text: IHymnText
  showAccords: boolean
}

export const HymnText = ({ text, showAccords }: Props) => {
  return (
    <>
      {Object.entries(text).map(([section, content]) => {
        const parsed = showAccords
          ? parseHymnText(content)
          : content.split('\n').map(line => [{ word: line, chord: null }])

        return (
          <div key={section}>
            <h4>{section}</h4>

            {parsed.map((line, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                {line.map((part, j) => (
                  <span
                    key={j}
                    style={{
                      display: 'inline-block',
                      marginRight: '4px',
                      position: 'relative',
                    }}
                  >
                    {part.chord && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-18px',
                          left: '0',
                          fontSize: '0.8em',
                          fontWeight: 'bold',
                        }}
                      >
                        {part.chord}
                      </span>
                    )}

                    {part.word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )
      })}
    </>
  )
}
