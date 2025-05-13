import { Warbond } from "./Warbond"

export interface Booster {
  uuid: string
  name: string
  description: string
  warbond: Warbond
}