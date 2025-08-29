"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          Pathlight
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm">
            Home
          </Link>
          <Link href="/places" className="text-sm">
            Places
          </Link>
          <Link href="/conservation" className="text-sm">
            Conservation
          </Link>
          {session ? (
            <Link href="/profile" className="text-sm">
              Profile
            </Link>
          ) : (
            <Button onClick={() => signIn("github")}>Sign In</Button>
          )}
        </nav>
      </div>
    </header>
  );
}
