import { Request, Response, Router } from "express";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/hello", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    return router;
  }
}
