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

type FormValues = {
  fields: Field[];
};

export function DynamicForm() {
  const [openDialog, setOpenDialog] = React.useState(false);

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

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col items-center p-8">
        <div className="flex flex-col gap-8 w-1/2">
          {fields.map((field, index) => {
            const dependency = field.dependsOn;
            const shouldDisplay =
              !dependency ||
              watchFields?.find((f) => f.id === dependency.fieldId)?.value ===
                dependency.value;

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
                  />
                )}

                {field.isSelect &&
                  field.options &&
                  field.options.length > 0 && (
                    <Select
                      onValueChange={(val) =>
                        methods.setValue(`fields.${index}.value`, val)
                      }
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
                    {methods.formState.errors.fields[index]?.message as string}
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
        </div>
      </form>
    </FormProvider>
  );
}
