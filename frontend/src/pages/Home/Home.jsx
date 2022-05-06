// Material-UI
import { Stack } from '@mui/material';

// Page Sections
import {
  Contact,
  Footer,
  Hero,
  HowTo,
  ScrollToTopButton,
} from '../../components';

const sectionPadding = { py: 0, px: 2 };

export function Home() {
  return (
    <Stack sx={{ mt: { xs: 2, md: 5 } }}>
      <Hero padding={sectionPadding} />
      <HowTo padding={sectionPadding} />
      <Contact padding={sectionPadding} />
      <Footer />
      <ScrollToTopButton />
    </Stack>
  );
}
