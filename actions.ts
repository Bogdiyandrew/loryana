"use server"
import { signIn } from "@/auth"

export async function loginAction(formData: FormData) {
    await signIn("credentials", {
        password: formData.get("password"),
        redirectTo: "/",
    })
}