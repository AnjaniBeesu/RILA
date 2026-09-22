import fs from 'node:fs/promises'
import path from 'node:path'

const sourcePath = path.resolve('public/stickers/bouquet.svg')
const outputDir = path.resolve('public/stickers/generated')
const source = await fs.readFile(sourcePath, 'utf8')
const match = source.match(/data:image\/webp;base64,([^"\s]+)/)

if (!match) {
  throw new Error('Rila sticker strip: embedded WebP was not found in public/stickers/bouquet.svg')
}

const base64 = match[1]
const names = ['bouquet', 'letter', 'drawing', 'music', 'avatars', 'pictures', 'world']
const size = 100
const stripWidth = size * names.length

await fs.mkdir(outputDir, { recursive: true })

await Promise.all(names.map((name, index) => {
  const x = index * size
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${x} 0 ${size} ${size}"><image width="${stripWidth}" height="${size}" x="0" y="0" href="data:image/webp;base64,${base64}"/></svg>`
  return fs.writeFile(path.join(outputDir, `${name}.svg`), svg)
}))

console.log(`Generated ${names.length} individual sticker SVGs from the supplied strip.`)
