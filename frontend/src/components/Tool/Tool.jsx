import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export const Tool = ({ name, icon, onClick, disabled, ...rest }) => {
  return (
    <Tooltip title={name} arrow>
      <IconButton
        onClick={onClick}
        aria-label={name}
        disabled={disabled ?? false}
        {...rest}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};
