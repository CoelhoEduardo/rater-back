import { db } from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const user = await db.user.create({
    data: input,
  });
}
