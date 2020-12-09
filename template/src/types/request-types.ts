export interface LoginRequestType {
  params: {
    email: string
    password: string
  }
  res: {
    firstName: string
    lastName: string
    id: string
  }
}

export interface RequestTypes {
  login: LoginRequestType
}
