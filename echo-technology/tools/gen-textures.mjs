#!/usr/bin/env node
// Generates the Echo Technology 16x16 textures and the 128x128 mod icon as PNGs using only Node built-ins.
// Usage: node tools/gen-textures.mjs [--preview <sheet.png>]
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { deflateSync } from 'node:zlib'

const MOD_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ASSETS = join(MOD_ROOT, 'src/main/resources/assets/echo_technology')
const SIZE = 16

const PALETTE = {
  '.': null,
  K: '#05090b', // outline
  S: '#0b1418', // slate
  T: '#0f3b44', // sculk teal
  t: '#16525d', // sculk teal, lit
  n: '#1c282c', // metal, shadow
  M: '#2a3a40', // metal
  m: '#3d5258', // metal, lit
  c: '#1a9aa6', // cyan energy, dim
  C: '#29dfeb', // cyan energy
  H: '#b8fbff', // highlight
}

function upgradeChip(symbol) {
  const pinRows = new Set([4, 6, 9, 11])
  const body = symbol.map((line, i) => {
    const pin = pinRows.has(i + 4) ? 'M' : '.'
    return `.${pin}Km${line.replaceAll('.', 'T')}nK${pin}.`
  })
  return [
    '................',
    '...KKKKKKKKKK...',
    '..KmmmmmmmmmmK..',
    '..KmTTTTTTTTnK..',
    ...body,
    '..KmTTTTTTTTnK..',
    '..KnnnnnnnnnnK..',
    '...KKKKKKKKKK...',
    '................',
  ]
}

