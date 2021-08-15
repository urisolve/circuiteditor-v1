import React from 'react';

const SettingsCallbacksContext = React.createContext();

export const SettingsCallbacksProvider = SettingsCallbacksContext.Provider;
export const SettingsCallbacksConsumer = SettingsCallbacksContext.Consumer;

export default SettingsCallbacksContext;
