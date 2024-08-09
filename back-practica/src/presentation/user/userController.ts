import { Request, Response } from "express";
import { ClientRepository, RegisterClientDto } from "../../domain";
import { CustomError } from "../../infrastructure";
import { UserRepository } from "../../domain/repositories/user.repository";
import { RegisterUserDto } from "../../domain/dtos/user.dto";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  registerUser = async (req: Request, res: Response) => {
    try {
      const { currentUserId, newUser } = req.body;

      const [error, registerUserDto] = RegisterUserDto.create(newUser);

      if (error) {
        return res.status(400).json({ error });
      }

      const user = await this.userRepository.register(
        currentUserId,
        registerUserDto!
      );

      res.status(201).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
      const { editUser, currentUserId } = req.body;

      // Validar y crear el DTO para la actualización
      const [error, updateUserDto] = RegisterUserDto.create(editUser);

      if (error) {
        return res.status(400).json({ error });
      }

      // Llamar al método de servicio o repositorio para actualizar el usuario
      const updatedUser = await this.userRepository.update(
        userId,
        updateUserDto!,
        currentUserId
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const clients = await this.userRepository.findAll();

      res.status(200).json(clients);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId); // Extraer userId de los parámetros de la URL

      await this.userRepository.delete(userId);

      res.status(200).send({ message: `User successfully deleted ${userId}` });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  validatorUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
      const { currentUserId } = req.body;
      const updatedValidator = await this.userRepository.validator(
        userId,
        currentUserId
      );
      res.status(200).json(updatedValidator);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
