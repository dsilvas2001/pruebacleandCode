import { Router } from "express";
import { AuthRoutes } from "./auth/authRoutes";
import { ClientRoutes } from "./client/clientRoutes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/api/auth", AuthRoutes.routes);

    router.use("/client", ClientRoutes.routes);

    return router;
  }
}
