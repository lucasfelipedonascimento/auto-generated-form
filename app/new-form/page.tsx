import Link from "next/link";
import { DynamicForm } from "./components/dynamic-form";
import { ROUTES } from "@/constants/routes";

export default async function NewForm() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl font-semibold text-center mt-8">
        Crie Agora seu Formulário Personalizado!
      </h1>

      <DynamicForm />

      <Link
        href={ROUTES.oldForm}
        className="bg-green-600 hover:bg-green-700 text-white p-2 w-1/2 flex justify-center mx-auto rounded-md"
      >
        Formulários Cadastrados
      </Link>
    </div>
  );
}
