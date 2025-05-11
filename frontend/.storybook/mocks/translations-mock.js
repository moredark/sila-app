import messages from '../../src/app/messages/ru.json'
export const translations = messages

const useTranslation = () => key => translations[key] || key

module.exports = {
  useTranslation,
}
