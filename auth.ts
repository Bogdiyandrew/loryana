import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // Aici definim cum se face login-ul
      credentials: {
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Aici pui parola secretă (poate fi orice vrei tu)
        const parolaCorecta = "teiubesc"; 
        
        if (credentials.password === parolaCorecta) {
          // Dacă parola e bună, returnăm un utilizator
          return { id: "1", name: "Iubita Mea", email: "ea@love.com" }
        }
        
        // Dacă nu, returnăm null (eroare)
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login', // Pagina noastră custom de login
  },
})