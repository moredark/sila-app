const fs = require('fs')
const path = require('path')

const localesPath = path.resolve(__dirname, '../public/locales')

const typesPath = path.resolve(__dirname, '../src/shared/types/i18n.d.ts')

const extractKeys = (obj, prefix = '') => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key]
    const newPrefix = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'object') {
      acc.push(...extractKeys(value, newPrefix))
    } else {
      acc.push(newPrefix)
    }

    return acc
  }, [])
}

const generateTypes = () => {
  const locales = fs.readdirSync(localesPath)
  const keys = new Set()

  locales.forEach(locale => {
    const translations = require(path.join(localesPath, locale, 'translation.json'))
    const extractedKeys = extractKeys(translations)
    extractedKeys.forEach(key => keys.add(key))
  })

  const types = `
  // Generated i18n keys
  export type TranslationKeys = 
    ${[...keys].map(key => `'${key}'`).join(' |\n    ')};
  `

  fs.writeFileSync(typesPath, types.trim())
  console.log('i18n generated successfully')
}

generateTypes()
