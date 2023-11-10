import { Tabs as TabsMT, TabsHeader, Tab } from '@material-tailwind/react';
import { classNames } from '@utils/classNames';

type Props = {
  tabs: {
    current: string;
    names: string[];
  };
  onChange: (value: string) => void;
};

export function Tabs({ tabs, onChange }: Props) {
  return (
    <TabsMT value={tabs.current}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
        }}
      >
        {tabs.names.map((name) => (
          <Tab
            key={name}
            value={name}
            onClick={() => onChange(name)}
            className={classNames(
              tabs.current === name ? 'text-gray-900' : 'text-gray-700',
              'text-sm',
            )}
          >
            {name}
          </Tab>
        ))}
      </TabsHeader>
    </TabsMT>
  );
}
