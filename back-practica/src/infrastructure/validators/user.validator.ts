export class UserValidators {
  /**
   *
   */
  static get username() {
    return /^[A-Za-z0-9]{8,20}$/;
  }
  /**
   *
   */
  static get password() {
    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$/;
  }
}
