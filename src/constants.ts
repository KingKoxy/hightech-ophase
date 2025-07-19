export const PAGES = {
  '/': { name: 'Start', icon: 'icon-home' },
  '/schedule': { name: 'Wochenplan', icon: 'icon-calendar' },
  '/later': { name: 'Danach', icon: 'icon-users' },
  '/links': { name: 'Links', icon: 'icon-link' }
};

export const DAY_MAP: Record<number, string> = {
  1: 'Montag',
  2: 'Dienstag',
  3: 'Mittwoch 🐸',
  4: 'Donnerstag',
  5: 'Freitag',
  6: 'Samstag',
  0: 'Sonntag'
};
