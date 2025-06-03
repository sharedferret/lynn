import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme, alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import React from 'react';
import OccultPhantomJobSupportActionComponent from './OccultPhantomJobSupportActionComponent';

export default function OccultPhantomJobSupportActionContainerComponent({ supportActions }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        background: alpha(theme.palette.background.paper, 0.85),
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box
        sx={{
          py: 1,
          px: 2,
        }}
      >
        <Stack spacing={3} pt={2}>
          <Typography textAlign="start" fontWeight={700} variant="h4">Support Actions</Typography>
          <Divider sx={{
            width: '80%',
            margin: '0 auto',
            mb: 3,
            alignSelf: 'center',
          }}
          />
          { Object.values(supportActions).map(
            (action) => <OccultPhantomJobSupportActionComponent action={action} />,
          )}
        </Stack>
      </Box>
    </Paper>
  );
}
