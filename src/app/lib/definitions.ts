
import { z } from "zod";
import { JWTPayload } from 'jose';


export const SignUpSchema = z.object({
    name: z
    .string().nonempty()
    .min(2, { message: "Name must be at least 2 characters long" })
    .trim()
    ,
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must contain at least one letter and one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })  
    });

    export type FormState =
    | {
        errors?: {
          name?: string[]
          email?: string[]
          password?: string[]
          general?: string[]
        }
        message?: string
      }
    | undefined


    export interface SessionPayload extends JWTPayload {
      userId: string;
      expiresAt?: number;
      
    }

   