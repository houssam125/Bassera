// Converts the original design files into web-ready WebP under public/media/<slug>/
// and writes src/data/media.generated.json (dimensions + blur placeholder per image).
//
//   npm run assets                      # reads C:/Users/DELL/Desktop/mehdi
//   MEDIA_SOURCE=D:/designs npm run assets
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = process.env.MEDIA_SOURCE ?? 'C:/Users/DELL/Desktop/mehdi'
const MAX_EDGE = 1800
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'scripts/works.manifest.json'), 'utf8'))

const outRoot = path.join(root, 'public/media')
fs.rmSync(outRoot, { recursive: true, force: true })

const result = {}
let total = 0
let bytesIn = 0
let bytesOut = 0

for (const [slug, files] of Object.entries(manifest.groups)) {
  const dir = path.join(outRoot, slug)
  fs.mkdirSync(dir, { recursive: true })
  result[slug] = []

  for (let i = 0; i < files.length; i++) {
    const src = path.join(SOURCE, files[i])
    const name = `${String(i + 1).padStart(2, '0')}.webp`
    const dest = path.join(dir, name)
    const input = sharp(src, { limitInputPixels: false })

    const info = await input
      .clone()
      .rotate()
      .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
      .flatten({ background: '#ffffff' })
      .webp({ quality: 80, effort: 5 })
      .toFile(dest)

    const blur = await input
      .clone()
      .rotate()
      .resize(16, 16, { fit: 'inside' })
      .flatten({ background: '#ffffff' })
      .jpeg({ quality: 40 })
      .toBuffer()

    result[slug].push({
      src: `/media/${slug}/${name}`,
      width: info.width,
      height: info.height,
      blur: `data:image/jpeg;base64,${blur.toString('base64')}`,
    })

    total++
    bytesIn += fs.statSync(src).size
    bytesOut += info.size
    process.stdout.write(`\r${slug} ${i + 1}/${files.length}                `)
  }
  process.stdout.write('\n')
}

const dataFile = path.join(root, 'src/data/media.generated.json')
fs.mkdirSync(path.dirname(dataFile), { recursive: true })
fs.writeFileSync(dataFile, JSON.stringify(result))

const mb = (n) => (n / 1024 / 1024).toFixed(1)
console.log(`\n${total} images · ${mb(bytesIn)} MB → ${mb(bytesOut)} MB`)
