import Link from "next/link";
import { DynamicForm } from "./components/dynamic-form";
import { ROUTES } from "@/constants/routes";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default async function NewForm() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl font-semibold text-center mt-8">
        Crie Agora seu Formulário Personalizado!
      </h1>

      <DynamicForm />

      <Link
        href={ROUTES.oldForm}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold p-2 flex items-center gap-2 justify-center mx-auto rounded-md"
      >
        Formulários Cadastrados
        <FaArrowRight />
      </Link>

      <Link
        href={ROUTES.home}
        className="bg-zinc-500 hover:bg-zinc-600 text-white font-semibold p-2 flex items-center gap-2 justify-center mx-auto rounded-md"
      >
        <FaArrowLeft />
        Voltar para Tela Inicial
      </Link>
    </div>
  );
}
