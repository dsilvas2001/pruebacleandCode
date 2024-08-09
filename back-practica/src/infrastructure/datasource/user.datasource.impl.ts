import { Admin, QueryFailedError, Repository } from "typeorm";
import { AppDataSource } from "./ormconfig";
import { CustomError } from "../errors/custom.error";
import { UserDatasource } from "../../domain/datasource/user.datasource";
import { Rol, User, UserStatus } from "../../data";
import { RegisterUserDto } from "../../domain/dtos/user.dto";
import { UserEntity } from "../../domain/models/user.model";
import { BcryptAdapter } from "../adapters/bcrypt";

type hashFunction = (password: string) => string;
type compareFunction = (password: string, hashed: string) => boolean;

export class UserDatasourceImpl implements UserDatasource {
  private userRepository: Repository<User>;
  private rolRepository: Repository<Rol>;

  constructor(
    private readonly hashPassword: hashFunction = BcryptAdapter.hash,
    private readonly comparePassword: compareFunction = BcryptAdapter.compare
  ) {
    this.userRepository = AppDataSource.getRepository(User);
    this.rolRepository = AppDataSource.getRepository(Rol);
  }

  /**
   *
   * @param createUserDto
   * @returns
   */

  async register(
    currentUserId: number,
    createUserDto: RegisterUserDto
  ): Promise<UserEntity> {
    try {
      const { username, email, password, rolId, statusId } = createUserDto;

      const rol = await this.canCreateUserRole(currentUserId, rolId);

      const userCreated = this.userRepository.create({
        username: username,
        email: email,
        password: this.hashPassword(password),
        userApproval: false,
        dateApproval: null,
        rol: rol,
        userStatus: { statusId: "AAA" },
        createdBy: { id: currentUserId } as User,
      });

      await this.userRepository.save(userCreated);
      return userCreated;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        if (err.driverError.code === "23505") {
          throw CustomError.badRequest(
            "A user with this  email already exists"
          );
        } else {
          throw CustomError.serverUnavailable(err.message);
        }
      } else if (err instanceof Error) {
        // Check if err is an instance of Error
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }

  // Función para verificar si un usuario puede crear otro usuario con un rol específico
  private async canCreateUserRole(
    currentUserId: number,
    targetRolId: number
  ): Promise<Rol> {
    // Busca el rol del usuario actual por su ID
    const currentUser = await this.userRepository.findOne({
      where: { id: currentUserId },
      relations: ["rol"],
    });
    if (!currentUser) {
      throw CustomError.badRequest("Current user not found.");
    }

    // Obtén el nombre del rol que se quiere asignar al nuevo usuario
    const targetRol = await this.rolRepository.findOne({
      where: { id: targetRolId },
    });
    if (!targetRol) {
      throw CustomError.badRequest("Target role not found.");
    }

    //
    const allowedRolesForCurrentUser: { [key: string]: string[] } = {
      Admin: ["cajero", "gestor"],
    };

    const userRoleName = currentUser.rol.rolName;
    if (allowedRolesForCurrentUser[userRoleName]) {
      if (
        allowedRolesForCurrentUser[userRoleName].includes(targetRol.rolName)
      ) {
        return targetRol;
      } else {
        // Si el rol objetivo no está permitido para el rol actual
        throw CustomError.badRequest(
          `You cannot assign the role '${targetRol.rolName}'`
        );
      }
    } else {
      throw CustomError.badRequest(
        `User role '${userRoleName}' does not have permission to assign roles`
      );
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find({
        relations: ["createdBy", "rol", "userStatus"],
      });

      return users.map(
        (user) =>
          new UserEntity(
            user.id,
            user.username,
            user.email,
            user.password,
            user.userApproval,
            user.dateApproval,
            user.rol, // Esto es un RolEntity
            user.userStatus, // Esto es un UserStatusEntity
            [] // Si hay alguna relación con 'cashes', puedes pasarla aquí
          )
      );
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }

  async update(
    userId: number,
    userUpdateDto: RegisterUserDto,
    currentUserId: number
  ): Promise<UserEntity> {
    try {
      const targetRol = await this.canCreateUserRole(
        currentUserId,
        userUpdateDto.rolId
      );
      userUpdateDto.rolId = targetRol.id;

      await this.userRepository.update(userId, {
        username: userUpdateDto.username,
        email: userUpdateDto.email,
        rol: userUpdateDto.rolId ? { id: userUpdateDto.rolId } : undefined,
      });

      const updatedUser = await this.userRepository.findOne({
        where: { id: userId },
        relations: ["rol"],
      });

      if (!updatedUser) {
        throw CustomError.badRequest("User not found");
      }

      return updatedUser;
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }

  async validator(userId: number, currentUserId: number): Promise<UserEntity> {
    try {
      await this.findUserByID(userId);
      const currentUser = await this.userRepository.findOne({
        where: { id: currentUserId },
        relations: ["rol"],
      });
      if (!currentUser) {
        console.log(currentUser);
        throw CustomError.badRequest("Current user not found.");
      }

      if (currentUser.rol.rolName == "Admin") {
        await this.userRepository.update(userId, {
          userApproval: true,
          dateApproval: new Date().toISOString(),
        });
      } else {
        throw CustomError.badRequest(
          `${currentUser.rol.rolName} can't appovid user`
        );
      }

      return currentUser;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        if (err.driverError.code === "23505") {
          throw CustomError.badRequest(
            "A user with this  email already exists"
          );
        } else {
          throw CustomError.serverUnavailable(err.message);
        }
      } else if (err instanceof Error) {
        // Check if err is an instance of Error
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }

  async delete(userId: number): Promise<void> {
    try {
      await this.findUserByID(userId);
      await this.userRepository.softDelete(userId);
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }

  async findUserByID(userId: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({
        id: userId,
      });
      console.log("Hola" + user);
      if (!user) {
        console.log("User not found"); // Añade un log adicional para verificar la condición

        throw CustomError.badRequest("User not exist");
      }
      return user;
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }
}
