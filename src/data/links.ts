/** Icons available in the SVG sprite defined in `index.html`. */
export type IconName = 'github' | 'linkedin' | 'xing'

export interface Link {
  /** Text shown next to the icon. */
  label: string
  /** Target URL. */
  href: string
  /** Icon from the sprite, rendered as `#icon-<name>`. */
  icon: IconName
}

export const links: Link[] = [
  {
    label: 'My GitHub Profile',
    href: 'https://github.com/datag',
    icon: 'github',
  },
  {
    label: 'Work-related GitHub (podarcis)',
    href: 'https://github.com/podarcis',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dominik-geyer-852802377/',
    icon: 'linkedin',
  },
  {
    label: 'XING',
    href: 'https://www.xing.com/profile/Dominik_Geyer4',
    icon: 'xing',
  },
]
