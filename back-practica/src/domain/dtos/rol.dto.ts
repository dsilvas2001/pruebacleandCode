import { Validators } from "../../infrastructure/validators/client.validator";

export class RegisterRolDto {
  private constructor(public rolName: string) {}

  /**
   *
   * @param object
   * @returns
   */
  static create(object: { [key: string]: any }): [string?, RegisterRolDto?] {
    const { rolName } = object;

    if (!rolName) return ["Missing rolname"];

    return [undefined, new RegisterRolDto(rolName)];
  }
}
