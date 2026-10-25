export interface Project {
  /** Project name. */
  name: string
  /** Short one-line description. */
  description: string
  /** URL of the project repository. */
  url: string
  /** Renders a "discontinued" badge next to the name. */
  discontinued?: boolean
}

/** OSS PROJECTS — add new projects here. */
export const projects: Project[] = [
  {
    name: 'Wizzy Weasel',
    description: 'Educational mini-game collection for kids (Vue 3)',
    url: 'https://github.com/datag/wizzy-weasel',
  },
  {
    name: 'RetroWriter',
    description: 'Demo writer inspired by the \'80s "lettermaker" programs',
    url: 'https://github.com/datag/retro-writer',
  },
  {
    name: 'TileWordQuiz',
    description: 'Tile word quiz game for kids (based on Tauri)',
    url: 'https://github.com/datag/tilewordquiz',
  },
  {
    name: 'Turtle Graphics',
    description: 'Simple turtle graphics demo',
    url: 'https://github.com/datag/turtle-graphics',
  },
  {
    name: 'rust-6502-emu',
    description: 'A simple 6502 emulator written in Rust',
    url: 'https://github.com/datag/rust-6502-emu',
  },
  {
    name: 'HoldingNuts',
    description: 'An open source multi-platform poker client and server',
    url: 'https://github.com/holdingnuts/holdingnuts',
    discontinued: true,
  },
  {
    name: 'jTimeSched',
    description: 'A simple and lightweight time tracking tool',
    url: 'https://github.com/datag/jtimesched',
    discontinued: true,
  },
]
