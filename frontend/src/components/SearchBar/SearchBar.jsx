import React, { useCallback } from 'react';

import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

export const SearchBar = ({ value, setter }) => {
  // Clear the search bar
  const clearValue = useCallback(() => setter(''), [setter]);

  // Update the value of the search bar
  const updateValue = useCallback(
    (event) => setter(event.target.value),
    [setter],
  );

  return (
    <TextField
      variant='outlined'
      margin='dense'
      label='Search'
      placeholder='Resistor'
      value={value}
      onChange={updateValue}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position='end' onClick={clearValue}>
            {value.length ? <CloseIcon /> : ''}
          </InputAdornment>
        ),
      }}
    />
  );
};
