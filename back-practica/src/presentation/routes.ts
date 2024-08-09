import { Router } from "express";
import { AuthRoutes } from "./auth/authRoutes";
import { ClientRoutes } from "./client/clientRoutes";
import { UserRoutes } from "./user/userRoutes";
import { RolRoutes } from "./rol/rolRoutes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/api/auth", AuthRoutes.routes);

    router.use("/client", ClientRoutes.routes);

    router.use("/user", UserRoutes.routes);

    router.use("/rol", RolRoutes.routes);

    return router;
  }
}
