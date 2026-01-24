import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // AICI AM MODIFICAT: Citim din variabila de mediu, nu scriem direct
        const parolaCorecta = process.env.APP_PASSWORD;

        // Verificăm dacă parola introdusă este egală cu cea din .env
        if (credentials.password === parolaCorecta) {
          return { id: "1", name: "Iubita Mea", email: "ea@love.com" }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
})