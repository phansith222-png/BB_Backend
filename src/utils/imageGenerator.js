import { createCanvas, GlobalFonts, loadImage } from '@napi-rs/canvas'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const FONT_REG = join(__dirname, '../assets/fonts/Sarabun-Regular.ttf')
const FONT_BOLD = join(__dirname, '../assets/fonts/Sarabun-Bold.ttf')
if (existsSync(FONT_REG)) GlobalFonts.registerFromPath(FONT_REG, 'Sarabun')
if (existsSync(FONT_BOLD)) GlobalFonts.registerFromPath(FONT_BOLD, 'SarabunBold')

const W = 1080
const CANVAS_H = { feed: 1080, story: 1920 }
const FONT = 'Sarabun, Arial, sans-serif'
const FONT_BOLD_STR = 'SarabunBold, Sarabun, Arial, sans-serif'

const THEME = {
    gold: '#C8A84B',
    goldFaint: 'rgba(200,168,75,0.25)',
    goldDivider: 'rgba(200,168,75,0.4)',
    textDark: '#1C1C1C',
    textMid: '#333333',
    textMuted: '#666666',
    textBrand: 'rgba(0,0,0,0.3)',
    cardPlaceholderBg: '#F5F0E8',
    cardPlaceholderMark: 'rgba(200,168,75,0.5)',
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function wrapLines(ctx, text, maxWidth) {
    const { lines, current } = text.split(' ').reduce(
        ({ lines, current }, word) => {
            const test = current ? `${current} ${word}` : word
            if (ctx.measureText(test).width > maxWidth && current) {
                return { lines: [...lines, current], current: word }
            }
            return { lines, current: test }
        },
        { lines: [], current: '' }
    )
    return current ? [...lines, current] : lines
}

async function fetchCardImage(url) {
    try {
        const res = await fetch(url, {
            signal: AbortSignal.timeout(10000),
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; BigBode/1.0)',
                'Referer': new URL(url).origin + '/',
            },
        })
        if (!res.ok) return null
        return await loadImage(Buffer.from(await res.arrayBuffer()))
    } catch {
        return null
    }
}

function setText(ctx, text, color, font, x, y) {
    ctx.fillStyle = color
    ctx.font = font
    ctx.fillText(text, x, y)
}

// Draws lines of text centered at x=W/2, returns next y position
function drawTextLines(ctx, lines, maxLines, lineHeight, y) {
    lines.slice(0, maxLines).forEach((line, i) => {
        ctx.fillText(line, W / 2, y + i * lineHeight)
    })
    return y + Math.min(lines.length, maxLines) * lineHeight
}

// ─── Section Drawers (each returns the next y position) ───────────────────────

