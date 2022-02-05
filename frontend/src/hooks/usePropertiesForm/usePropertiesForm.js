import { useEffect } from 'react';
import { useState } from 'react';

export function usePropertiesForm(label, properties, isOpen) {
  const starterComp = {
    label: label ?? { isHidden: false },
    properties: properties ?? {},
  };

  const [newComp, setNewComp] = useState(starterComp);
  const resetNewComp = () => setNewComp(starterComp);
  const updateNewComp = (mods) => setNewComp((comp) => ({ ...comp, ...mods }));
  const updateNewLabel = (key, value) =>
    updateNewComp({ label: { ...newComp.label, [key]: value } });
  const toggleLabel = () => updateNewLabel('isHidden', !newComp.label.isHidden);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => resetNewComp(), [isOpen]);

  return { newComp, resetNewComp, updateNewComp, updateNewLabel, toggleLabel };
}
