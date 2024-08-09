import { Request, Response } from "express";
import { ClientRepository, RegisterClientDto } from "../../domain";
import { CustomError } from "../../infrastructure";
import { RolRepository } from "../../domain/repositories/rol.repository";
import { RegisterRolDto } from "../../domain/dtos/rol.dto";

export class RolController {
  constructor(private readonly rolRepository: RolRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerRol = async (req: Request, res: Response) => {
    try {
      const [error, registerRoltDto] = RegisterRolDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }

      const rol = await this.rolRepository.register(registerRoltDto!);

      res.status(201).json(rol);
    } catch (error) {
      this.handleError(error, res);
    }
  };
  getAllRols = async (req: Request, res: Response) => {
    try {
      const rols = await this.rolRepository.findAll();

      res.status(200).json(rols);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  //   updateClient = async (req: Request, res: Response) => {
  //     try {
  //       const clientId = parseInt(req.params.id, 10);
  //       const [error, clientUpdateDto] = RegisterClientDto.create(req.body);

  //       if (error) {
  //         return res.status(400).json({ error });
  //       }

  //       const updatedClient = await this.clientRepository.update(
  //         clientId,
  //         clientUpdateDto!
  //       );
  //       res.status(200).json(updatedClient);
  //     } catch (error) {
  //       this.handleError(error, res);
  //     }
  //   };

  //   deleteClient = async (req: Request, res: Response) => {
  //     try {
  //       const clientId = parseInt(req.params.id, 10);

  //       await this.clientRepository.delete(clientId);

  //       res.status(200).json({ message: "Client successfully deleted" });
  //     } catch (error) {
  //       this.handleError(error, res);
  //     }
  //   };
}