function drawBackground(ctx, H) {
    const gradient = ctx.createLinearGradient(0, 0, 0, H)
    gradient.addColorStop(0, '#FFFFFF')
    gradient.addColorStop(1, '#FAF7F2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, W, H)
}

function drawFrame(ctx, H) {
    ctx.strokeStyle = THEME.gold
    ctx.lineWidth = 3
    ctx.strokeRect(28, 28, W - 56, H - 56)

    ctx.strokeStyle = THEME.goldFaint
    ctx.lineWidth = 1
    ctx.strokeRect(36, 36, W - 72, H - 72)
}

function drawDivider(ctx, y) {
    ctx.strokeStyle = THEME.goldDivider
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(80, y)
    ctx.lineTo(W - 80, y)
    ctx.stroke()
    return y + 30
}

function drawHeader(ctx, spreadName, question, y) {
    ctx.textAlign = 'center'

    setText(ctx, 'B I G B O D E', THEME.gold, `16px ${FONT}`, W / 2, y)
    y += 36

    setText(ctx, spreadName, THEME.textDark, `bold 32px ${FONT_BOLD_STR}`, W / 2, y)
    y += 50

    if (question) {
        ctx.fillStyle = THEME.textMuted
        ctx.font = `24px ${FONT}`
        y = drawTextLines(ctx, wrapLines(ctx, `"${question}"`, 860), 3, 34, y)
    }

    return y + 20
}

function drawCard(ctx, img, x, y, w, h, isReversed) {
    ctx.save()

    if (isReversed) {
        ctx.translate(x + w / 2, y + h / 2)
        ctx.rotate(Math.PI)
        ctx.translate(-(x + w / 2), -(y + h / 2))
    }

    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.clip()
    if (img) {
        ctx.drawImage(img, x, y, w, h)
    } else {
        ctx.fillStyle = THEME.cardPlaceholderBg
        ctx.fillRect(x, y, w, h)
        ctx.fillStyle = THEME.cardPlaceholderMark
        ctx.font = `32px ${FONT}`
        ctx.textAlign = 'center'
        ctx.fillText('?', x + w / 2, y + h / 2 + 12)
    }
    ctx.restore()

    ctx.strokeStyle = THEME.gold
    ctx.lineWidth = 2
    ctx.strokeRect(x, y, w, h)

    ctx.restore()
}

function drawCardLabel(ctx, rc, x, cardTop, cardW, cardH) {
    ctx.textAlign = 'center'
    setText(ctx, rc.card.name, THEME.textDark, `16px ${FONT}`, x + cardW / 2, cardTop + cardH + 22)

    if (rc.isReversed) {
        setText(ctx, '(กลับหัว)', THEME.gold, `14px ${FONT}`, x + cardW / 2, cardTop + cardH + 40)
    }
}

function drawCardRow(ctx, readCards, cardImages, y) {
    const count = readCards.length
    const cardW = count <= 2 ? 200 : count <= 3 ? 180 : 150
    const cardH = Math.round(cardW * 1.75)
    const gap = 30
    const totalW = cardW * count + gap * (count - 1)
    const startX = Math.max(40, (W - totalW) / 2)

    readCards.forEach((rc, i) => {
        const x = startX + i * (cardW + gap)
        drawCard(ctx, cardImages[i], x, y, cardW, cardH, rc.isReversed)
        drawCardLabel(ctx, rc, x, y, cardW, cardH)
    })

    const hasReversed = readCards.some(rc => rc.isReversed)
    return Math.max(y + cardH + (hasReversed ? 60 : 42), 680)
}

function drawSummary(ctx, summary, y) {
    ctx.fillStyle = THEME.textMid
    ctx.font = `23px ${FONT}`
    ctx.textAlign = 'center'
    y += 10
    return drawTextLines(ctx, wrapLines(ctx, summary, 880), 5, 34, y)
}

function drawMoodBar(ctx, score, y) {
    const barW = 320
    const barH = 14
    const barX = (W - barW) / 2
    const radius = 7

    ctx.fillStyle = THEME.textMuted
    ctx.font = `18px ${FONT}`
    ctx.textAlign = 'center'
    ctx.fillText(`พลังงาน ${score}/100`, W / 2, y)

    const trackY = y + 12

    ctx.fillStyle = 'rgba(200,168,75,0.18)'
    ctx.beginPath()
    ctx.roundRect(barX, trackY, barW, barH, radius)
    ctx.fill()

    const filledW = Math.max(radius * 2, Math.round((score / 100) * barW))
    const grad = ctx.createLinearGradient(barX, 0, barX + filledW, 0)
    grad.addColorStop(0, '#C8A84B')
    grad.addColorStop(1, '#E8C96B')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.roundRect(barX, trackY, filledW, barH, radius)
    ctx.fill()
}

function drawWatermark(ctx, H) {
    ctx.textAlign = 'right'
    setText(ctx, 'BigBode', THEME.textBrand, `16px ${FONT}`, W - 50, H - 44)
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export async function generateShareImageBuffer(reading, mode = 'feed') {
    const H = CANVAS_H[mode] ?? CANVAS_H.feed
    const canvas = createCanvas(W, H)
    const ctx = canvas.getContext('2d')

    const cardImages = await Promise.all(
        reading.readCards.map(rc => fetchCardImage(rc.card.img_url))
    )

    drawBackground(ctx, H)
    drawFrame(ctx, H)

    let y = 80
    y = drawHeader(ctx, reading.spread?.name ?? '', reading.question, y)
    y = drawDivider(ctx, y)
    y = drawCardRow(ctx, reading.readCards, cardImages, y)
    y = drawDivider(ctx, y)

    if (reading.aiInterpretation?.summary) {
        y = drawSummary(ctx, reading.aiInterpretation.summary, y)
    }

    const score = Math.round(reading.aiInterpretation?.mood_score ?? 0)
    drawMoodBar(ctx, score, y + 36)
    drawWatermark(ctx, H)

    return canvas.toBuffer('image/png')
}
