import { useState } from 'react';
import { Link } from 'react-router-dom';

// Material-UI
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Custom hook
import { useDownloadJSON, useTimeSince } from '../../../hooks';

const cardWidth = 300;
const cardHeight = 300;

export function CircuitCard({ circuit, onDelete, onStar }) {
  const circuitExport = useDownloadJSON(circuit.data.schematic);
  const timeSince = useTimeSince(circuit.data.updatedAt);

  const [dialog, setDialog] = useState(false);
  const openDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);

  return (
    <>
      <Card
        variant='outlined'
        sx={{
          width: cardWidth,
          height: cardHeight,
          backgroundColor: 'grey.50',
        }}
      >
        <CardActionArea
          component={Link}
          to={`/editor/${circuit._id}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <CardMedia
            image={circuit.thumbnail}
            src={circuit.name}
            sx={{
              flexGrow: 1,
              width: cardWidth,
              height: cardHeight / 2,
              backgroundColor: 'gray',
            }}
          />
          <CardHeader
            title={circuit.name}
            titleTypographyProps={{ noWrap: true }}
            subheader={'Edited ' + timeSince}
          />
        </CardActionArea>
        <CardActions>
          <Tooltip title='Export' arrow>
            <IconButton href={circuitExport} download={`${circuit.name}.json`}>
              <GetAppIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete' arrow>
            <IconButton onClick={openDialog}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip
            title={
              circuit.isStared ? 'Remove from favorites' : 'Add to favorites'
            }
            arrow
          >
            <IconButton onClick={onStar}>
              {circuit.isStared ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      <Dialog open={dialog} onClose={closeDialog}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this circuit?
            <br />
            It will be lost forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={onDelete} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
