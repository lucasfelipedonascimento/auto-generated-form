import Image from "next/image";

import Logo from "@/public/logo.png";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 sm:p-20">
      <h1 className="text-5xl font-bold">Seja(m) Bem-Vindo(a)s ao</h1>

      <Image src={Logo} width={550} height={550} alt="" />

      <div className="flex gap-3 items-center">
        <Link
          href={ROUTES.oldForm}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold p-2 flex items-center gap-2 justify-center mx-auto rounded-md"
        >
          Formulários Cadastrados
          <FaArrowRight />
        </Link>

        <Link
          href={ROUTES.newForm}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold p-2 flex items-center gap-2 justify-center mx-auto rounded-md"
        >
          Novo Formulário
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}
