# Notes

## Images

- Sanity provides an [image URL builder](https://www.sanity.io/docs/presenting-images#mY9Be3Ph), but it lacks support for responsive images (`srcSet`).
- [Unpic](https://unpic.pics/) offers great responsive image handling but doesn't support Sanity-specific features like hotspots or intelligent cropping.
- Combining [Unpic](https://unpic.pics/) and Sanity’s [URL builder](https://www.sanity.io/docs/presenting-images#mY9Be3Ph) isn’t feasible, as Sanity’s cropping depends on width/height to work with hotspot data.
- While Unpic simplifies `srcSet`, it doesn’t provide a backend for generating URLs with precise cropping based on hotspots.
- The [Sanity Image](https://github.com/coreyward/sanity-image) library for React looks promising, but it only supports focal points, missing full hotspot support—quite limiting for specific cropping needs.
