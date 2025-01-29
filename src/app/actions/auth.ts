'use server'

import prisma from "@/db/db";
import { FormState, SignUpSchema } from "../lib/definitions";
import { createSession } from "@/app/lib/session";
import { deleteSession } from '@/app/lib/session'
import { redirect } from "next/navigation";
import bcrypt from 'bcryptjs';


export async function signup(state: FormState, formData: FormData) {

      // 1. Validate form fields

    const validatedFields = SignUpSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    console.log('form data:', formData.get("name"))
    console.log('validated fields:', validatedFields)
    console.log('formData:', formData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { name, email, password } = validatedFields.data;
    console.log('name:', name)

    try {
        //2. Check if email is already in use
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return {
                errors: { email: ["Email already exists."] },
            };
        }

//  Insert the user into the database
        //3. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //4. Create the new user
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
            select: { id: true },
        });

    console.log('new user:', newUser)
    console.log('new user id:', newUser.id)
    if (!newUser || !newUser.id) {
        throw new Error("Failed to create session: User creation failed or ID is invalid.");
    }

        // 5. Create user session

    await createSession(newUser.id.toString())

    // 5. Redirect user
      
    } catch (error) {
        console.error("Error during user signup:", error);        

        return {
            errors: { general: ["An unexpected error occurred. Please try again."] },
        };
    }

    return redirect('/signin');


}

export async function logout() {
    await deleteSession()
    redirect('/login')
  }
