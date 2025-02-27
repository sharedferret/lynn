import React from 'react';
import {
  Box, Button, IconButton, Stack, SvgIcon, Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from 'react-router-dom';

export default function FooterComponent() {
  const navigate = useNavigate();
  return (
    <Box width="100%">
      <Stack
        direction={{ xs: 'none', md: 'row' }}
        pt={10}
        pb={2}
        pl={5}
        pr={5}
        alignItems="center"
      >
        <Typography variant="subtitle2" fontSize={12} maxWidth={600} textAlign="left">
          FINAL FANTASY XIV © 2010 - 2023 SQUARE ENIX CO., LTD. FINAL FANTASY, FINAL FANTASY
          XIV, and FFXIV are registered trademarks or trademarks of Square Enix Holdings Co.,
          Ltd. All material used under license.
        </Typography>
        <Box flexGrow={1} />
        <Stack direction="row">
          <IconButton href="https://discord.gg/thehelplines" target="_blank" rel="noreferrer">
            <SvgIcon width="24" height="24" viewBox="0 0 23 24">
              <g id="surface1" transform="translate(0,3)">
                <path d="M 19.460938,1.507812 C 17.953125,0.792969 16.363281,0.285156 14.730469,0
              14.507812,0.414062 14.304688,0.839844 14.125,1.277344 12.382812,1.003906
              10.613281,1.003906 8.871094,1.277344 8.691406,0.839844 8.488281,0.414062
              8.265625,0 6.628906,0.289062 5.039062,0.796875 3.527344,1.511719 0.535156,6.097656
              -0.277344,10.574219 0.128906,14.984375 1.882812,16.324219 3.84375,17.34375
              5.933594,18 6.402344,17.34375 6.816406,16.652344 7.175781,15.925781
              6.496094,15.664062 5.839844,15.339844 5.21875,14.957031 c 0.164062,-0.125
              0.324219,-0.25 0.480469,-0.375 3.671875,1.789063 7.929687,1.789063 11.601562,0
              0.160157,0.132813 0.320313,0.261719 0.480469,0.375 -0.625,0.382813 -1.28125,0.707031
              -1.960938,0.96875 C 16.179688,16.652344 16.59375,17.347656 17.0625,18
              19.152344,17.347656 21.117188,16.328125 22.871094,14.984375 23.347656,9.871094
              22.058594,5.4375 19.460938,1.507812 Z M 7.6875,12.269531 c -1.128906,0
              -2.0625,-1.0625 -2.0625,-2.371093 0,-1.304688 0.902344,-2.378907 2.0625,-2.378907
              1.160156,0 2.085938,1.074219 2.066406,2.378907 C 9.734375,11.207031
              8.84375,12.269531 7.6875,12.269531 Z m 7.625,0 c -1.136719,0 -2.066406,-1.0625
              -2.066406,-2.371093 0,-1.304688 0.902344,-2.378907 2.066406,-2.378907 1.160156,0
              2.082031,1.074219 2.058594,2.378907 -0.01953,1.308593 -0.90625,2.371093
              -2.058594,2.371093 z m 0,0"
                />
              </g>
            </SvgIcon>
          </IconButton>
          <IconButton href="https://github.com/sharedferret" target="_blank" rel="noreferrer">
            <GitHubIcon />
          </IconButton>
          <Button color="inherit" onClick={() => { navigate('/changelog'); }}>
            <Typography variant="subtitle2" fontSize={12} pl={1} pr={1}>
              {`Version ${process.env.REACT_APP_VERSION}`}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
