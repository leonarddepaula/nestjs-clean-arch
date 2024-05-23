export type UserProps = {
  name: string
  email: string
  password: string
  createAt?: Date
}

export class UserEntity {
  constructor(public readonly props: UserProps) {
    this.props.createAt = props.createAt ?? new Date()
  }
}
