import { readFileSync, writeFileSync } from 'fs'

const codeToObscure = /cycle.push\(cycle\[0\]\);(\s.*){5}/gim
const problemFilePath = './node_modules/metro/src/lib/polyfills/require.js'
const problemFileContent = readFileSync(problemFilePath, 'utf8')
writeFileSync(
  problemFilePath,
  problemFileContent.replace(
    codeToObscure,
    '// no cycle warning removed by silence-recycled-files-warning.js script',
  ),
  'utf8',
)
