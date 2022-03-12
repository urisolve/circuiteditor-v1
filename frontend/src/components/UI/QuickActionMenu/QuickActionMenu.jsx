import { Paper, Stack } from '@mui/material';

export function QuickActionMenu({ shift, children, sx }) {
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        transform: `translate(${shift}px)`,
        transition: 'transform 0.25s ease-out',
        backgroundColor: 'white',
        borderRadius: 2,
        '-webkit-backface-visibility': 'hidden',
        ...sx,
      }}
    >
      <Stack direction='row'>{children}</Stack>
    </Paper>
  );
}
