export class UserCreated {
  constructor(
    public readonly userId: string,
    public readonly email: string,
  ) {}
}
