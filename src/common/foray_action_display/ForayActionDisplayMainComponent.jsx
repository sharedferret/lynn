import React from 'react';
import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';

export default function ForayActionDisplayMainComponent() {
  const theme = useTheme();

  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5 } }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            background: alpha(theme.palette.background.paper, 0.85),
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box p={3}>
            <Stack spacing={4} alignItems="center">
              <Box>
                <Typography fontWeight={700} variant="h3" textAlign="start">
                  Foray Action Display Component
                </Typography>
              </Box>
              <Divider sx={{ width: '50%', margin: '0 auto', mb: 3 }} />
              <Paper
                elevation={2}
                sx={{
                  borderRadius: 2,
                  p: 2,
                  background: alpha(theme.palette.background.paper, 0.7),
                  width: '100%',
                  maxWidth: 450,
                }}
              >
                Display Component
              </Paper>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems="center"
                sx={{ width: '100%' }}
              >
                <Typography fontWeight={600} variant="h6">Action: </Typography>
                <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
                  Action Selector Component
                </Box>
              </Stack>
              <Container maxWidth="lg" sx={{ width: '100%' }}>
                <Stack spacing={4} alignItems="flex-start" width="100%">
                  <Box width="100%">
                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        borderRadius: '12px',
                        background: alpha(theme.palette.background.paper, 0.7),
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <Typography fontWeight={700} variant="h5">
                        Recipes
                      </Typography>
                      <Divider sx={{
                        width: '90%', margin: '0 auto', mb: 3, mt: 2,
                      }}
                      />
                      <Typography>content</Typography>
                    </Paper>
                  </Box>
                </Stack>
              </Container>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
