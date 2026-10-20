# Reality Movies

Static three.js walk-through, **Seeing & hearing**, served by GitHub Pages.

Live site: https://hady-dotcom.github.io/reality-movies/

three.js r160 is vendored in `vendor/` (MIT, see `vendor/three-LICENSE.txt`). No CDN and no external APIs.

## Controls

Swipe (left or up for next), scroll the wheel, tap the right or left side of the screen, use Back/Next, or the arrow keys. `?stop=N` jumps to stop N (`0` is the entrance, `21` is the end).

## Local preview

The page loads ES modules, so it has to be served over HTTP:

```
python3 -m http.server
```

Then open http://localhost:8000.
