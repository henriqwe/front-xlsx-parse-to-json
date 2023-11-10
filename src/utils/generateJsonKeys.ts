import type { TExcelData } from '&types/excel';

type Props = {
  data: TExcelData[];
  key: string;
};

export function generateJsonKeys({ data, key }: Props) {
  return data.map((obj) =>
    obj[key]
      .toString()
      .toLocaleLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(' ')
      .filter((str) => str)
      .join(' ')
      .replaceAll(' ', '_'),
  );
}
