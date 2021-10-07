import { useState, useEffect, useCallback } from 'react';

import { Fab, Slide, Tooltip } from '@mui/material';
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
    <Slide direction='up' in={isScrolled} mountOnEnter unmountOnExit>
      <Tooltip title='Scroll back to top' placement='left' arrow>
        <Fab
          color='primary'
          aria-label='scroll to top'
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            border: '2px solid white',
          }}
          onClick={scrollToTop}
        >
          <ArrowUpwardIcon />
        </Fab>
      </Tooltip>
    </Slide>
  );
};
