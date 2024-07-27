import { RegisterClientDto } from "../dtos/client.dto";
import { ClientEntity } from "../models/client.model";

export abstract class ClientRepository {
  abstract register(
    registerClientDto: RegisterClientDto
  ): Promise<ClientEntity>;

  abstract findAll(): Promise<ClientEntity[]>;

  abstract update(
    clientId: number,
    clientUpdateDto: RegisterClientDto
  ): Promise<ClientEntity>;

  abstract delete(clientId: number): Promise<void>;
}
