import {
  ClientDatasource,
  ClientEntity,
  ClientRepository,
  RegisterClientDto,
} from "../../domain";

export class ClientRepositoryImpl implements ClientRepository {
  constructor(private readonly clientDatasource: ClientDatasource) {}

  async register(createClientDto: RegisterClientDto): Promise<ClientEntity> {
    return this.clientDatasource.register(createClientDto);
  }
  async findAll(): Promise<ClientEntity[]> {
    return this.clientDatasource.findAll();
  }

  async update(
    clientId: number,
    clientUpdateDto: RegisterClientDto
  ): Promise<ClientEntity> {
    return this.clientDatasource.update(clientId, clientUpdateDto);
  }

  async delete(clientId: number): Promise<void> {
    return this.clientDatasource.delete(clientId);
  }
}
