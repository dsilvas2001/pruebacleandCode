import { CashEntity } from "./cash.model";
import { RolEntity } from "./rol.model";
import { UserStatusEntity } from "./userstatus.model";

export class UserEntity {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public password: string,
    public userApproval: boolean,
    public dateApproval: string | null,
    public rol: RolEntity,
    public userStatus: UserStatusEntity,
    public cashes: CashEntity[]
  ) {}
}
