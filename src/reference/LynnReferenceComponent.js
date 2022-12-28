import React, { Component } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';

class LynnReferenceComponent extends Component {

  render() {
    let type = 'mch';
    if (this.props.type === 'war') {
      type = 'war';
    }
    return (
      <Box
        component="main"
        margin="auto"
        sx={{ flexGrow: 1, pt: { xs: 14, md: 5} }}>
        <Stack alignItems={'center'}>
          <Stack direction={'row'}>
            <Typography variant='h2' fontWeight={700} display='inline'>Lynn Kaneko </Typography>
            <Typography variant='h4' display='inline' sx={{ fontStyle: 'italic' }}> @Exodus</Typography>
          </Stack>
          <Typography variant='h4' pb={4}>Reference - {type.toUpperCase()}</Typography>
        </Stack>
        
        <Divider variant='middle' sx={{ borderBottomWidth: 5 }} />

        <Stack spacing={2} alignItems={'center'} mb={10} mt={5}>
          <Box maxWidth={1200} margin='auto'>
            <img src={`${process.env.PUBLIC_URL}/assets/reference/lynn/lynn${type}01.jpg`} />
          </Box>
          <Box maxWidth={1200} margin='auto'>
            <img src={`${process.env.PUBLIC_URL}/assets/reference/lynn/lynn${type}02.jpg`} />
          </Box>
          <Box maxWidth={1200} margin='auto'>
            <img src={`${process.env.PUBLIC_URL}/assets/reference/lynn/lynn${type}03.jpg`} />
          </Box>
          <Box maxWidth={1200} margin='auto'>
            <img src={`${process.env.PUBLIC_URL}/assets/reference/lynn/lynn${type}04.jpg`} />
          </Box>
          <Box maxWidth={1200} margin='auto'>
            <img src={`${process.env.PUBLIC_URL}/assets/reference/lynn/lynn${type}05.jpg`} />
          </Box>
        </Stack>
      </Box>
    );
  }
}

export default LynnReferenceComponent