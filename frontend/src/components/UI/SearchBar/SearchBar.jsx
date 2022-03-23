import { useCallback } from 'react';

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';

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
          <InputAdornment
            position='end'
            onClick={clearValue}
            sx={{ cursor: 'pointer' }}
          >
            {value.length ? <BackspaceIcon fontSize='small' /> : ''}
          </InputAdornment>
        ),
      }}
    />
  );
};
