import React, { useState, useEffect, useCallback } from 'react';

import { Fab, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const ScrollToTopButton = ({ threshold }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleScrollVisibility = useCallback(() => {
    setIsScrolled(window.pageYOffset >= (threshold ?? 100));
  }, [threshold, setIsScrolled]);

  useEffect(() => {
    window.addEventListener('scroll', toggleScrollVisibility);

    return () => {
      window.removeEventListener('scroll', toggleScrollVisibility);
    };
  }, [toggleScrollVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isScrolled && (
      <Tooltip title='Scroll back top top' placement='left' arrow>
        <Fab
          color='primary'
          aria-label='scroll to top'
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={scrollToTop}
        >
          <ArrowUpwardIcon />
        </Fab>
      </Tooltip>
    )
  );
};
