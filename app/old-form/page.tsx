import { Question } from "@/types/Question";
import { local } from "../env/local";
import { Label } from "@/components/ui/label";
import axios from "axios";

type Formulario = {
  id: string;
  nome: string;
  questions: Question[]; // ou tipagem correta
};

export default async function OldForm() {
  const result = await axios.get(`${local.API_URL}/forms`);

  console.log("dados", result);
  const forms: Formulario[] = await result.data.forms;

  return (
    <div className="flex flex-col items-center mt-8">
      {forms?.map((form) => {
        return (
          <div key={form.id}>
            <Label>Nome do Formulário: {form.nome}</Label>

            {form.questions?.map((question) => {
              return (
                <div key={question.id} className="flex items-center gap-2">
                  <Label>{question.label}: </Label>
                  <Label className="font-bold">{question.response}</Label>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
