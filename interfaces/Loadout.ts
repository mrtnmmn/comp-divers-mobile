import { Faction } from "./Faction"

export interface Loadout {
  uuid: string
  name: string
  description: string
  primaryWeapon: string
  secondaryWeapon: string
  throwableDTO: string
  armor: string
  armorPassive: string
  stratagems: string
  booster: string
  faction: Faction
  user: string
}