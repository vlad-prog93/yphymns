export const handleTranslate = (key: string): string => {
  const translatedKey = key.replace(/verse/g, 'куплет').replace(/bridge/g, 'куплет-припев').replace(/chorus/g, 'припев')
  return translatedKey
}

export const changeViewTextHymn = (obj: { [key: string]: string }): { [key: string]: string } => {
  const result = { ...obj }
  Object.keys(result).forEach((key) => {

    const rows_text = result[key].split('\n')
    const res = rows_text.map((str) => {
      let shift = 0
      let text_accords = []
      const obj: any = {}
      let text_without_accords = str.replace(/\[/g, '').replace(/\]/g, '')
      while (text_without_accords.match(/{[^\}]*\}/)) {
        text_without_accords = text_without_accords.replace(/{[^\}]*\}/, (match: string) => {
          const a = match.replace(/{/, '').replace(/}/, '')
          if (a) {
            obj[text_without_accords.indexOf(match) - 1 - shift] = a
            shift = shift + a.length - 1
          }
          return ''
        })
      }
      for (let key in obj) {
        text_accords[Number(key)] = obj[key]
      }

      let text_accords_long: any = []
      for (let i of text_accords) {
        if (!i) {
          text_accords_long.push(' ')
        } else {
          text_accords_long.push(i)
        }
      }
      text_accords_long = text_accords_long.join('')
      let text_without_accords_long = text_without_accords

      let quantityAddSpaceInEndStr = text_accords_long.length - text_without_accords_long.length

      if (quantityAddSpaceInEndStr < 0) {
        let space = ''
        while (quantityAddSpaceInEndStr !== 0) {
          space += ' '
          quantityAddSpaceInEndStr += 1
        }
        text_accords_long = text_accords_long + space
      }
      if (quantityAddSpaceInEndStr > 0) {
        let space = ''
        while (quantityAddSpaceInEndStr !== 0) {
          space += ' '
          quantityAddSpaceInEndStr -= 1
        }
        text_without_accords_long = text_without_accords_long + space
      }

      return text_accords_long + '\n' + text_without_accords_long
    })
    result[key] = res.join('\n')
  })

  return result
}

export const moveAccordsInText = (obj: { [key: string]: string }): { [key: string]: string } => {
  const result = { ...obj }
  try {

    Object.keys(result).forEach((key, ind) => {
      result[key] = accordsDown(result[key])
    })
  } catch (e) {
    console.log(e)
  }

  return result
}

// DeleteAccords
export const deleteAccords = (obj: { [key: string]: string }): { [key: string]: string } => {
  const result = { ...obj }
  Object.keys(result).forEach((key) => {
    result[key] = result[key].replace(/{[^\}]*\}/g, '').replace(/\[/g, '').replace(/\]/g, '')
  })
  return result
}

// balanceStr ---- уравнять по длине строчки   --- дано СТРОКА: "   G       C\nБог мудро являет\n"    нужно получить строку: "   G       C   \nБог мудро являет\n" 
export const balanceStr = (text: string) => {

  const arr_from_text = text.split('\n').map((str, index, arr) => {
    // проверяем, это строка является аккордами или нет
    if (!(index % 2)) {

      let text_with_accord = arr[index] // строчка текста с аккордами
      let text_without_accord = arr[index + 1] // строчка текста без аккордов

      let shift = text_with_accord.length - text_without_accord.length // дельта длины строчек

      while (shift < 0) {
        text_with_accord += ' '
        shift += 1
      }
      return text_with_accord
    }

    if (index % 2) {

      let text_with_accord = arr[index - 1]
      let text_without_accord = arr[index]

      let shift = text_with_accord.length - text_without_accord.length

      while (shift > 0) {
        text_without_accord += ' '
        shift -= 1
      }
      return text_without_accord
    }
  })

  return arr_from_text.join('\n')
}

// спускает аккорды вниз. работает с двумя строчками (в этой функции содержится сама логика спускания)
// первая строчка с аккордами, вторая с текстом
const zipper = (accords: string, text: string) => {

  // из строчек делаем массивы
  const arr_accords = accords.split('')
  const arr_text = text.split('')
  const result: string[] = []

  // смещение в правую сторону если нашли символ аккорда 
  let shift = 1

  // итерируемся по массиву аккорда
  // вся логика основана на смещении: есть два варианта:
  // 1 - если смещения нет, то уменьшаем его на 1 проверяем есть ли текст в этой ячейке и добавляем текст в результат 
  // проверяем есть ли текст на случай, если строчка аккордов больше
  // 2 - если смещение есть, то прибавляем его и смотрим когда аккорд закончится
  // потом его кладем в результат.
  arr_accords.forEach((accord, index_of_accord, arr_accords) => {
    if (shift !== 1) {
      shift -= 1
      if (arr_text[index_of_accord]) {
        result.push(arr_text[index_of_accord])
      }
      return
    }

    if (accord !== ' ') {
      let full_accord = accord

      while ((arr_accords[index_of_accord + shift]) !== ' ' && arr_accords[index_of_accord + shift]) {
        full_accord += arr_accords[index_of_accord + shift]
        shift += 1
      }
      result.push(arr_text[index_of_accord], '{', full_accord, '}')
      return
    }
    result.push(arr_text[index_of_accord])
  })

  // это на случай, если строчка аккордов закончилась, а текст еще есть
  if (arr_accords.length < arr_text.length) {
    result.push(...arr_text.splice(arr_accords.length))
  }
  return result.join('')

}

// спускает аккорды в текст (работа с фрагментом гимна) input: куплет или припев 
const accordsDown = (verse: string) => {
  const result: string[] = []
  verse.split('\n').forEach((str, index, arr_verse) => {
    if (index % 2 === 0) {
      result.push(zipper(arr_verse[index], arr_verse[index + 1]))
    }
  })
  return result.join(' \n ').split(' ').map((el) => {
    if (el.includes('{')) {
      return `[${el}]`
    }
    return el
  }).join(' ').replace(/ \n /g, '\n')
}
