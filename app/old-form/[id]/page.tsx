import { local } from "@/app/env/local";
import { LinkReturn } from "@/components/link-return";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/constants/routes";
import { Question } from "@/types/Question";
import axios from "axios";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await axios.get(`${local.API_URL}/forms/${id}`);

  const form = await result.data.form;

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      <div key={form.id} className="p-8 w-1/2 flex flex-col items-center">
        <Label className="text-black">Nome do Formulário: {form.nome}</Label>

        {form.questions?.map((question: Question) => {
          return (
            <div key={question.id} className="flex items-center gap-2">
              <Label>
                Pergunta: <span className="font-bold">{question.label}</span> |
              </Label>
              <Label>
                Resposta: <span className="font-bold">{question.response}</span>
              </Label>
            </div>
          );
        })}
      </div>

      <LinkReturn title="Voltar para Cadastro" href={ROUTES.newForm} />
      <LinkReturn title="Voltar para Tela Inicial" href={ROUTES.home} />
    </div>
  );
}
