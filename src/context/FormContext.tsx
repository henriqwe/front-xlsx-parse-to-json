import type { TExcelData } from '&types/excel';
import {
  ChangeEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { formatObject, type TFormatedData } from '@utils/formatObject';
import { useReadXlsx } from '@hooks/useReadXlsx';
import { generateJsonKeys } from '@utils/generateJsonKeys';
import { notification } from '@utils/notification';

export type TCheckboxValues = {
  [x: string]: boolean;
};

type TTabs = { current: string; names: string[] };

type ShapeFormContext = {
  excelFile: ArrayBuffer | null;
  setExcelFile: React.Dispatch<React.SetStateAction<ArrayBuffer | null>>;
  excelData: TExcelData[] | null;
  selectValue: string;
  checkboxValues: TCheckboxValues;
  jsonData: TFormatedData | null;
  tabs: TTabs;
  columnHeaders: string[];
  handleResetStates: () => void;
  handleGenerateJSON: () => void;
  handleOnChangeCheckBox: (event: ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeTab: (value: string) => void;
  setSelectValue: React.Dispatch<React.SetStateAction<string>>;
};

const FormContext = createContext({} as ShapeFormContext);

type Props = {
  children: ReactNode;
};

const initialValues = {
  excelFile: null,
  excelData: null,
  selectValue: '',
  checkboxValues: {},
  jsonData: null,
  tabs: { current: '', names: [''] } as TTabs,
};

export function FormProvider({ children }: Props) {
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(
    initialValues.excelFile,
  );
  const [excelData, setExcelData] = useState<TExcelData[] | null>(
    initialValues.excelData,
  );
  const [selectValue, setSelectValue] = useState(initialValues.selectValue);
  const [checkboxValues, setCheckboxValues] = useState<TCheckboxValues>(
    initialValues.checkboxValues,
  );

  const [jsonData, setJsonData] = useState<TFormatedData | null>(
    initialValues.jsonData,
  );
  const [tabs, setTabs] = useState(initialValues.tabs);

  const columnHeaders = useMemo(() => {
    if (!excelData) {
      return [];
    }
    const columnHeaders = Object.keys(excelData[0]);

    const _checkboxValues = {} as TCheckboxValues;
    for (const iterator of columnHeaders) {
      _checkboxValues[iterator] = true;
    }

    setSelectValue(columnHeaders[0]);
    setCheckboxValues(_checkboxValues);
    return columnHeaders;
  }, [excelData]);

  const { parseToJSON } = useReadXlsx();

  function handleResetStates() {
    setExcelFile(initialValues.excelFile);
    setExcelData(initialValues.excelData);
    setJsonData(initialValues.jsonData);
    setCheckboxValues(initialValues.checkboxValues);
    setSelectValue(initialValues.selectValue);
  }

  function handleGenerateJSON() {
    const jsonKeys = generateJsonKeys({
      data: excelData as TExcelData[],
      key: selectValue,
    });

    const _jsonData = formatObject({
      data: excelData as TExcelData[],
      columns: checkboxValues,
      jsonKeys,
    });

    setJsonData(_jsonData);
    setTabs({
      current: Object.keys(_jsonData)[0],
      names: Object.keys(_jsonData),
    });
  }

  function handleOnChangeCheckBox(event: ChangeEvent<HTMLInputElement>) {
    if (
      !event.target.checked &&
      Object.values(checkboxValues).filter(Boolean).length === 1
    ) {
      notification('Ao menos uma coluna deve estar selecionada', 'error');
      return;
    }
    setCheckboxValues((old) => ({
      ...old,
      [event.target.name]: event.target.checked,
    }));
  }

  function handleOnChangeTab(value: string) {
    setTabs((old) => ({ ...old, current: value }));
  }

  useEffect(() => {
    if (excelFile) {
      const data = parseToJSON(excelFile);
      setExcelData(data);
    }
  }, [excelFile]);

  return (
    <FormContext.Provider
      value={{
        setExcelFile,
        checkboxValues,
        columnHeaders,
        excelData,
        excelFile,
        handleGenerateJSON,
        handleOnChangeCheckBox,
        handleOnChangeTab,
        handleResetStates,
        jsonData,
        selectValue,
        tabs,
        setSelectValue,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
