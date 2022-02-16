import { useState } from 'react';
import { useBoolean } from '..';

export function usePropertiesMenu() {
  const { value: isOpen, on: open, off: close } = useBoolean(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const changeTab = (_, newTab) => setSelectedTab(newTab);
  const openTab = (tab) => {
    setSelectedTab(tab);
    open();
  };

  return { isOpen, close, open, openTab, changeTab, selectedTab };
}
