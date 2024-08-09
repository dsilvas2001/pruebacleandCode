import { RegisterRolDto } from "../dtos/rol.dto";
import { RolEntity } from "../models/rol.model";

export abstract class RolDatasource {
  abstract register(registerRolDto: RegisterRolDto): Promise<RolEntity>;

  abstract findAll(): Promise<RolEntity[]>;
}
