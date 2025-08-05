import Image from "next/image";

import Logo from "@/public/logo.png";
import { ROUTES } from "@/constants/routes";
import { LinkTo } from "@/components/link-to";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 sm:p-20">
      <h1 className="text-5xl font-bold">Seja(m) Bem-Vindo(a)s ao</h1>

      <Image src={Logo} width={550} height={550} alt="" />

      <div className="flex gap-3 items-center">
        <LinkTo title="Formulários Cadastrados" href={ROUTES.oldForm} />
        <LinkTo title="Novo Formulário" href={ROUTES.newForm} />
      </div>
    </div>
  );
}
