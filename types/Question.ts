import { Condition } from "./Condition"
import { Option } from "./Option"

export type Question = {
  id: string
  label: string
  type: string
  options?: Option[]
  conditions?: Condition[]
  response?: string;
}