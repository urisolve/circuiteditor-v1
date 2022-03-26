import { customScrollbar } from './customScrollbar';

export const globalStyles = {
  ...(process.env.REACT_APP_CUSTOM_SCROLLBAR && { customScrollbar }),

  html: {
    scrollBehavior: 'smooth',
  },
};
