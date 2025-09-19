import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute ({children} : {children : React.ReactNode}) {
    const router = useRouter();

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn")

        if (!loggedIn) {
            router.push("/SignIn")
        }
    }, [router]);

    return <>{children}</>
}
