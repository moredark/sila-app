const fs = require('fs')
const path = require('path')

const messagesPath = path.resolve(__dirname, '../src/app/messages')

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
  const locales = fs.readdirSync(messagesPath)
  const keys = new Set()

  locales.forEach(localeFile => {
    const translations = require(path.join(messagesPath, localeFile))
    const extractedKeys = extractKeys(translations)
    extractedKeys.forEach(key => keys.add(key))
  })

  const types = `
  // Generated i18n keys
  export type TranslationKeys = 
    ${[...keys].map(key => `'${key}'`).join(' |\n    ')};
  `

  fs.writeFileSync(typesPath, types.trim())
  console.log('i18n types generated successfully')
}

generateTypes()
