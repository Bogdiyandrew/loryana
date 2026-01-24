import { signIn } from "@/auth"
 
export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-rose-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl border border-rose-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-rose-600">Bună, iubito! ❤️</h1>
          <p className="mt-2 text-gray-500">Am pregătit ceva special pentru tine.</p>
        </div>
        
        <form
          action={async (formData) => {
            "use server"
            await signIn("credentials", formData)
          }}
          className="mt-8 space-y-6"
        >
          <div className="rounded-md shadow-sm">
            <input
              name="password"
              type="password"
              required
              className="relative block w-full rounded-lg border-0 py-3 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
              placeholder="Care este parola noastră secretă?"
            />
          </div>

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg bg-rose-600 px-3 py-3 text-sm font-semibold text-white hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 transition-colors"
          >
            Intră în lumea noastră
          </button>
        </form>
      </div>
    </div>
  )
}