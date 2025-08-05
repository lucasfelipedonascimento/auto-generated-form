"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaTrashAlt } from "react-icons/fa";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "@/types/Field";
import { RegisterField } from "./register-field";
import axios from "axios";
import { local } from "@/app/env/local";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";

type FormValues = {
  fields: Field[];
};

export function DynamicForm() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [formName, setFormName] = React.useState("");

  const methods = useForm<FormValues>({
    defaultValues: {
      fields: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "fields",
    control: methods.control,
  });

  const watchFields = methods.watch("fields");

  async function handleSubmitForm() {
    const result = await axios.post(`${local.API_URL}/forms`, {
      name: formName,
      questions: watchFields.map((field, idx) => {
        return {
          label: field.label,
          type: field.isSelect ? "select" : "input",
          options: field.isSelect
            ? field.options?.map((opt) => ({
                label: opt.label,
                value: opt.value,
              }))
            : undefined,
          conditions: field.dependsOn
            ? [
                {
                  dependsOnId: field.dependsOn.fieldId,
                  expectedValue: field.dependsOn.value,
                },
              ]
            : undefined,
          response: field.value,
        };
      }),
    });

    if (result.status === 201) {
      router.push(ROUTES.oldFormId.replace(":id", result.data.id));
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitForm)}
        className="flex flex-col items-center p-8"
      >
        <div className="flex flex-col gap-8 w-1/2">
          <div className="flex flex-col gap-2">
            <span>Nome do Campo *</span>
            <Input
              placeholder="Defina o Nome do seu Formulário *"
              defaultValue={formName}
              onChange={(e) => {
                if (e.target.value.trim() === "") {
                  return;
                }

                setFormName(e.target.value);
              }}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {watchFields.map((field, index) => {
              const dependency = field.dependsOn;

              const dependencyFieldValue = dependency
                ? watchFields.find((f) => f.id === dependency.fieldId)?.value
                : null;

              const shouldDisplay =
                !dependency || dependencyFieldValue === dependency.value;

              const shouldDisable =
                !!dependency &&
                (!dependencyFieldValue ||
                  dependencyFieldValue !== dependency.value);

              if (!shouldDisplay) return null;

              return (
                <div
                  key={field.id}
                  className="flex flex-col gap-4 border p-4 rounded"
                >
                  <Label>{field.label}</Label>

                  {!field.isSelect && (
                    <Input
                      {...methods.register(`fields.${index}.value`, {
                        required: field.required,
                      })}
                      disabled={shouldDisable}
                      required={field.required}
                    />
                  )}

                  {field.isSelect &&
                    field.options &&
                    field.options.length > 0 && (
                      <Select
                        onValueChange={(val) =>
                          methods.setValue(`fields.${index}.value`, val)
                        }
                        disabled={shouldDisable}
                        required={field.required}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione uma Opção" />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((option) => (
                            <SelectItem key={option.id} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                  {methods.formState.errors.fields?.[index]?.message && (
                    <span className="text-red-500 text-sm">
                      {
                        methods.formState.errors.fields[index]
                          ?.message as string
                      }
                    </span>
                  )}

                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <FaTrashAlt />
                  </Button>
                </div>
              );
            })}
          </div>

          <Button
            type="button"
            className="bg-black text-white"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Adicionar Campo
          </Button>

          <RegisterField
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            fields={fields}
            append={append}
          />

          <Button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500"
            disabled={fields.length === 0}
          >
            Enviar Formulário
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
