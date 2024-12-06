export type UserGroupType = {
  id: number
  name: string
}

export type UserType = {
  id: number
  email: string
  full_name: string
  profile: string
  phone: string
  groups: UserGroupType[]
  account: number
}

export interface CreateUserDataType {
  full_name: string
  email: string
  groups: number[]
}

export interface EditUserDataType {
  full_name: string
  groups: number[]
}
