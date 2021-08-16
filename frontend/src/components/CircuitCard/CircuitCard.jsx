import React from 'react';

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
import { useStyles } from './CircuitCard.styles';

export const CircuitCard = ({ circuit, onDelete, onExport }) => {
  const classes = useStyles();

  return (
    <Card classes={{ root: classes.root }} elevation={3}>
      <CardActionArea className={classes.actionArea}>
        {circuit?.thumbnail ? (
          <CardMedia image={circuit?.thumbnail} src={circuit?.name} />
        ) : (
          <div className={classes.placeHolderImage} />
        )}
        <CardHeader
          title={circuit?.name}
          titleTypographyProps={{ noWrap: true }}
          subheader={Date(circuit?.createdAt).toString().slice(0, 24)}
        />
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
      </CardActions>
    </Card>
  );
};
