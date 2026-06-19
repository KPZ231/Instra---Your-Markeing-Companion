export interface ChangeUsernameState {
  errors?: { username?: string[]; _form?: string[] }
  success?: boolean
  remaining?: number
}

export interface DeleteAccountState {
  errors?: { confirm?: string[]; _form?: string[] }
  success?: boolean
}
