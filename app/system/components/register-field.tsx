"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field } from "@/types/Field";
import React from "react";
import { useFormContext } from "react-hook-form";

type RegisterFieldProps = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  fields: Field[];
  append: (field: Field) => void;
};

export function RegisterField(props: RegisterFieldProps) {
  const { openDialog, setOpenDialog, fields, append } = props;
  const [fieldDraft, setFieldDraft] = React.useState<Field>({
    id: 1,
    label: "",
    value: "",
    required: false,
    isSelect: false,
    options: [],
  });

  const methods = useFormContext();

  const handleAddOption = () => {
    const lastId = fieldDraft.options?.[fieldDraft.options.length - 1]?.id ?? 0;
    const newOption = {
      id: lastId + 1,
      label: "",
      value: "",
    };
    setFieldDraft((prev) => ({
      ...prev,
      options: [...(prev.options || []), newOption],
    }));
  };

  const handleOptionChange = (
    index: number,
    key: "label" | "value",
    value: string
  ) => {
    const updatedOptions = [...(fieldDraft.options || [])];
    updatedOptions[index][key] = value;
    setFieldDraft((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handleConfirm = () => {
    if (!fieldDraft.label) {
      methods.setError(`fields.${fields.length}`, {
        message: "O nome do campo é obrigatório",
      });
      return;
    }

    append({ ...fieldDraft });
    setOpenDialog(false);
    setFieldDraft({
      id: fieldDraft.id + 1,
      label: "",
      value: "",
      required: false,
      isSelect: false,
      options: [],
    });
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Configurar novo campo</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Label>
            Nome do campo <span className="text-red-500">*</span>
          </Label>
          <Input
            value={fieldDraft.label}
            onChange={(e) =>
              setFieldDraft((prev) => ({ ...prev, label: e.target.value }))
            }
          />

          <div className="flex items-center gap-2">
            <Checkbox
              checked={fieldDraft.isSelect}
              onCheckedChange={(checked) =>
                setFieldDraft((prev) => ({
                  ...prev,
                  isSelect: !!checked,
                  options: !!checked ? [] : undefined,
                }))
              }
            />
            <Label>Campo do tipo select?</Label>
          </div>

          {fieldDraft.isSelect ? (
            <div className="flex flex-col gap-3">
              <Label>Opções</Label>
              {fieldDraft.options?.map((opt, idx) => (
                <div key={opt.id} className="flex gap-2">
                  <Input
                    placeholder="Nome do Campo"
                    value={opt.label}
                    onChange={(e) =>
                      handleOptionChange(idx, "label", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Valor"
                    value={opt.value}
                    onChange={(e) =>
                      handleOptionChange(idx, "value", e.target.value)
                    }
                  />
                </div>
              ))}
              <Button type="button" onClick={handleAddOption}>
                Adicionar Opção
              </Button>
            </div>
          ) : (
            <>
              <Label>Valor padrão (opcional)</Label>
              <Input
                value={fieldDraft.value}
                onChange={(e) =>
                  setFieldDraft((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
              />
            </>
          )}

          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              checked={fieldDraft.required}
              onCheckedChange={(checked) =>
                setFieldDraft((prev) => ({
                  ...prev,
                  required: !!checked,
                }))
              }
            />
            <Label>Campo obrigatório?</Label>
          </div>

          {/* CAMPO DEPENDENTE */}
          {fields.length > 0 && (
            <>
              <Label className="mt-4">Este campo depende de:</Label>
              <select
                defaultValue={fieldDraft.dependsOn?.fieldId ?? ""}
                onChange={(e) => {
                  const fieldId = Number(e.target.value);
                  if (!fieldId) {
                    setFieldDraft((prev) => ({
                      ...prev,
                      dependsOn: undefined,
                    }));
                    return;
                  }
                  setFieldDraft((prev) => ({
                    ...prev,
                    dependsOn: {
                      fieldId,
                      value: "",
                    },
                  }));
                }}
                className="border p-1 rounded"
              >
                <option value="">Nenhum</option>
                {fields.map((f: any) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>

              {fieldDraft.dependsOn?.fieldId && (
                <>
                  <Label>Valor que ativa este campo:</Label>
                  <Input
                    value={fieldDraft.dependsOn.value}
                    disabled={!fieldDraft.dependsOn?.fieldId}
                    onChange={(e) =>
                      setFieldDraft((prev) => ({
                        ...prev,
                        dependsOn: {
                          ...prev.dependsOn!,
                          value: e.target.value,
                        },
                      }))
                    }
                  />
                </>
              )}
            </>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpenDialog(false);
            }}
            className="bg-red-500 text-white"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-blue-500 text-white"
            onClick={handleConfirm}
            disabled={!fieldDraft.label}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
