import React from 'react';

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
