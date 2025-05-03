import Cookies from 'js-cookie'

export function getLanguageHeader(): string {
  return Cookies.get('language') || 'en'
}