// Update this file at the end of every checkpoint, together with HANDOFF.md.

// Pinned to fabric_version in echo-technology/gradle.properties; change both together.
export const FABRIC_API = {
  version: '0.116.17+1.21.1',
  downloadUrl:
    'https://cdn.modrinth.com/data/P7dR8mSH/versions/Mys3P7lK/fabric-api-0.116.17%2B1.21.1.jar',
  pageUrl: 'https://modrinth.com/mod/fabric-api/version/0.116.17+1.21.1',
  size: '2.3 MB',
}

export const MIN_LOADER_VERSION = '0.16.0'

export type ContentEntry = { name: string; texture: string; detail: string }
export type ContentGroup = { title: string; note: string; entries: ContentEntry[] }

export const CONTENT_GROUPS: ContentGroup[] = [
  {
    title: 'Machines',
    note: 'Face you when placed, mine with a pickaxe',
    entries: [
      { name: 'Echo Reactor', texture: 'block/echo_reactor_front', detail: 'Turns fuel into Echo Energy · works in 0.2.0' },
      { name: 'Echo Fabricator', texture: 'block/echo_fabricator_front', detail: 'Makes components · works in 0.3.0' },
      { name: 'Echo Charger', texture: 'block/echo_charger_front', detail: 'Charges energy tools · works in 0.4.0' },
    ],
  },
  {
    title: 'Components',
    note: 'Used in recipes from 0.3.0',
    entries: [
      { name: 'Resonant Alloy', texture: 'item/resonant_alloy', detail: 'Base material' },
      { name: 'Echo Circuit', texture: 'item/echo_circuit', detail: 'Machine component' },
      { name: 'Energy Cell', texture: 'item/energy_cell', detail: 'Energy component' },
    ],
  },
  {
    title: 'Tools',
    note: 'Run on Echo Energy from 0.4.0',
    entries: [
      { name: 'Echo Drill', texture: 'item/echo_drill', detail: 'Energy mining tool' },
      { name: 'Echo Scanner', texture: 'item/echo_scanner', detail: 'Energy scanning tool' },
    ],
  },
  {
    title: 'Upgrades',
    note: 'Boost machines from 0.5.0',
    entries: [
      { name: 'Efficiency Upgrade', texture: 'item/efficiency_upgrade', detail: 'Lower energy use' },
      { name: 'Capacity Upgrade', texture: 'item/capacity_upgrade', detail: 'More energy storage' },
    ],
  },
]

export type Checkpoint = { version: string; title: string; notes?: string }

export const CHECKPOINTS: Checkpoint[] = [
  {
    version: '0.1.0',
    title: 'Blocks, items, textures, first download',
    notes:
      'Every block and item is in the game with its own texture. Machines can be placed and mined but do not run yet, and there are no crafting recipes, so use Creative mode for now.',
  },
  { version: '0.2.0', title: 'Echo Energy and a working Echo Reactor' },
  { version: '0.3.0', title: 'Energy transfer and the Echo Fabricator' },
  { version: '0.4.0', title: 'Echo Drill, Echo Scanner, and Echo Charger' },
  { version: '0.5.0', title: 'Upgrades and all crafting recipes' },
  { version: '0.6.0', title: 'Final textures, machine screens, particles' },
  { version: '1.0.0', title: 'Guide, changelog, full release' },
]
