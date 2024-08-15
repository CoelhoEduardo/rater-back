import { FastifyReply, FastifyRequest } from "fastify";

import { CreateMovieInput } from "./movie.schema";
import { createMovie } from "./movie.service";

export async function createMovieHandler (
    request: FastifyRequest<{
        Body: CreateMovieInput
    }>,
    reply: FastifyReply
) {
    const movie = await createMovie({
        ...request.body,
        ownerId: request.user.id
    })

    return movie;
}
