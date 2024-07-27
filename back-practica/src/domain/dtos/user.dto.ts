import { UserValidators } from "../../infrastructure/validators/user.validator";

export class RegisterUserDto {
  private constructor(
    public username: string,
    public email: string,
    public password: string,
    public userApproval: boolean,
    public dateApproval: string | null,
    public rolId: number,
    public statusId: string,
    public cashIds: number[]
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const {
      username,
      email,
      password,
      userApproval,
      dateApproval,
      rolId,
      statusId,
      cashIds,
    } = object;

    if (!username) return ["Missing username"];
    if (!UserValidators.username.test(username)) return ["Invalid username"];

    if (!email) return ["Missing email"];

    if (!password) return ["Missing password"];
    if (!UserValidators.password.test(password)) return ["Invalid password"];

    return [
      undefined,
      new RegisterUserDto(
        username,
        email,
        password,
        userApproval,
        dateApproval,
        rolId,
        statusId,
        cashIds
      ),
    ];
  }
}
