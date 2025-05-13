import { Warbond } from "./Warbond"

export interface Stratagem { 
  uuid: string
  name: string
  category: string
  warbond: Warbond
}