const TEXTURES = {
  'block/machine_side': [
    'KKKKKKKKKKKKKKKK',
    'KmmmmmmmmmmmmmMK',
    'KmHMMMMMMMMMMHMK',
    'KmMnnnnnnnnnnMMK',
    'KmMnTTTTTTTTnMMK',
    'KmMnTSSSSSSTnMMK',
    'KmMnTttttttTnMMK',
    'KmMnTSSSSSSTnMMK',
    'KmMnTttttttTnMMK',
    'KmMnTSSSSSSTnMMK',
    'KmMnTttttttTnMMK',
    'KmMnTTTTTTTTnMMK',
    'KmMnnnnnnnnnnMMK',
    'KmHMMMMMMMMMMHMK',
    'KMMMMMMMMMMMMMnK',
    'KKKKKKKKKKKKKKKK',
  ],
  'block/machine_top': [
    'KKKKKKKKKKKKKKKK',
    'KmmmmmmmmmmmmmMK',
    'KmHMMMMMMMMMMHMK',
    'KmMMMMMMMMMMMMMK',
    'KmMMMnnnnnnMMMMK',
    'KmMMnKKKKKKnMMMK',
    'KmMMnKcCCcKnMMMK',
    'KmMMnKCHHCKnMMMK',
    'KmMMnKCHHCKnMMMK',
    'KmMMnKcCCcKnMMMK',
    'KmMMnKKKKKKnMMMK',
    'KmMMMnnnnnnMMMMK',
    'KmMMMMMMMMMMMMMK',
    'KmHMMMMMMMMMMHMK',
    'KMMMMMMMMMMMMMnK',
    'KKKKKKKKKKKKKKKK',
  ],
  'block/echo_reactor_front': [
    'KKKKKKKKKKKKKKKK',
    'KmmmmmmmmmmmmmMK',
    'KmHMMMKKKKMMMHMK',
    'KmMMKKTTTTKKMMMK',
    'KmMMKTcCCcTKMMMK',
    'KmMKTcCHHCcTKMMK',
    'KmMKTCHHHHCTKMMK',
    'KmMKTCHHHHCTKMMK',
    'KmMKTcCHHCcTKMMK',
    'KmMMKTcCCcTKMMMK',
    'KmMMKKTTTTKKMMMK',
    'KmMMMMKKKKMMMMMK',
    'KmMMMMMMMMMMMMMK',
    'KmHMcMCMMCMcMHMK',
    'KMMMMMMMMMMMMMnK',
    'KKKKKKKKKKKKKKKK',
  ],
  'block/echo_fabricator_front': [
    'KKKKKKKKKKKKKKKK',
    'KmmmmmmmmmmmmmMK',
    'KmHMMMMMMMMMMHMK',
    'KmMKKKKKKKKKKMMK',
    'KmMKSSSSSSSSKMMK',
    'KmMKSMmmmmMSKMMK',
    'KmMKSSSMMSSSKMMK',
    'KmMKSSScCSSSKMMK',
    'KmMKSSSCCSSSKMMK',
    'KmMKSScHHcSSKMMK',
    'KmMKSTTTTTTSKMMK',
    'KmMKSnnnnnnSKMMK',
    'KmMKKKKKKKKKKMMK',
    'KmHMMCMCMCMMMHMK',
    'KMMMMMMMMMMMMMnK',
    'KKKKKKKKKKKKKKKK',
  ],
  'block/echo_charger_front': [
    'KKKKKKKKKKKKKKKK',
    'KmmmmmmmmmmmmmMK',
    'KmHMMMMMMMMMMHMK',
    'KmMMMMKnnKMMMMMK',
    'KmMMKKKKKKKKMMMK',
    'KmMMKSSSSSSKMMMK',
    'KmMMKSHCCCSKMMMK',
    'KmMMKSSSSSSKMMMK',
    'KmMMKSHCCCSKMMMK',
    'KmMMKSSSSSSKMMMK',
    'KmMMKSccccSKMMMK',
    'KmMMKSSSSSSKMMMK',
    'KmMMKKKKKKKKMMMK',
    'KmHMMMMMMMMMMHMK',
    'KMMMMMMMMMMMMMnK',
    'KKKKKKKKKKKKKKKK',
  ],
  'item/resonant_alloy': [
    '................',
    '................',
    '................',
    '................',
    '.....KKKKKKK....',
    '....KHHHHHHHK...',
    '...KHHHHHHHHHK..',
    '..KtCCCCCCCCCtK.',
    '..KtcCCCCCCCctK.',
    '..KTcccccccccTK.',
    '..KKKKKKKKKKKKK.',
    '................',
    '................',
    '................',
    '................',
    '................',
  ],
  'item/echo_circuit': [
    '................',
    '................',
    '..KKKKKKKKKKKK..',
    '..KttttttttttK..',
    '..KTCCCTTTCCTK..',
    '..KTTTCTTTCTTK..',
    '..KTTKKKKKKTTK..',
    '..KTCKSSSSKCCK..',
    '..KTCKSHSSKTTK..',
    '..KTTKKKKKKTTK..',
    '..KTTTCTTCTTTK..',
    '..KTCCCTTCCCTK..',
    '..KTTTTTTTTTTK..',
    '..KKKKKKKKKKKK..',
    '................',
    '................',
  ],
  'item/energy_cell': [
    '................',
    '......KKKK......',
    '......KmmK......',
    '....KKKKKKKK....',
    '....KmMMMMnK....',
    '....KKKKKKKK....',
    '....KHCCCCcK....',
    '....KHCCCCcK....',
    '....KHCCCCcK....',
    '....KCCCCCcK....',
    '....KCCCCCcK....',
    '....KccccccK....',
    '....KKKKKKKK....',
    '....KmMMMMnK....',
    '....KKKKKKKK....',
    '................',
  ],
  'item/echo_drill': [
    '................',
    '............KK..',
    '...........KHmK.',
    '..........KHmMK.',
    '.........KHmMK..',
    '........KHmMK...',
    '.......KCCMK....',
    '......KmCCK.....',
    '.....KmTTMK.....',
    '....KmTTCMK.....',
    '....KmTTMK......',
    '...KnKMMK.......',
    '..KnnKKK........',
    '.KnnK...........',
    '.KnK............',
    '..K.............',
  ],
  'item/echo_scanner': [
    '...........KHK..',
    '...........KMK..',
    '..KKKKKKKKKKKK..',
    '..KmmmmmmmmmMK..',
    '..KmKKKKKKKKMK..',
    '..KmKSSSSSSKMK..',
    '..KmKSSSHSSKMK..',
    '..KmKSSCSCSKMK..',
    '..KmKccSSScKMK..',
    '..KmKSSSSSSKMK..',
    '..KmKKKKKKKKMK..',
    '..KmMMMMMMMMMK..',
    '..KmMCMMMcMMMK..',
    '..KMMMMMMMMMnK..',
    '..KKKKKKKKKKKK..',
    '................',
  ],
  'item/efficiency_upgrade': upgradeChip([
    '.....CC.',
    '....HC..',
    '...HC...',
    '..HCCCC.',
    '....CC..',
    '...CC...',
    '..CC....',
    '..C.....',
  ]),
  'item/capacity_upgrade': upgradeChip([
    '.HCCCCC.',
    '.cccccc.',
    '........',
    '.HCCCCC.',
    '.cccccc.',
    '........',
    '.HCCCCC.',
    '.cccccc.',
  ]),
}

