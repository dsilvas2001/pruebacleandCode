import { QueryFailedError, Repository } from "typeorm";
import { AppDataSource } from "./ormconfig";
import { CustomError } from "../errors/custom.error";
import { UserDatasource } from "../../domain/datasource/user.datasource";
import { Rol, User, UserStatus } from "../../data";
import { RegisterUserDto } from "../../domain/dtos/user.dto";
import { UserEntity } from "../../domain/models/user.model";

// export class UserDatasourceImpl implements UserDatasource {
//   private userRepository: Repository<User>;
//   private rolRepository: Repository<Rol>; // Repositorio para roles

//   constructor() {
//     this.userRepository = AppDataSource.getRepository(User);
//     this.rolRepository = AppDataSource.getRepository(Rol);
//   }

// //   async register(
// //     userId: number,
// //     createUserDto: RegisterUserDto
// //   ): Promise<UserEntity> {
// //     try {
// //       const newUser = {
// //         username: createUserDto.username,
// //         email: createUserDto.email,
// //         password: createUserDto.password,
// //         rolId: createUserDto.rolId,
// //       };

// //       const registerUser = await this.userRepository.findOne({
// //         where: { id: userId },
// //         relations: ["rol"],
// //       });
// //       if (!registerUser) {
// //         throw CustomError.badRequest("User not exist");
// //       }
// //       const rol = await this.rolRepository.findOne({
// //         where: { id: newUser.rolId },
// //       });

// //       if (!rol) {
// //         throw CustomError.badRequest("Role not exist");
// //       }

// //       switch (registerUser.rol.rolName) {
// //         case 'ADMIN':
// //           if (rol.rolName !== 'CAJERO' && rol.rolName !== 'GESTOR') {
// //             throw CustomError.badRequest('Only admins can create cajeros and gestores');
// //           }
// //           break;
// //         case 'GESTOR':
// //           if (rol.rolName !== 'CAJERO' && rol.rolName !== 'GESTOR') {
// //             throw CustomError.badRequest('Only gestors can create cashiers and other gestors');
// //           }
// //           break;
// //         default:
// //           throw CustomError.badRequest('Only admins and gestors can create users');
// //       }

// //       const userCreated = this.userRepository.create({
// //         username: newUser.username,
// //         email: newUser.email,
// //         password: newUser.password,
// //         rol: rol,
// //         createdBy: registerUser,
// //         userApproval: false,
// //         dateApproval: null,
// //         userStatus: { statusId: 'AAA' } as UserStatus
// //       });

// //       await this.userRepository.save(userCreated);
// //       return userCreated;

// //     } catch (err) {
// //       if (err instanceof QueryFailedError) {
// //         if (err.driverError.code === "23505") {
// //           throw CustomError.badRequest(
// //             "A user with this username or email already exists"
// //           );
// //         } else {
// //           throw CustomError.serverUnavailable(err.message);
// //         }
// //       } else if (err instanceof Error) {
// //         throw CustomError.serverUnavailable(err.message);
// //       } else {
// //         throw CustomError.serverUnavailable("An unknown error occurred");
// //       }
// //     }
// //   }
// }
