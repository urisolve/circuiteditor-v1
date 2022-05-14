import { Box, Modal } from '@mui/material';

const modalStyle = {
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  left: '50%',
  p: 2,
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
};

export function CenterModal({ children, sx, ...rest }) {
  return (
    <Modal {...rest}>
      <Box sx={{ ...modalStyle, ...sx }}>{children}</Box>
    </Modal>
  );
}
