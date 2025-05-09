export const formatTime = (seconds: number) => {
  const getTwoDigits = (num: number) => num.toString().padStart(2, '0')
  const mins = getTwoDigits(Math.floor(seconds / 60))
  const secs = getTwoDigits(seconds % 60)
  return `${mins}:${secs}`
}
