import React from 'react';
import { DropzoneDialog } from 'material-ui-dropzone';

export const Import = ({ open, onClose }) => {
  return <DropzoneDialog open={open} onClose={onClose} />;
};
