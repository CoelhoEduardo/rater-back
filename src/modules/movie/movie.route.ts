import { FastifyInstance } from "fastify";

import { createMovieHandler } from "./movie.controller";
import { $ref } from "./movie.schema";

async function movieRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createMovieSchema"),
        response: {
          201: $ref("movieResponseSchema"),
        },
      },
    },
    createMovieHandler
  );
}

export default movieRoutes;
