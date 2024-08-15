import { db } from "../../utils/prisma";
import { CreateMovieInput } from "./movie.schema";

export async function createMovie(data: CreateMovieInput & { ownerId: number}) {
    console.log("db --------->", db);
    return db.movie.create({
        data
    })
}
