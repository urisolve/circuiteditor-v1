import { Tooltip, IconButton } from '@mui/material';

export const Tool = ({ name, icon, onClick, disabled, ...rest }) => (
  <Tooltip title={name} arrow>
    <span>
      <IconButton
        onClick={onClick}
        aria-label={name}
        disabled={disabled ?? false}
        {...rest}
      >
        {icon}
      </IconButton>
    </span>
  </Tooltip>
);
