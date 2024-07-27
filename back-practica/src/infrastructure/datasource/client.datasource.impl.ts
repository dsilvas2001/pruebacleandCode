import { QueryFailedError, Repository } from "typeorm";
import { Client } from "../../data";
import {
  ClientDatasource,
  ClientEntity,
  RegisterClientDto,
} from "../../domain";
import { AppDataSource } from "./ormconfig";
import { CustomError } from "../errors/custom.error";

export class ClientDatasourceImpl implements ClientDatasource {
  private clientRepository: Repository<Client>;

  constructor() {
    this.clientRepository = AppDataSource.getRepository(Client);
  }

  /**
   *
   * @param createClientDto
   * @returns
   */
  async register(createClientDto: RegisterClientDto): Promise<ClientEntity> {
    try {
      const {
        name,
        lastname,
        identification,
        email,
        phonenumber,
        address,
        referenceaddress,
      } = createClientDto;

      const clientCreated = this.clientRepository.create({
        name: name,
        lastname: lastname,
        identification: identification,
        email: email,
        phonenumber: phonenumber,
        address: address,
        referenceaddress: referenceaddress,
      });

      await this.clientRepository.save(clientCreated);
      return clientCreated;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        if (err.driverError.code === "23505") {
          throw CustomError.badRequest(
            "A user with this identification or email already exists"
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
  /**
   *
   * @returns
   */

  async findAll(): Promise<ClientEntity[]> {
    try {
      const clients = await this.clientRepository.find();

      return clients.map(
        (client) =>
          new ClientEntity(
            client.clientid,
            client.name,
            client.lastname,
            client.identification,
            client.email,
            client.phonenumber,
            client.address,
            client.referenceaddress,
            client.createdAt
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

  /**
   *
   * @param clientId
   * @param clientUpdateDto
   * @returns
   */

  async update(
    clientId: number,
    clientUpdateDto: RegisterClientDto
  ): Promise<ClientEntity> {
    // Implementación para actualizar un cliente
    try {
      const client = await this.clientRepository.findOneBy({
        clientid: clientId,
      });
      if (!client) {
        throw CustomError.badRequest("Client not exist");
      }

      client.name = clientUpdateDto.name;
      client.lastname = clientUpdateDto.lastname;
      client.identification = clientUpdateDto.identification;
      client.email = clientUpdateDto.email;
      client.phonenumber = clientUpdateDto.phonenumber;
      client.address = clientUpdateDto.address;
      client.referenceaddress = clientUpdateDto.referenceaddress;

      await this.clientRepository.save(client);
      return client;
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }

  /**
   *
   * @param clientId
   */

  async delete(clientId: number): Promise<void> {
    try {
      const client = await this.clientRepository.findOneBy({
        clientid: clientId,
      });
      if (!client) {
        throw CustomError.badRequest("Client not exist");
      }

      await this.clientRepository.softDelete(clientId);
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }
}
