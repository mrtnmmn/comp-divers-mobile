import { Warbond } from "./Warbond"

export interface PrimaryWeapon {
  uuid: string 
  name: string
  category: string
  penetration: string
  warbond: Warbond
}