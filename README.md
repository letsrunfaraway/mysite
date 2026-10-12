# mysite

A static recreation of [letsrunfaraway.com](https://www.letsrunfaraway.com/), built with plain
HTML and CSS. Every photograph and film is a placeholder, ready to be swapped for the real
media.

## Pages

| File | Page | Content |
| --- | --- | --- |
| `index.html` | About | Hero, studio statement, portrait, signature quote, featured film |
| `stills.html` | Stills | "Frames Of Life" hero and a 24 frame gallery |
| `motion.html` | Motion | "Film Projects" hero, film grid, vertical cut, commercial clients |
| `contact.html` | Contact | "Lets Work Together", email, and a contact form |

## Running it

No build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Swapping in real media

All placeholders live in `assets/img/` as SVG files sized to the ratio they stand in for.

**Photographs.** Replace the `src` on any `<img>` and keep the ratio class on its wrapper:
`ratio-32` for landscape (3:2), `ratio-23` for portrait (2:3), `ratio-169` for widescreen.
In the Stills gallery, a portrait frame uses the `span-2row` wrapper so it runs two rows tall.

**Films.** Each `.video-slot` is a poster plus a play badge, not a real player. To make one
play, replace the whole slot with a video element and keep the ratio class:

```html
<video class="ratio-169" controls playsinline poster="assets/img/your-poster.jpg">
  <source src="assets/video/your-film.mp4" type="video/mp4">
</video>
```

For hosted films, drop an `<iframe>` from YouTube or Vimeo into the same wrapper instead.

**Adding gallery frames.** Copy any `<figure>` inside `.gallery` and point it at a new image.
The live site carries 85 frames; this build ships 24 to keep the repository light.

## Contact form

The site is static, so there is no server to receive a submission. As shipped, Send opens the
visitor's mail client with the message prefilled. To collect submissions properly, point the
form at a service such as Formspree and delete the inline script at the foot of
`contact.html`:

```html
<form class="form" action="https://formspree.io/f/YOUR_ID" method="POST">
```

## Structure

```
.
├── index.html
├── stills.html
├── motion.html
├── contact.html
└── assets
    ├── css/style.css
    ├── js/main.js
    └── img/          placeholder SVGs and the logo mark
```

## Notes

Type is Inter from Google Fonts with a Helvetica fallback, standing in for the licensed Wix
faces on the live site. The logo is a placeholder compass mark, not the real vintage
adventure logo. Sections fade in on scroll, matching the original, and the whole layout is
responsive down to phone width.
