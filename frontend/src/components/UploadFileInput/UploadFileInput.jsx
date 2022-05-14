import { v4 as uuidv4 } from 'uuid';

import { IconButton, Input } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { forwardRef, useMemo, useRef } from 'react';

export const UploadFileInput = forwardRef(
  ({ accept, children, iconProps, onClick, onUpload, ...rest }, ref) => {
    const id = useMemo(() => `upload-file-icon-button/${uuidv4()}`, []);
    const input = useRef();

    function handleButtonClick() {
      input.current.click();
      onClick?.();
    }

    function handleFileSelection(event) {
      const [file] = event.target.files;
      onUpload(file);
    }

    return (
      <label htmlFor={id}>
        <Input
          accept={accept}
          id={id}
          onChange={handleFileSelection}
          style={{ display: 'none' }}
          ref={input}
          type='file'
        />

        <IconButton onClick={handleButtonClick} ref={ref} {...rest}>
          <UploadIcon {...iconProps} />
        </IconButton>

        {children}
      </label>
    );
  },
);
