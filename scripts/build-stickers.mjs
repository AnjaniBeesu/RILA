import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourcePath = path.resolve('public/stickers/bouquet.svg')
const outputDir = path.resolve('public/stickers/generated')
const source = await fs.readFile(sourcePath, 'utf8')
const match = source.match(/data:image\/webp;base64,([^"\s]+)/)

if (!match) {
  throw new Error('Rila sticker strip: embedded WebP was not found in public/stickers/bouquet.svg')
}

const sourceImage = Buffer.from(match[1], 'base64')
const meta = await sharp(sourceImage).metadata()
const width = meta.width ?? 700
const height = meta.height ?? 100
const names = ['bouquet', 'letter', 'drawing', 'music', 'avatars', 'pictures', 'world']
const cellWidth = Math.floor(width / names.length)

await fs.mkdir(outputDir, { recursive: true })

await Promise.all(names.map(async (name, index) => {
  const left = index * cellWidth
  const remaining = width - left
  const cropWidth = index === names.length - 1 ? remaining : cellWidth
  const output = path.join(outputDir, `${name}.png`)
  await sharp(sourceImage)
    .extract({ left, top: 0, width: cropWidth, height })
    .png({ compressionLevel: 9 })
    .toFile(output)
}))

console.log(`Generated ${names.length} Rila stickers from ${width}x${height} source artwork.`)
