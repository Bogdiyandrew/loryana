import { auth, signOut } from "@/auth"

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8">
      <h1 className="text-5xl font-bold text-rose-600 mb-6">
        Te iubesc, {session?.user?.name}! 💖
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl text-center">
        Bine ai venit pe site-ul nostru. Aici o să punem toate amintirile noastre.
      </p>

      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button className="rounded-full bg-gray-100 px-6 py-2 font-medium text-gray-900 hover:bg-gray-200 transition">
          Ieșire din cont
        </button>
      </form>
    </div>
  );
}