# Share Image API — Frontend Guide

## Endpoint

```
GET /api/readings/share-image/:readingId
GET /api/readings/share-image/:readingId?mode=story
```

### Query Parameters

| Param | Values | Default | Description |
|-------|--------|---------|-------------|
| `mode` | `feed` \| `story` | `feed` | `feed` = 1080×1080 square (Instagram feed, Twitter, etc.) `story` = 1080×1920 tall (Instagram Story, Facebook Story) |

---

## How to Use

Call this endpoint with the `readingId` of a **completed** reading that has an AI interpretation.
The response is a raw PNG image — not JSON.

### Example (fetch)

```js
const readingId = 42

// Feed (square)
const response = await fetch(`/api/readings/share-image/${readingId}`)

// Story (tall)
const response = await fetch(`/api/readings/share-image/${readingId}?mode=story`)

if (!response.ok) {
  const error = await response.json()
  console.error(error.message)
  return
}

// Convert the PNG to a blob URL for display or download
const blob = await response.blob()
const imageUrl = URL.createObjectURL(blob)
```

### Show the image in the browser

```jsx
<img src={imageUrl} alt="Your tarot reading" />
```

### Let the user download it

```js
const a = document.createElement('a')
a.href = imageUrl
a.download = `reading-${readingId}.png`
a.click()
```

### Let the user share it (Web Share API)

```js
const file = new File([blob], `reading-${readingId}.png`, { type: 'image/png' })

if (navigator.canShare?.({ files: [file] })) {
  await navigator.share({
    files: [file],
    title: 'ไพ่ทาโรต์ของฉัน',
    text: 'ดูการอ่านไพ่ของฉันจาก BigBode'
  })
}
```

> The Web Share API works on mobile browsers (iOS Safari, Android Chrome) and lets users share directly to LINE, Instagram, X, etc.

---

## Image sizes

| Mode | Size | Use case |
|------|------|----------|
| `feed` (default) | 1080×1080px | Instagram feed, Twitter, Facebook post |
| `story` | 1080×1920px | Instagram Story, Facebook Story, TikTok |

Both modes share the same layout and white & gold minimal theme:
- White-to-cream gradient background
- Double gold border frame
- All content (header, cards, summary, mood bar) drawn top-down
- Story mode has extra whitespace below the content

---

## What the image contains

| Section | Content |
|---------|---------|
| Branding | "B I G B O D E" in gold at the top |
| Header | Spread name + user's question |
| Cards | Card images with gold borders, names, reversed state "(กลับหัว)" |
| Summary | AI interpretation summary (Thai) |
| Mood bar | Energy score out of 100 (`████████░░ 80/100`) |
| Watermark | "BigBode" bottom-right |

---

## Error responses (JSON)

| Status | Reason |
|--------|--------|
| `400` | Invalid reading ID, reading not completed, or no AI interpretation yet |
| `404` | Reading not found |

```js
// Error shape
{ success: false, message: "..." }
```

---

## Notes

- No auth token required — the endpoint uses `optionalAuth`
- Response is cached for 1 hour (`Cache-Control: public, max-age=3600`)
- Generate the image only after AI interpretation is complete (after `POST /api/readings/ai-interpret` succeeds)
- Invalid `mode` values fall back to `feed` silently
