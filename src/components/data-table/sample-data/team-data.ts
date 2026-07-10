export type Team = {
  id: string
  name: string
  members: number
  lead: string
}

export const teams: Team[] = [
  {
    id: "1",
    name: "Engineering",
    members: 35,
    lead: "Amina Jibril",
  },
  {
    id: "2",
    name: "Finance",
    members: 18,
    lead: "Emeka Okafor",
  },
]