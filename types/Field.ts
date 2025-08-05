import { SelectOption } from "./SelectOption";

export type Field = {
  id: number;
  label: string;
  value: string;
  required: boolean;
  isSelect: boolean;
  options?: SelectOption[];
  dependsOn?: {
    fieldId: number;
    value: string;
  };
};