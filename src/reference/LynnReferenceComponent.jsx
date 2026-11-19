import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';

export default function LynnReferenceComponent({ type }) {
  let refType = type;
  if (!refType) {
    refType = 'mch';
  }

  return (
    <Box
      component="main"
      sx={{
        margin: 'auto',
        flexGrow: 1,
        pt: { xs: 14, md: 5 },
      }}
    >

      <Helmet>
        <title>Lynn Kaneko Reference</title>
        <meta name="description" content="Reference images for Lynn Kaneko @ Exodus" />
        <meta property="og:title" content="Lynn Kaneko - Reference" />
        <meta property="og:url" content="https://lynn.pet/reference" />
        <meta property="og:image" content="https://lynn.pet/assets/reference/lynn/lynn-preview.jpg" />
        <meta property="og:description" content="Reference images for Lynn Kaneko @ Exodus" />
        <meta property="og:site_name" content="lynn.pet!" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@reflexyui" />
      </Helmet>

      <Stack sx={{
        alignItems: 'center',
      }}
      >
        <Stack direction="row">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              display: 'inline',
            }}
          >
            Lynn Kaneko
          </Typography>
          <Typography
            variant="h4"
            sx={{
              display: 'inline',
              fontStyle: 'italic',
            }}
          >
            {' '}
            @Exodus
          </Typography>
        </Stack>
        <Typography
          variant="h4"
          sx={{
            pb: 4,
          }}
        >
          Reference -
          {' '}
          {refType.toUpperCase()}
        </Typography>
      </Stack>

      <Divider variant="middle" sx={{ borderBottomWidth: 5 }} />

      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
          mb: 10,
          mt: 5,
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            margin: 'auto',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/reference/lynn/lynn${refType}01.jpg`}
            alt="1"
          />
        </Box>
        <Box
          sx={{
            maxWidth: 1200,
            margin: 'auto',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/reference/lynn/lynn${refType}02.jpg`}
            alt="2"
          />
        </Box>
        <Box
          sx={{
            maxWidth: 1200,
            margin: 'auto',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/reference/lynn/lynn${refType}03.jpg`}
            alt="3"
          />
        </Box>
        <Box
          sx={{
            maxWidth: 1200,
            margin: 'auto',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/reference/lynn/lynn${refType}04.jpg`}
            alt="4"
          />
        </Box>
        <Box
          sx={{
            maxWidth: 1200,
            margin: 'auto',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/reference/lynn/lynn${refType}05.jpg`}
            alt="5"
          />
        </Box>
      </Stack>
    </Box>
  );
}
