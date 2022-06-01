import { Container, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <Container sx={{ mt: 10 }}>
      <Stack alignItems='center' justifyContent='center'>
        <Typography variant='h1'>{t('page.notFound.title')}</Typography>
        <Typography variant='h2'>{t('page.notFound.subtitle')}</Typography>
      </Stack>
    </Container>
  );
}
