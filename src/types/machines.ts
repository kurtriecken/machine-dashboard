export type Machine = {
  id: number
  name: string
  status: string
  range_min: number
  range_max: number
  history: Array<{temperature: number, timestamp: string, status: string}>
}