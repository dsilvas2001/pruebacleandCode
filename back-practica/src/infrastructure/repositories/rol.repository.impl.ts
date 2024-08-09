import {
  ClientDatasource,
  ClientEntity,
  RegisterClientDto,
  RolEntity,
} from "../../domain";
import { RolDatasource } from "../../domain/datasource/rol.datasource";
import { RegisterRolDto } from "../../domain/dtos/rol.dto";
import { RolRepository } from "../../domain/repositories/rol.repository";

export class RolRepositoryImpl implements RolRepository {
  constructor(private readonly rolDatasource: RolDatasource) {}

  async register(createRolDto: RegisterRolDto): Promise<RolEntity> {
    return this.rolDatasource.register(createRolDto);
  }
  async findAll(): Promise<RolEntity[]> {
    return this.rolDatasource.findAll();
  }
}
