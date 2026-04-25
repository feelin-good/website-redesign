let _cache: Promise<typeof import('animejs')> | null = null

export function loadAnime() {
  if (!_cache) _cache = import('animejs')
  return _cache
}
