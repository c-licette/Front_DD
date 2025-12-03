export type Heading = { label: string; to: string; level: number }

/**
 * Extract headings with id attributes from a root element.
 * Returns an array of { label, to, level } where `to` is a hash link like `#id`.
 */
export function extractHeadings(root: Element | null, selector = 'h1[id], h2[id], h3[id]') {
  if (!root) return [] as Heading[]
  const nodes = Array.from(root.querySelectorAll(selector))
  const headings: Heading[] = nodes
    .map((n) => {
      const tag = n.tagName.toLowerCase()
      const level = parseInt(tag.replace('h', ''), 10) || 1
      const id = (n as HTMLElement).id || ''
      return { label: (n.textContent || '').trim(), to: id ? `#${id}` : '', level }
    })
    .filter((h) => h.label && h.to)
  return headings
}
