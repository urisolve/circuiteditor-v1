import React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';

export const TeamMember = ({ member }) => {
  return (
    <Box sx={{ width: 200, pb: 5 }}>
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
            sx={{ width: 150, height: 200 }}
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
    </Box>
  );
};
