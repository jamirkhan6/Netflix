"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {

  const router = useRouter()

  const [user, setUser] = useState({
    name : "",
    email : "",
    password : "",
  })

  const handleChanged = (e) => {
    const {name, value} = e.target;
    setUser((prev) => ({
      ...prev,
      [name] : value
    }))
  }

const handleCreateAccount = async (e) => {
  e.preventDefault();

  if (!user.name || !user.email || !user.password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/user/SingUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
    } else {
      alert("Account created successfully");
      router.push("/SignIn");
    }

  } catch (error) {
    console.log(error);
  }
};




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

      {/* Top navigation (optional) */}
      <div className="absolute -top-12 flex justify-between items-center w-full px-60">
        <img src="/img/logo.png" alt="Logo" className="w-52" />
        <button className="px-6 py-2 bg-red-600 rounded-md text-white font-semibold hover:bg-red-700 transition">
          Sign In
        </button>
      </div>

      {/* Centered Create Account form */}
      <div className="absolute top-1/5 left-1/2 -translate-x-1/2 rounded-sm flex flex-col items-center text-center px-16 py-16 bg-[#00000048] w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-6">
          Create Your Account
        </h1>

        <form onSubmit={handleCreateAccount} className="flex flex-col gap-4 w-full mt-3">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChanged}
            placeholder="Full Name"
            className="p-3 rounded-sm bg-white/10 border border-white placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChanged}
            placeholder="Email"
            className="p-3 rounded-sm bg-white/10 border border-white placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChanged}
            placeholder="Password"
            className="p-3 rounded-sm bg-white/10 border border-white placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-sm font-semibold mt-2">
            Create Account
          </button>
          <p className="text-white text-xl font-bold">Or</p>
          <button className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-sm font-semibold">
            Forgot Password
          </button>
        </form>

        <p className="text-white/70 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
