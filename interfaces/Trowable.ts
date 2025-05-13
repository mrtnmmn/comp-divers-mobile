import { Warbond } from "./Warbond"

export interface Throwable { 
  uuid: string
  name: string
  category: string
  penetration: string
  warbond: Warbond
}