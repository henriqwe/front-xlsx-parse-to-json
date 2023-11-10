import { Dropzone } from '@components/Dropzone';
import { ToastContainer } from 'react-toastify';
import { Card } from '@material-tailwind/react';
import { Form } from '@components/Form';
import { useFormContext } from '@context/FormContext';
import { JsonViewData } from '@components/JsonViewData';

function App() {
  const { excelData, setExcelFile } = useFormContext();
  return (
    <div className="flex justify-center h-screen max-h-screen w-screen bg-gray-100 relative">
      <div className="bg-blue-700 w-full h-1/6 z-0 absolute" />
      <div className="w-full md:w-1/2 right-0 left-0">
        {excelData ? (
          <>
            <Form />
            <JsonViewData />
          </>
        ) : (
          <div className="flex w-full pt-16">
            <Card className="p-4 w-full">
              <Dropzone onFileLoad={(data) => setExcelFile(data)} />
            </Card>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
