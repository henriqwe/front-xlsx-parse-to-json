import { Tabs } from '@components/Tabs';
import { useFormContext } from '@context/FormContext';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { Card, Button } from '@material-tailwind/react';
import { notification } from '@utils/notification';
import CopyToClipboard from 'react-copy-to-clipboard';

export function JsonViewData() {
  const { tabs, handleOnChangeTab, jsonData } = useFormContext();

  if (!jsonData) {
    return <></>;
  }

  return (
    <Card className="flex flex-col gap-4 bg-white p-4">
      <Tabs tabs={tabs} onChange={handleOnChangeTab} />

      <pre className="flex overflow-scroll flex-1 p-4 bg-gray-100 rounded-md text-xs max-h-96">
        {JSON.stringify(jsonData[tabs.current], undefined, 4)}
      </pre>
      <CopyToClipboard
        text={JSON.stringify(jsonData[tabs.current], undefined, 4)}
        onCopy={() => notification('JSON copiado com sucesso!', 'success')}
      >
        <Button
          color="green"
          className="flex items-center  justify-center gap-4"
          fullWidth
          size="sm"
        >
          <DocumentDuplicateIcon className="w-5 h-5" />
          Copiar JSON
        </Button>
      </CopyToClipboard>
    </Card>
  );
}
