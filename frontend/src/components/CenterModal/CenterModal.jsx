import { Box, Modal } from '@mui/material';

const modalStyle = {
  // Positioning
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  // Styling
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  width: 360,
};

export function CenterModal({ children, sx, ...rest }) {
  return (
    <Modal {...rest}>
      <Box sx={{ ...modalStyle, ...sx }}>{children}</Box>
    </Modal>
  );
}
