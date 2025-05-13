import { Faction } from "./Faction"

export interface Loadout {
  uuid: any
  name: string
  description: string
  primaryWeapon: any
  secondaryWeapon: any
  throwableDTO: any
  armor: any
  armorPassive: any
  stratagems: any
  booster: any
  faction: Faction
  user: any
}