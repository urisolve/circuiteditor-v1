import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';

export function SearchBar({ value, setValue }) {
  const { t } = useTranslation();

  const clearValue = useCallback(() => setValue(''), [setValue]);
  const updateValue = useCallback((e) => setValue(e.target.value), [setValue]);

  return (
    <TextField
      variant='outlined'
      size='small'
      placeholder={`${t('common.search')}...`}
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
