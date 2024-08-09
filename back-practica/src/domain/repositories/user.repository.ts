import { RegisterUserDto } from "../dtos/user.dto";
import { UserEntity } from "../models/user.model";

export abstract class UserRepository {
  abstract register(
    currentUserId: number,
    registerUserDto: RegisterUserDto
  ): Promise<UserEntity>;

  abstract findAll(): Promise<UserEntity[]>;

  abstract update(
    userId: number,
    userUpdateDto: RegisterUserDto,
    currentUserId: number
  ): Promise<UserEntity>;

  abstract delete(userId: number): Promise<void>;

  abstract validator(
    userId: number,
    currentUserId: number
  ): Promise<UserEntity>;
}
