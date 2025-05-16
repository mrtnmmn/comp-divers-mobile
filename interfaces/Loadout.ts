import { Armor } from "./Armor"
import { ArmorPassive } from "./ArmorPassive"
import { Booster } from "./Booster"
import { Faction } from "./Faction"
import { PrimaryWeapon } from "./PrimaryWeapon"
import { SecondaryWeapon } from "./SecondaryWeapon"
import { Stratagem } from "./Stratagem"
import { Throwable } from "./Trowable"
import { User } from "./User"

export interface Loadout {
  uuid: string
  name: string
  description: string
  primaryWeapon: PrimaryWeapon
  secondaryWeapon: SecondaryWeapon
  throwable: Throwable
  armor: Armor
  armorPassive: ArmorPassive
  stratagems: Stratagem[]
  booster: Booster
  faction: Faction
  user: User
  creationDate: Date
}

export interface LoadoutForm {
  name: string 
  description: string
  armor: Armor | null
  armorPassive: ArmorPassive | null
  primaryWeapon: PrimaryWeapon | null
  secondaryWeapon: SecondaryWeapon | null
  throwable: Throwable | null
  stratagems: Stratagem[]
  booster: Booster | null
  faction: Faction | null
}


export interface LoadoutRequest {
  name: string
  description: string
  primaryWeapon: string
  secondaryWeapon: string
  throwable: string
  armor: string
  armorPassive: string
  stratagems: string[]
  booster: string
  faction: string
}

export interface LoadoutPageable {
  content: Loadout[]
}