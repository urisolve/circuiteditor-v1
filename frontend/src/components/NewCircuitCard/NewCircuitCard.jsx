import React from 'react';

// Material-UI
import { useStyles } from './NewCircuitCard.styles';
import { Card, CardActionArea, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export const NewCircuitCard = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Tooltip title='Create a new circuit' arrow>
      <Card classes={{ root: classes.root }} elevation={0}>
        <CardActionArea className={classes.container} onClick={onClick}>
          <AddIcon color='disabled' style={{ fontSize: 200 }} />
        </CardActionArea>
      </Card>
    </Tooltip>
  );
};
