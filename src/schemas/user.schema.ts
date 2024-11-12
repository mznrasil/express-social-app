import { z } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    UserSchema:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const UserSchema = z.object({
  user: z.object(
    {
      id: z.coerce.number(),
      iat: z.number(),
      exp: z.number()
    },
    {
      required_error: "User is required"
    }
  )
});
export type IUserSchema = z.infer<typeof UserSchema>;

export const RegisterUserSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: "Username is required" })
      .min(3, "Username must be 3 characters long"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid Email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters long")
      .refine(
        (value) => /[A-Z]/.test(value),
        "Password must contain at least 1 uppercase letter"
      )
      .refine(
        (value) => /[0-9]/.test(value),
        "Password must contain at least 1 number"
      )
      .refine(
        (value) => /[^A-Za-z0-9]/.test(value),
        "Password must contain at least 1 symbol"
      )
  })
});
export type IRegisterUserSchema = z.infer<typeof RegisterUserSchema>;

export const LoginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid Email"),
    password: z.string({ required_error: "Password is required" })
  })
});
export type ILoginuserSchema = z.infer<typeof LoginUserSchema>;

export const RefreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string({ required_error: "Refresh Token is required" })
  })
});
export type IRefreshTokenSchema = z.infer<typeof RefreshTokenSchema>;

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserSchema:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *
 *    RegisterUserSchema:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *
 *    RefreshUserSchema:
 *      type: object
 *      properties:
 *        refreshToken:
 *          type: string
 *
 *  examples:
 *    RegisterUserResponseExample:
 *      summary: Register User Response
 *      value:
 *        data: null
 *        message: User Registered Successfully
 *        status: 201
 */
