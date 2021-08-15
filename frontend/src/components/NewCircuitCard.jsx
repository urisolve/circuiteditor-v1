import React from 'react';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { Card, CardActionArea, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 300,
    backgroundColor: grey[50],
    border: `15px dashed ${grey[400]}`,
  },
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
}));

function NewCircuitCard({ onClick }) {
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
}

export default NewCircuitCard;
