export const formatTime = (seconds: number) => {
  const getTwoDigits = (num: number) => num.toString().padStart(2, '0')
  const hrs = getTwoDigits(Math.floor(seconds / 3600))
  const mins = getTwoDigits(Math.floor((seconds % 3600) / 60))
  const secs = getTwoDigits(seconds % 60)
  return `${hrs}:${mins}:${secs}`
}
