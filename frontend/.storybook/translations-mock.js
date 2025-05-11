// Моки для useTranslation и других функций из @/shared/lib
const messages = require('../src/app/messages/ru.json')
const translations = messages

// Функция для форматирования времени
const formatTime = timeInSeconds => {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

// Функция для расчета среднего веса
const calculateAverageWeight = sets => {
  if (!sets || !sets.length) return 0
  const sum = sets.reduce((acc, set) => acc + set.weight, 0)
  return Math.round((sum / sets.length) * 10) / 10
}

// Мок-функция для перевода
const useTranslation = () => key => translations[key] || key

// Экспортируем именованные функции
module.exports = {
  useTranslation,
  formatTime,
  calculateAverageWeight,
  cn: (...classes) => classes.filter(Boolean).join(' '),
}
