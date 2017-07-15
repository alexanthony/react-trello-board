import tinycolor from 'tinycolor2'

export const isBlank = aString => !aString || aString.trim().length === 0

// export const randomColour = () =>
//   `#${(Math.random().toString(16) + '000000').substring(2, 8)}`

export const randomColour = () => tinycolor.random().toHexString()

export const randomLightColour = () => {
  let colour = '#000'
  while (tinycolor(colour).isDark()) {
    colour = randomColour()
  }
  return colour
}

export const labelStyle = colour => ({
  backgroundColor: colour,
  color: tinycolor(colour).isDark() ? '#fff' : '#000'
})
