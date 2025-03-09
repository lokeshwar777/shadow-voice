'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, {session?.user?.username}</h1>
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
}