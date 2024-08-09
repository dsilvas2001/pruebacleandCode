import { Request, Response, Router } from "express";
import { UserController } from "./userController";
import { UserDatasourceImpl } from "../../infrastructure/datasource/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new UserDatasourceImpl();
    const userRepositoryI = new UserRepositoryImpl(datasourceI);
    const controller = new UserController(userRepositoryI);

    router.post("/register", controller.registerUser);

    router.get("/", controller.getAllUsers);

    router.put("/update/:userId", controller.updateUser);

    router.put("/validator/:userId", controller.validatorUser);

    router.delete("/:userId", controller.deleteUser);

    return router;
  }
}
