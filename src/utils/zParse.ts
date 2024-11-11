import { Request, Response } from "express";
import { AnyZodObject, z, ZodError } from "zod";
import { BadRequestError } from "./errors";

export async function zParse<T extends AnyZodObject>(
  req: Request,
  schema: T
): Promise<z.infer<T>> {
  try {
    return await schema.parseAsync(req);
  } catch (err) {
    console.log("zParse error", err);
    if (err instanceof ZodError) {
      throw new BadRequestError({
        message: err.errors?.[0]?.message
      });
    }

    throw new BadRequestError({
      message: err.message
    });
  }
}
