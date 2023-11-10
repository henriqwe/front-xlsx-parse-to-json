import * as XLSX from 'xlsx';
import type { TExcelData } from '&types/excel';

export function useReadXlsx() {
  function parseToJSON(file: ArrayBuffer): TExcelData[] {
    const workbook = XLSX.read(file, { type: 'buffer' });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  }

  return { parseToJSON };
}
