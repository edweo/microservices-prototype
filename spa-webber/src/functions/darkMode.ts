const htmlElement = document.querySelector('html')
const DARK_MODE: string = 'dark'

export function setDarkModeDOM(enable: boolean) {
  if (enable) {
    // @ts-expect-error might be null
    htmlElement.classList.add(DARK_MODE)
  } else {
    // @ts-expect-error might be null
    htmlElement.classList.remove(DARK_MODE)
  }
  localStorage.setItem(DARK_MODE, enable + "")
}

export function isDarkModeLocalStorage(): boolean | null {
  const value: string | null = localStorage.getItem(DARK_MODE)
  if (value === null) return null
  return value === 'true'
}