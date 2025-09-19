"use client"
import { useRouter } from "next/navigation";

export default function SignInPage() {

    const router = useRouter();

    const handleLogIn = (e) => {
      e.preventDefault();
        localStorage.setItem("loggedIn", "true");
        router.push("/home");
    }

  return (
    <div className="relative h-screen w-full">
      {/* Background image */}
      <img
        src="/img/bg-netflix.png"
        alt="Background"
        className="w-full h-screen object-cover blur-sm -z-10"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Top navigation */}
      <div className="absolute -top-12 flex justify-between items-center w-full px-60">
        <img src="/img/logo.png" alt="Logo" className="w-52" />
      </div>

      {/* Centered Sign In form */}
      <div className="absolute top-1/5 left-1/2 -translate-x-1/2 rounded-sm flex flex-col items-center text-center px-16 py-16 bg-[#00000048] w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-6">
          Sign In to Your Account
        </h1>

        <form className="flex flex-col gap-4 w-full mt-3">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-sm bg-white/10 border border-white placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-sm bg-white/10 border border-white placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button onClick={handleLogIn} className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-sm font-semibold mt-2">
            Sign In
          </button>
        </form>

        <p className="text-white/70 mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-red-600 hover:underline">
            Create one
          </a>
        </p>

        <p className="text-red-500 mt-2 text-sm cursor-pointer hover:underline">
          Forgot Password?
        </p>
      </div>
    </div>
  );
}