const ICON_SOURCE = 'block/echo_reactor_front'
const ICON_SCALE = 8

function toRgba(name, rows) {
  if (rows.length !== SIZE) throw new Error(`${name}: expected ${SIZE} rows, got ${rows.length}`)
  const pixels = Buffer.alloc(SIZE * SIZE * 4)
  rows.forEach((row, y) => {
    if (row.length !== SIZE) throw new Error(`${name}: row ${y} has ${row.length} pixels`)
    ;[...row].forEach((key, x) => {
      if (!(key in PALETTE)) throw new Error(`${name}: unknown colour '${key}' at ${x},${y}`)
      const hex = PALETTE[key]
      if (!hex) return
      const i = (y * SIZE + x) * 4
      pixels[i] = Number.parseInt(hex.slice(1, 3), 16)
      pixels[i + 1] = Number.parseInt(hex.slice(3, 5), 16)
      pixels[i + 2] = Number.parseInt(hex.slice(5, 7), 16)
      pixels[i + 3] = 255
    })
  })
  return pixels
}

function upscale(pixels, size, factor) {
  const out = Buffer.alloc(size * factor * size * factor * 4)
  for (let y = 0; y < size * factor; y++) {
    for (let x = 0; x < size * factor; x++) {
      const src = (Math.floor(y / factor) * size + Math.floor(x / factor)) * 4
      pixels.copy(out, (y * size * factor + x) * 4, src, src + 4)
    }
  }
  return out
}

const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})

function crc32(bytes) {
  let c = 0xffffffff
  for (const byte of bytes) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function pngChunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, crc])
}

function encodePng(width, height, rgba) {
  const header = Buffer.alloc(13)
  header.writeUInt32BE(width, 0)
  header.writeUInt32BE(height, 4)
  header[8] = 8 // bit depth
  header[9] = 6 // RGBA
  const stride = width * 4
  const scanlines = Buffer.alloc((stride + 1) * height)
  for (let y = 0; y < height; y++) rgba.copy(scanlines, y * (stride + 1) + 1, y * stride, (y + 1) * stride)
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk('IHDR', header),
    pngChunk('IDAT', deflateSync(scanlines, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ])
}

function writePng(file, width, height, rgba) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, encodePng(width, height, rgba))
}

function writePreview(file, textures) {
  const factor = 8
  const tile = SIZE * factor
  const gap = 8
  const columns = 6
  const rows = Math.ceil(textures.length / columns)
  const width = columns * (tile + gap) + gap
  const height = rows * (tile + gap) + gap
  const sheet = Buffer.alloc(width * height * 4)
  for (let i = 0; i < width * height; i++) sheet.set([0x1c, 0x28, 0x2c, 0xff], i * 4)
  textures.forEach(([, pixels], index) => {
    const big = upscale(pixels, SIZE, factor)
    const ox = gap + (index % columns) * (tile + gap)
    const oy = gap + Math.floor(index / columns) * (tile + gap)
    for (let y = 0; y < tile; y++) {
      for (let x = 0; x < tile; x++) {
        const src = (y * tile + x) * 4
        if (big[src + 3] === 0) continue
        big.copy(sheet, ((oy + y) * width + ox + x) * 4, src, src + 4)
      }
    }
  })
  writePng(file, width, height, sheet)
}

const rendered = Object.entries(TEXTURES).map(([name, rows]) => [name, toRgba(name, rows)])
for (const [name, pixels] of rendered) writePng(join(ASSETS, 'textures', `${name}.png`), SIZE, SIZE, pixels)

const iconPixels = rendered.find(([name]) => name === ICON_SOURCE)[1]
writePng(join(ASSETS, 'icon.png'), SIZE * ICON_SCALE, SIZE * ICON_SCALE, upscale(iconPixels, SIZE, ICON_SCALE))

const previewIndex = process.argv.indexOf('--preview')
if (previewIndex !== -1) writePreview(process.argv[previewIndex + 1], rendered)

console.log(`[gen-textures] wrote ${rendered.length} textures and icon.png`)
