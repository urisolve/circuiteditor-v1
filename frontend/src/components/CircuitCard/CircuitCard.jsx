import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Material-UI
import {
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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useStyles } from './CircuitCard.styles';

export const CircuitCard = ({ circuit, onDelete, onExport, onStar }) => {
  const classes = useStyles();

  const [dialog, setDialog] = useState(false);
  const openDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);

  const timeSince = useMemo(
    () => moment(circuit.data.updatedAt).fromNow(),
    [circuit.data.updatedAt],
  );

  return (
    <>
      <Card classes={{ root: classes.root }} elevation={3}>
        <CardActionArea className={classes.actionArea}>
          <Link to={`/circuits/${circuit._id}`} className={classes.link}>
            {circuit?.thumbnail ? (
              <CardMedia image={circuit.thumbnail} src={circuit.name} />
            ) : (
              <div id='placeholder' className={classes.placeHolderImage} />
            )}
            <CardHeader
              title={circuit.name}
              titleTypographyProps={{ noWrap: true }}
              subheader={'Edited ' + timeSince}
            />
          </Link>
        </CardActionArea>
        <CardActions>
          <Tooltip title='Export' arrow>
            <IconButton onClick={onExport}>
              <GetAppIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete' arrow>
            <IconButton onClick={openDialog}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <div className={classes.spacer} />
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
