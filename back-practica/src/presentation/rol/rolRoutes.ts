import { Router } from "express";

import { RolController } from "./rolController";
import { RolDatasourceImpl } from "../../infrastructure/datasource/rol.datasource.impl";
import { RolRepositoryImpl } from "../../infrastructure/repositories/rol.repository.impl";

export class RolRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new RolDatasourceImpl();
    const rolRepositoryI = new RolRepositoryImpl(datasourceI);
    const controller = new RolController(rolRepositoryI);

    router.post("/register", controller.registerRol);

    router.get("/", controller.getAllRols);

    // router.put("/update/:id", controller.updateClient);

    // router.delete("/:id", controller.deleteClient);

    return router;
  }
}
