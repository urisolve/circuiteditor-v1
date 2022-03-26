import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useDownloadFile } from '../../../hooks';

export function DownloadButton({ content, fileName, type, ...rest }) {
  const downloadProps = useDownloadFile(content, fileName, type);

  return (
    <IconButton {...downloadProps} {...rest}>
      <DownloadIcon />
    </IconButton>
  );
}
