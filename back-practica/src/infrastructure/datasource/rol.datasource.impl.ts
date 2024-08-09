import { QueryFailedError, Repository } from "typeorm";
import { Client, Rol } from "../../data";
import {
  ClientDatasource,
  ClientEntity,
  RegisterClientDto,
} from "../../domain";
import { AppDataSource } from "./ormconfig";
import { CustomError } from "../errors/custom.error";
import { RolDatasource } from "../../domain/datasource/rol.datasource";
import { RegisterRolDto } from "../../domain/dtos/rol.dto";

export class RolDatasourceImpl implements RolDatasource {
  private rolRepository: Repository<Rol>;

  constructor() {
    this.rolRepository = AppDataSource.getRepository(Rol);
  }

  /**
   *
   * @param createRolDto
   * @returns
   */
  async register(createRolDto: RegisterRolDto): Promise<Rol> {
    try {
      const { rolName } = createRolDto;

      const rolCreated = this.rolRepository.create({
        rolName: rolName,
      });

      await this.rolRepository.save(rolCreated);
      return rolCreated;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        if (err.driverError.code === "23505") {
          throw CustomError.badRequest("There is already a role");
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

  /**
   *
   * @returns
   */

  async findAll(): Promise<Rol[]> {
    try {
      return await this.rolRepository.find();
    } catch (err) {
      throw CustomError.serverUnavailable("Unable to retrieve roles");
    }
  }
}
