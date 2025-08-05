import { DynamicForm } from "./components/dynamic-form";

export default function System() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl font-semibold text-center mt-8">
        Crie Agora seu Formulário Personalizado!
      </h1>

      <DynamicForm />
    </div>
  );
}
