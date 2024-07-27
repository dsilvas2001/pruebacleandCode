import { RegisterUserDto } from "../dtos/user.dto";
import { UserEntity } from "../models/user.model";

export abstract class UserDatasource {
  abstract createUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract update(
    userId: number,
    userUpdateDto: RegisterUserDto
  ): Promise<UserEntity>;
  abstract delete(userId: number): Promise<void>;
}
