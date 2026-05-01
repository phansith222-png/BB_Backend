# Plan: Generate Share Image for Tarot Reading

## Context
Users want to share their completed tarot readings (with AI interpretation) to social media. The backend needs a new endpoint that generates a 1080×1080 PNG image containing the drawn cards, AI summary text (Thai), and a mood score bar — ready to post to Instagram, LINE, X, etc.

No existing image/export functionality exists in the project.

---

## Approach: `canvas` (node-canvas) + new GET endpoint

**Why canvas:** Lightweight native module. Supports Thai text via `.ttf` font registration. No headless browser needed. Returns a PNG `Buffer` directly.

---

## Implementation Steps

### 1. Install dependency
Add to `package.json` dependencies:
```
"canvas": "^2.11.2"
```
Run `npm install canvas`. Requires build tools on Windows (GTK2); requires `libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev` on Linux/Docker.

### 2. Add Thai font
Place `Sarabun-Regular.ttf` and `Sarabun-Bold.ttf` at:
```
src/assets/fonts/Sarabun-Regular.ttf
src/assets/fonts/Sarabun-Bold.ttf
```
Download from Google Fonts (Sarabun family). Register at module load time in `imageGenerator.js` — not per-request.

### 3. New service function
**File:** `src/services/reading.service.js`

Add `findReadingForShare(readingId)` — Prisma query with deep include:
```
Reading → spread { name, spreadType { typeName } }
        → readCards (order by position) { isReversed, card { name, img_url } }
        → aiInterpretation { summary, mood_score }
```

### 4. New utility
**File:** `src/utils/imageGenerator.js` (new file)

Exports one async function: `generateShareImageBuffer(reading) → Buffer`

Internal drawing order on a 1080×1080 canvas:
1. `drawBackground` — dark purple-to-black gradient
2. `drawHeaderText` — spread name (bold 36px) + question (28px), centered, with Thai word-wrap
3. `fetchCardImages` — `Promise.all(fetch each card.img_url)` in parallel → canvas `Image[]`; null on failure (renders placeholder rectangle)
4. `drawCards` — layout adapts to card count:
   - 1–3 cards: single row, cardWidth=180px
   - 4–5 cards: reduce cardWidth=140px or split into 2 rows
   - Reversed cards: rotate 180° around card center; draw "(กลับหัว)" label below in amber
5. `drawSummary` — AI summary text, 22px Sarabun, centered, semi-transparent backdrop
6. `drawMoodBar` — `"พลังงาน: ████████░░ 78/100"` using Unicode blocks, 24px, gold color
7. `drawBranding` — "BigBode" small text bottom-right, semi-transparent white

### 5. New controller function
**File:** `src/controllers/reading.controller.js`

Add `export async function generateShareImage(req, res, next)`:
1. Parse `req.params.readingId` → `Number`; if NaN → `next(createHttpErrors[400]('Invalid reading ID'))`
2. `findReadingForShare(readingId)` → if null → 404
3. Validate `status === 'COMPLETED'` → else 400
4. Validate `aiInterpretation` exists → else 400
5. `const buffer = await generateShareImageBuffer(reading)`
6. `res.set('Content-Type', 'image/png')`
7. `res.set('Cache-Control', 'public, max-age=3600')`
8. `res.send(buffer)`

Note: returns raw PNG binary, not `res.json()` — intentional deviation from standard controller pattern.

### 6. New route
**File:** `src/routes/reading.routes.js`

Add one line:
```js
readingRoutes.get('/share-image/:readingId', optionalAuth, generateShareImage)
```
Add `generateShareImage` to the import from the controller.

---

## Critical Files

| Action | File |
|--------|------|
| New | `src/utils/imageGenerator.js` |
| New | `src/assets/fonts/Sarabun-Regular.ttf` |
| New | `src/assets/fonts/Sarabun-Bold.ttf` |
| Modify | `src/services/reading.service.js` |
| Modify | `src/controllers/reading.controller.js` |
| Modify | `src/routes/reading.routes.js` |
| Modify | `package.json` |

---

## API

```
GET /api/readings/share-image/:readingId
```
- No auth required (`optionalAuth`)
- Reading must be `COMPLETED` with an `aiInterpretation`
- Response: `200 image/png` binary (~200–400KB)
- Errors: `400` (invalid ID / not completed / no interpretation), `404` (not found)

---

## Verification

1. `npm install canvas` completes without errors
2. Thai font renders: quick script draws "ทดสอบ" and saves PNG — no tofu boxes
3. `GET /api/readings/share-image/:id` with a COMPLETED reading → 200 + PNG binary
4. Reversed card shows rotated image + "(กลับหัว)" label
5. 1, 3, and 5 card readings all layout correctly without overflow
6. Invalid ID → 400 JSON; not-found ID → 404 JSON; non-COMPLETED reading → 400 JSON
7. Broken `img_url` → placeholder renders, still returns 200 PNG (no crash)
8. Response has `Content-Type: image/png` and `Cache-Control: public, max-age=3600`
