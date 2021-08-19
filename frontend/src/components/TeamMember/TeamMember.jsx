import React from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { useStyles } from './TeamMember.styles';

export const TeamMember = ({ member }) => {
  const classes = useStyles();

  return (
    <div className={classes.teamMember}>
      <Grid
        container
        spacing={2}
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <Grid item>
          <Avatar
            variant='rounded'
            className={classes.avatar}
            alt={member.name}
            src={member.img}
          />
        </Grid>
        <Grid item>
          <Typography variant='h6' color='textSecondary'>
            {member.name}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
