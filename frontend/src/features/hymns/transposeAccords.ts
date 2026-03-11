const transposeAccords = (accords: string, lvlTranspose: number) => {
  const baseAccords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',] // длина 12
  const length = baseAccords.length

  const normalized = ((lvlTranspose % length) + length) % length

  return accords.replace(/[CDEFGAB]#?/g, (match: string) => {
    const index = baseAccords.indexOf(match)
    if (index === -1) return match   // защита на всякий случай
    return baseAccords[(index + normalized) % length]
  })
}

export default transposeAccords