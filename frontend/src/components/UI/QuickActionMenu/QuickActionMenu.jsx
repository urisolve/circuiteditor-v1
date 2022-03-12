import { Paper, Stack } from '@mui/material';

export function QuickActionMenu({
  offset,
  anchor,
  children,
  duration,
  easing,
  sx,
  ...rest
}) {
  return (
    <Paper
      sx={{
        position: 'fixed',
        transform: `translate(${offset.x ?? 0}px, ${offset.y ?? 0}px)`,
        transition: `transform ${duration ?? '0.25s'} ${easing ?? ''}`,
        ...anchor,
        ...sx,
      }}
      {...rest}
    >
      <Stack {...rest}>{children}</Stack>
    </Paper>
  );
}
