import Link from "next/link";

export const Home = () => {
    return (
      <>
        <div className="relative h-screen w-full">
          <img
            src="/img/bg-netflix.png"
            alt="Netflix Background"
            className="w-full h-screen blur-sm object-cover -z-10"
          />

          <div className="absolute inset-0 bg-black/60"></div>

          <div className="absolute -top-12 flex justify-between items-center w-full px-60">
            <img src="/img/logo.png" alt="" className="w-52" />
            <Link href={"/SignIn"}>
              <button className="px-3.5 py-2.5 bg-red-600 rounded-md">
                Sign In
              </button>
            </Link>
          </div>

          <div className="absolute top-1/3 left-[440px] flex flex-col justify-center items-center">
            <h1 className="text-white text-7xl font-bold">
              Welcome to Movie Platform 🎬
            </h1>
            <p className="text-2xl text-white font-bold mt-3">
              Starts at USD 2.99$/month. Cancel anytime.
            </p>
            <p className="text-xl text-white font-normal mt-3">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="w-[800px] grid grid-cols-6 gap-4 mt-8 ">
              <input
                type="text"
                placeholder="Enter an email address"
                className="col-span-4 bg-transparent border-1 border-white rounded-sm placeholder:text-[#ffffffa8] placeholder:pl-4"
              />
              <Link
                href={"/SignUp"}
                className="py-3 col-span-2 text-center text-white text-4xl font-semibold bg-red-600 rounded-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </>
    );
}