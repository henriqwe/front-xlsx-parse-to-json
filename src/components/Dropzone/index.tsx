import { notification } from '@utils/notification';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
  onFileLoad: (value: ArrayBuffer) => void;
};

export function Dropzone({ onFileLoad }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);
        reader.onabort = () =>
          notification('A leitura do arquivo foi abortada', 'info');
        reader.onerror = () =>
          notification('A leitura do arquivo falhou', 'error');
        reader.onload = () => {
          onFileLoad(reader.result as ArrayBuffer);
        };
      });
    },
    [onFileLoad],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls', '.slk', '.xla', '.xlt', '.xlw'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/vnd.ms-excel.sheet.binary.macroenabled.12': ['.xlsb'],
      'application/vnd.ms-excel.sheet.macroenabled.12': ['.xlsm'],
      'application/vnd.ms-excel.template.macroenabled.12': ['.xltm'],
      'application/vnd.ms-excel.addin.macroenabled.12': ['.xlam'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 cursor-pointer text-center hover:border-blue-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Solte os arquivos aqui...</p>
      ) : (
        <p>
          Arraste e solte alguns arquivos aqui ou clique para selecionar os
          arquivos
        </p>
      )}
    </div>
  );
}
