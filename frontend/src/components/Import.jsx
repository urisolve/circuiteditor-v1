import React from "react";
import { DropzoneDialog } from "material-ui-dropzone";

function Import({ open, onClose }) {
  return <DropzoneDialog open={open} onClose={onClose} />;
}

export default Import;
