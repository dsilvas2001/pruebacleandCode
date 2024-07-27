import { envs } from "./config/envs";
import { AppDataSource } from "./infrastructure/datasource/ormconfig";
import { AppRoutes, Server } from "./presentation";

(async () => {
  await main();
})();

async function main() {
  await AppDataSource.initialize();

  new Server({
    port: envs.PORT || 3001,
    routes: AppRoutes.routes,
  }).start();
}
