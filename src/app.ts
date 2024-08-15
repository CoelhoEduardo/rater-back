import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import movieRoutes from "./modules/movie/movie.route";

const server = Fastify();

server.register(fjwt, {
  secret: process.env.JWT_SECRET || "some-secret-key",
});

server.addHook("preHandler", (req, res, next) => {
  req.jwt = server.jwt;
  return next();
});

server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies.access_token;

    if (!token) {
      return reply.status(401).send({ message: "Atuhentication required" });
    }

    const decoded = request.jwt.verify<FastifyJWT["user"]>(token);
    request.user = decoded;
  }
);

server.register(fCookie, {
  secret: process.env.COOKIE_SECRET || "some-secret-key",
  hook: "preHandler",
});

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });
  server.register(movieRoutes, { prefix: "api/movies " });

  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server listening at http://localhost:3000");
  } catch (error) {
    console.error(error);
    process.exit(1); //as failure
  }
}

main();

// ├── src
// │  ├── app.ts
// │  ├── modules
// │  │  ├── movie
// │  │  └── user
// │  │    ├── user.route.ts
// │  │    ├── user.schema.ts
// │  │    ├── user.controller.ts
// │  │    └── user.service.ts
// │  └── utils
// │     ├── hash.ts
// │     └── prisma.ts
// ├── prisma
// │  └── schema.prisma
// ├── package.json
// ├── tsconfig.json
// ├── global.d.ts
// └── .env
