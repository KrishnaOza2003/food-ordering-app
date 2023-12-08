'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
function AuthLinks({status, userName} : {status: string, userName: string | null}) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2">
          Logout
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
          Register
        </Link>
      </>
    );
  }
}


function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email || null;
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  return (
    <div>
      <header className=" flex items-center justify-between text-gray-500">
        <nav className="flex items-center gap-10 text-gray-500 font-semibold ">
        <Link className="text-primary font-semibold text-3xl " href={""}>
          Sam's Pizza
        </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold ">
        <AuthLinks status={status} userName={userName} />
        
        </nav>
      </header>
    </div>
  );
}

export default Header;
