import { Question } from "@/types/Question";
import { local } from "../env/local";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { FaArrowLeft } from "react-icons/fa";
import { LinkReturn } from "@/components/link-return";

type Formulario = {
  id: string;
  nome: string;
  questions: Question[]; // ou tipagem correta
};

export default async function OldForm() {
  const result = await axios.get(`${local.API_URL}/forms`);

  const forms = await result.data.forms;

  return (
    <div className="flex flex-col items-center mt-8 gap-8">
      <div className="flex flex-col justify-center gap-3">
        {forms?.map((form: Formulario) => {
          return (
            <div key={form.id}>
              <Label className="text-black">
                Nome do Formulário: {form.nome}
              </Label>

              {form.questions?.map((question) => {
                return (
                  <div key={question.id} className="flex items-center gap-2">
                    <Label>
                      Pergunta:{" "}
                      <span className="font-bold">{question.label}</span> |
                    </Label>
                    <Label>
                      Resposta:{" "}
                      <span className="font-bold">{question.response}</span>
                    </Label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        <LinkReturn title="Voltar para Cadastro" href={ROUTES.newForm} />

        <LinkReturn title="Voltar para Tela Inicial" href={ROUTES.home} />
      </div>
    </div>
  );
}
