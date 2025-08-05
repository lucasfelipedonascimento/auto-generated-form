import Image from "next/image";

import Logo from "@/public/logo.png";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 sm:p-20">
      <h1 className="text-5xl font-bold">Seja(m) Bem-Vindo(a)s ao</h1>

      <Image src={Logo} width={550} height={550} alt="" />

      <Link
        href={ROUTES.system}
        className="bg-green-700 px-4 py-2 rounded-md text-white hover:outline-2"
      >
        Ir para o Sistema
      </Link>
    </div>
  );
}
