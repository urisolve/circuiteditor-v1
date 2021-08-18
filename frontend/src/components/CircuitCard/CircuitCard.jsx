import React, { useMemo } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Material-UI
import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
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

  const timeSince = useMemo(
    () => moment(circuit.updatedAt).fromNow(),
    [circuit.updatedAt],
  );

  return (
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
            subheader={timeSince}
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
          <IconButton onClick={onDelete}>
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
  );
};
