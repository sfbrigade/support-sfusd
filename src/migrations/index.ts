import * as migration_20260819_212040_opportunities_initial from './20260819_212040_opportunities_initial';

export const migrations = [
  {
    up: migration_20260819_212040_opportunities_initial.up,
    down: migration_20260819_212040_opportunities_initial.down,
    name: '20260819_212040_opportunities_initial'
  },
];
