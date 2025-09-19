"use client"
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home () {
    return <ProtectedRoute>
        <h1>home page</h1>
    </ProtectedRoute>
}