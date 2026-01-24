import { handlers } from "@/auth" // Importăm setările făcute în pasul anterior

// Exportăm metodele GET și POST. 
// Asta îi permite lui NextAuth să gestioneze logarea și delogarea automat.
export const { GET, POST } = handlers