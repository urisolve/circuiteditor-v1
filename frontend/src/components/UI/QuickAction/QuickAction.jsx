import { IconButton, Tooltip } from '@mui/material';

export function QuickAction({ disabled, icon, name, onClick, ...rest }) {
  return (
    <Tooltip title={name} arrow>
      <span>
        <IconButton
          aria-label={name}
          disabled={disabled}
          onClick={onClick}
          {...rest}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}
