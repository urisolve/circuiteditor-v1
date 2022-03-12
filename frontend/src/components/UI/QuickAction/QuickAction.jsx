import { IconButton, Tooltip } from '@mui/material';

export function QuickAction({ tooltip, icon, action, sx, ...rest }) {
  return (
    <Tooltip title={tooltip} arrow>
      <span>
        <IconButton onClick={action} sx={{ ...sx }} {...rest}>
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}
