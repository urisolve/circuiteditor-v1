import { IconButton, Tooltip } from '@mui/material';

export function QuickAction({ icon, name, ...rest }) {
  return (
    <Tooltip title={name} arrow>
      <span>
        <IconButton aria-label={name} {...rest}>
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}
