import { Router } from "express";
import { ClientRepositoryImpl } from "../../infrastructure/repositories/client.repository.impl";
import { ClientDatasourceImpl } from "../../infrastructure";
import { ClientController } from "./clientController";

export class ClientRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new ClientDatasourceImpl();
    const clientRepositoryI = new ClientRepositoryImpl(datasourceI);
    const controller = new ClientController(clientRepositoryI);

    router.post("/register", controller.registerClient);

    router.get("/", controller.getAllClients);

    router.put("/update/:id", controller.updateClient);

    router.delete("/:id", controller.deleteClient);

    return router;
  }
}
