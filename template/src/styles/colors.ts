const colorRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

type RGBType = {
  r: number
  g: number
  b: number
}

const hexToRGB = (hex: string): RGBType | null => {
  const result = colorRegex.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export const colors = {
  /**
   *  Main BLACK color
   *  @constant '#121212'
   */
  PRIMARY: '#121212',
  /**
   * Main RED color
   * @constant '#e20e17'
   */
  SECONDARY: '#e20e17',
  /**
   * Default WHITE background color
   * @constant '#fafafa'
   */
  BACKGROUND: '#fafafa',
  /**
   * Default GREY icon color
   * @constant '#d8d8d8'
   */
  ICON: '#d8d8d8',

  /**
   * Transforms hex with alpha to rgba
   * @param color - hex representation of a color
   * @param alpha - alpha you want applied on a scale from 0 - 1. Defaults to 1
   *
   * @returns `rgba(${red}, ${green}, ${blue}, ${alpha || 1})`
   */
  rgba: (color: string, alpha?: number): string => {
    const rgb = hexToRGB(color)

    return `rgba(${rgb?.r}, ${rgb?.g}, ${rgb?.b}, ${alpha || 1})`
  },
}
