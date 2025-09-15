'use client';

import React, { createContext, useContext } from 'react';

// Simplified context - can be removed entirely if not needed elsewhere
const SlugContext = createContext<{} | null>({});

export const SlugProvider = ({ children }: { children: React.ReactNode }) => {
  return <SlugContext.Provider value={{}}>{children}</SlugContext.Provider>;
};

export const useSlugContext = () => {
  const context = useContext(SlugContext);
  if (!context) {
    throw new Error('useSlugContext must be used within a SlugProvider');
  }
  return context;
};
