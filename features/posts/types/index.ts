export type PostActionState = {
  errors?: {
    content?: string[]
    media?: string[]
    _form?: string[]
  }
  message?: string
  success?: boolean
}
