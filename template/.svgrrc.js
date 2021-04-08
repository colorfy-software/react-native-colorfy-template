/**
 * NOTE: Add colors present in the SVG icons that you'd like to update from JavaScript here.
 * Keep in mind that if the SVG doesn't mention any colors, `props.fill` will be used as default.
 * If need be, any SVG should only use one specific color for fill, another for stroke, etc if needed.
 */

module.exports = {
  replaceAttrValues: {
    '#000': '{props.fill}',
    '#000': '{props.stroke}',
  },
}
