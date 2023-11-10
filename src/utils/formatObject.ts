import type { TExcelData } from '&types/excel';
import type { TCheckboxValues } from '@context/FormContext';

type Props = {
  data: TExcelData[];
  jsonKeys: string[];
  columns: TCheckboxValues;
};

export type TFormatedData = {
  [x: string]: { [y: string]: string };
};

export function formatObject({ data, jsonKeys, columns }: Props) {
  const obj: TFormatedData = {};

  for (const i in data) {
    for (const [key, value] of Object.entries(data[i])) {
      if (!columns[key]) {
        continue;
      }
      obj[key] = { ...obj[key], [jsonKeys[i]]: value.toString().trim() };
    }
  }

  return obj;
}
