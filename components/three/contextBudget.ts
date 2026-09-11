/**
 * WebGL context budget.
 *
 * Safari caps how many live WebGL contexts a page may hold and silently blanks
 * the surplus ones rather than erroring — which is why a six-up card grid
 * rendered nothing there while Chrome was happy. Viewers therefore queue for a
 * slot instead of every one of them grabbing a context on mount.
 *
 * Two modes:
 *   'hold'  — big interactive viewers keep their slot for as long as they are
 *             on screen (one per page in practice).
 *   'cycle' — card viewers take a slot, render, hand back a still image, and
 *             release so the next card can have its turn.
 */

export type SlotMode = 'hold' | 'cycle'

/** Conservative enough for Safari, still enough for a hero plus one card. */
const MAX_LIVE = 2

interface Entry {
  id: number
  mode: SlotMode
  onGrant: () => void
}

const active = new Map<number, Entry>()
let waiting: Entry[] = []
let nextId = 1

function pump() {
  while (active.size < MAX_LIVE && waiting.length > 0) {
    // 'hold' viewers are the ones the visitor is actually looking at, so they
    // jump the queue ahead of cards quietly snapshotting themselves.
    const i = waiting.findIndex(e => e.mode === 'hold')
    const entry = waiting.splice(i >= 0 ? i : 0, 1)[0]
    active.set(entry.id, entry)
    entry.onGrant()
  }
}

/**
 * Queue for a context. `onGrant` fires when one is free — possibly
 * synchronously. Returns a function that gives the slot back.
 */
export function requestSlot(mode: SlotMode, onGrant: () => void): () => void {
  const entry: Entry = { id: nextId++, mode, onGrant }
  waiting.push(entry)
  pump()

  return () => {
    if (active.delete(entry.id)) {
      pump()
      return
    }
    waiting = waiting.filter(e => e.id !== entry.id)
  }
}
