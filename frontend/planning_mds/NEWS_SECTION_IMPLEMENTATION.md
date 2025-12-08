# News Section Implementation Guide

## Overview

The News Section ("הסיפור שנשמע" - The Story That Was Heard) displays floating animated cards representing media coverage of Etay's life and legacy. Each card links to an external news article.

---

## Component Structure

```
NewsSection.jsx (Section)
└── NewsCard.jsx (Component) x N
```

### Files Created

| File | Location | Purpose |
|------|----------|---------|
| `NewsSection.jsx` | `src/sections/` | Main section container with grid layout |
| `NewsCard.jsx` | `src/components/` | Individual floating card component |
| `news.json` | `src/assets/data/` | News data storage |

---

## Data Schema (news.json)

```json
{
  "news": [
    {
      "id": 1,                           // Unique identifier
      "channelName": "חדשות 12",          // News channel name
      "title": "Article headline",        // Article title
      "description": "Preview text...",   // Brief description
      "logoUrl": "https://...",           // Channel logo URL
      "articleUrl": "https://...",        // External article link
      "date": "2024-11-15"                // Publication date (YYYY-MM-DD)
    }
  ]
}
```

---

## Adding Real News Articles

To add real news coverage:

1. Open `src/assets/data/news.json`
2. Add a new entry to the `news` array:

```json
{
  "id": 7,
  "channelName": "Channel Name",
  "title": "Article Title in Hebrew",
  "description": "Brief preview of the article content...",
  "logoUrl": "URL to channel logo",
  "articleUrl": "https://actual-article-url.com",
  "date": "2024-12-08"
}
```

3. Save the file - the section will automatically display the new card

---

## Styling Details

### Floating Animation
Each card has a subtle floating animation with staggered timing:
- Animation duration: 4-7 seconds (varies by card index)
- Animation delay: 0-1.5 seconds (staggered)
- Movement: 6px vertical oscillation

### Hover Effects
- Transform: `translateY(-12px) scale(1.02)`
- Shadow: Enhanced from subtle to prominent
- External link icon: Fades in at top-left corner
- Logo: Subtle zoom effect

### Color Scheme
- Background: White (`#fff`)
- Channel badge: Primary blue
- Text: Standard MUI text colors
- Shadows: Soft, layered shadows

---

## Navigation

The section is accessible via:
- Header navigation: "בתקשורת" (In the Media)
- Section ID: `#news`
- Smooth scroll from header links

---

## Responsive Breakpoints

| Screen Size | Columns | Card Min Height |
|-------------|---------|-----------------|
| xs (mobile) | 1 | 320px |
| sm (tablet) | 2 | 320px |
| md+ (desktop) | 3 | 320px |

---

## Future Enhancements

- [ ] Add video embed support for video news segments
- [ ] Implement lazy loading for card images
- [ ] Add filtering by date or channel
- [ ] Consider adding a "featured" flag for prominent articles
