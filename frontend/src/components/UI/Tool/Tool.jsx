import { Tooltip, IconButton } from '@mui/material';

export function Tool({ name, icon, onClick, disabled, ...rest }) {
  return (
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
}
