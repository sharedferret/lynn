import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

const DRSNewHolsterSelectorComponent = React.lazy(() => import('./DRSNewHolsterSelectorComponent'));

export default function DRSNewHolsterMainComponent({
  holster, encodedHolster, resetTimer,
}) {
  const { t } = useTranslation('bsf');

  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5 } }}
    >
      <Stack>
        <Typography variant="h4" fontWeight={700}>{t('drs.holster-helper.title')}</Typography>
        <Suspense fallback={<div>Loading...</div>}>
          <DRSNewHolsterSelectorComponent
            holster={holster}
            encodedHolster={encodedHolster}
            resetTimer={resetTimer}
          />
        </Suspense>
      </Stack>
    </Box>
  );
}
