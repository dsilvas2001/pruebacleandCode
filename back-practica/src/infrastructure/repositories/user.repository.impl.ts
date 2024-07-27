import {} from "../../domain";
import { UserDatasource } from "../../domain/datasource/user.datasource";
import { RegisterUserDto } from "../../domain/dtos/user.dto";
import { UserEntity } from "../../domain/models/user.model";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}

  async createUser(createUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.userDatasource.createUser(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userDatasource.findAll();
  }

  async update(
    userId: number,
    userUpdateDto: RegisterUserDto
  ): Promise<UserEntity> {
    return this.userDatasource.update(userId, userUpdateDto);
  }

  async delete(userId: number): Promise<void> {
    return this.userDatasource.delete(userId);
  }
}
