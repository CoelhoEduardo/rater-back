import Fastify from "fastify";
import userRoutes from "./modules/user/user.route";

const server = Fastify();

async function main() {
  server.register(userRoutes, { prefix: "api/users" });

  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server listening at http://localhost:3000");
  } catch (error) {
    console.error(error);
    process.exit(1); //as failure
  }
}

main();
