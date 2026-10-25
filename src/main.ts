import { links, type IconName } from './data/links'
import { projects } from './data/projects'

const SVG_NS = 'http://www.w3.org/2000/svg'

/** Creates an `<svg><use href="#icon-…"/></svg>` referencing the sprite in the HTML. */
function createIcon(icon: IconName, className: string): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('class', className)
  svg.setAttribute('aria-hidden', 'true')

  const use = document.createElementNS(SVG_NS, 'use')
  use.setAttribute('href', `#icon-${icon}`)
  svg.append(use)

  return svg
}

function renderLinks(container: HTMLElement): void {
  for (const link of links) {
    const item = document.createElement('li')

    const anchor = document.createElement('a')
    anchor.href = link.href
    anchor.className =
      'flex items-center gap-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-lg px-4 py-3 text-sky-400 hover:text-sky-300 transition-colors font-medium'

    const label = document.createElement('span')
    label.textContent = link.label

    const labelRow = document.createElement('div')
    labelRow.className = 'flex items-center gap-2 flex-wrap'
    labelRow.append(label)

    if (link.handle !== undefined) {
      const handle = document.createElement('code')
      handle.className =
        'font-mono text-xs font-normal bg-neutral-800 text-neutral-300 rounded px-1.5 py-0.5 leading-tight'
      handle.textContent = link.handle
      labelRow.append(handle)
    }

    const details = document.createElement('div')
    details.className = 'flex-1 min-w-0'
    details.append(labelRow)

    if (link.note !== undefined) {
      const note = document.createElement('p')
      note.className = 'text-xs font-normal text-neutral-500 mt-0.5'
      note.textContent = link.note
      details.append(note)
    }

    const arrow = document.createElement('span')
    arrow.className = 'text-neutral-600 text-sm'
    arrow.textContent = '→'

    anchor.append(createIcon(link.icon, 'w-5 h-5 shrink-0'), details, arrow)
    item.append(anchor)
    container.append(item)
  }
}

function renderProjects(container: HTMLElement): void {
  for (const project of projects) {
    const item = document.createElement('li')
    item.className =
      'relative bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 flex items-center justify-between gap-4'

    const details = document.createElement('div')
    details.className = 'min-w-0'

    const title = document.createElement('span')
    title.className = 'font-medium text-neutral-100'
    title.textContent = project.name

    if (project.discontinued) {
      const titleRow = document.createElement('div')
      titleRow.className = 'flex items-center gap-2 flex-wrap'

      const badge = document.createElement('span')
      badge.className =
        'text-xs bg-amber-900/60 text-amber-400 border border-amber-700/50 rounded px-1.5 py-0.5 leading-none'
      badge.textContent = 'discontinued'

      titleRow.append(title, badge)
      details.append(titleRow)
    } else {
      details.append(title)
    }

    const description = document.createElement('p')
    description.className = 'text-xs text-neutral-500 mt-0.5'
    description.textContent = project.description

    const actions = document.createElement('div')
    actions.className = 'flex items-center gap-2 shrink-0'

    if (project.demoUrl !== undefined) {
      const demo = document.createElement('a')
      demo.href = project.demoUrl
      demo.className =
        'text-xs bg-emerald-900/60 text-emerald-400 border border-emerald-700/50 rounded px-1.5 py-0.5 leading-none hover:bg-emerald-800/60 hover:text-emerald-300 transition-colors'
      demo.textContent = 'DEMO'
      demo.setAttribute('aria-label', `${project.name} demo`)
      actions.append(demo)
    }

    const anchor = document.createElement('a')
    anchor.href = project.url
    anchor.className = 'text-neutral-600 hover:text-neutral-300 transition-colors shrink-0'
    anchor.setAttribute('aria-label', `${project.name} on GitHub`)
    anchor.append(createIcon('github', 'w-4 h-4'))
    actions.append(anchor)

    details.append(description)
    item.append(details, actions)
    container.append(item)
  }
}

function mount(selector: string, render: (container: HTMLElement) => void): void {
  const container = document.querySelector<HTMLElement>(selector)
  if (container === null) return
  render(container)
}

mount('[data-links]', renderLinks)
mount('[data-projects]', renderProjects)
