import { Warbond } from "./Warbond"

export interface SecondaryWeapon {
  uuid: string
  name: string 
  category: string 
  penetration: string
  warbond: Warbond
}