import { Validators } from "../../infrastructure/validators/client.validator";

export class RegisterClientDto {
  private constructor(
    public name: string,
    public lastname: string,
    public identification: string,
    public email: string,
    public phonenumber: string,
    public address: string,
    public referenceaddress: string
  ) {}

  /**
   *
   * @param object
   * @returns
   */
  static create(object: { [key: string]: any }): [string?, RegisterClientDto?] {
    const {
      name,
      lastname,
      identification,
      email,
      phonenumber,
      address,
      referenceaddress,
    } = object;

    if (!name) return ["Missing name"];
    if (!lastname) return ["Missing lastname"];

    if (!Validators.identification.test(identification))
      return ["Identification must be between 10 and 13 digits and numeric"];

    if (!email) return ["Missing email"];
    if (!Validators.email.test(email)) return ["Email is not valid"];

    if (!Validators.phoneNumber.test(phonenumber))
      return ["Phone number must start with 09 and contain at least 10 digits"];

    if (!Validators.address(address.length))
      return ["Address must be between 20 and 100 characters"];

    if (!Validators.referenceAddress(referenceaddress.length))
      return ["Reference address must be between 20 and 100 characters"];

    return [
      undefined,
      new RegisterClientDto(
        name,
        lastname,
        identification,
        email,
        phonenumber,
        address,
        referenceaddress
      ),
    ];
  }
}
