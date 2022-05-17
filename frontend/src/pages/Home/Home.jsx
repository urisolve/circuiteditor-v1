import { Stack } from '@mui/material';

import {
  Contact,
  Footer,
  Hero,
  HowTo,
  ScrollToTopButton,
} from '../../components';

export function Home() {
  return (
    <Stack sx={{ mt: { xs: 2, md: 5 } }}>
      <Hero />
      <HowTo />
      <Contact />
      <Footer />

      <ScrollToTopButton />
    </Stack>
  );
}
