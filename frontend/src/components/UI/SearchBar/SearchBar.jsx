import { useCallback } from 'react';

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export function SearchBar({ value, setValue }) {
  const clearValue = useCallback(() => setValue(''), [setValue]);
  const updateValue = useCallback((e) => setValue(e.target.value), [setValue]);

  return (
    <TextField
      variant='outlined'
      size='small'
      placeholder='Search...'
      fullWidth
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
            {value.length ? <CloseIcon fontSize='small' /> : ''}
          </InputAdornment>
        ),
      }}
    />
  );
};
