import { useFormContext } from '@context/FormContext';
import {
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  Typography,
  Select,
  Option,
  Button,
  Checkbox,
} from '@material-tailwind/react';

export function Form() {
  const {
    columnHeaders,
    jsonData,
    checkboxValues,
    tabs,
    handleOnChangeCheckBox,
    setSelectValue,
    selectValue,
    handleResetStates,
    handleGenerateJSON,
  } = useFormContext();
  return (
    <Card className="flex flex-col gap-4 bg-white rounded-t-none p-4 mb-8">
      <div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Selecione as colunas para gerar os texto
          </Typography>
        </div>
        {columnHeaders.length &&
          columnHeaders.map((value) => (
            <Checkbox
              label={
                <Typography
                  color="blue-gray"
                  className="font-medium"
                  variant="small"
                >
                  {value}
                </Typography>
              }
              name={value}
              checked={checkboxValues[value]}
              onChange={handleOnChangeCheckBox}
              key={value}
              color="blue"
              crossOrigin="columnHeaders"
            />
          ))}
      </div>
      <>
        <Typography variant="h6" color="blue-gray">
          Selecione a coluna para gerar as chaves
        </Typography>
        <div className="ml-4">
          <Select
            label="Coluna"
            variant="standard"
            color="blue"
            onChange={(value) => {
              setSelectValue(value as string);
            }}
            defaultValue={selectValue}
            value={selectValue}
          >
            {columnHeaders.map((value) => (
              <Option value={value} key={value}>
                {value}
              </Option>
            ))}
          </Select>
        </div>
      </>
      <div className="flex gap-8 justify-end">
        <div>
          <Button
            onClick={handleResetStates}
            color="red"
            variant="outlined"
            className="flex items-center gap-2"
            size="sm"
          >
            <XMarkIcon className="w-5 h-5" />
            Limpar
          </Button>
        </div>

        <div>
          <Button
            onClick={handleGenerateJSON}
            color="blue"
            className="flex items-center gap-2"
            size="sm"
          >
            {jsonData && tabs.current ? (
              <ArrowPathIcon className="w-5 h-5" />
            ) : (
              <CheckIcon className="w-5 h-5" />
            )}
            {jsonData && tabs.current ? 'Atualizar' : 'Gerar'} JSON
          </Button>
        </div>
      </div>
    </Card>
  );
}
