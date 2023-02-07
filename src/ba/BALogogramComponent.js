import React, { Component } from 'react';

import { Box, Stack, Typography } from '@mui/material';

class BALogogramComponent extends Component {
  render() {
    const logograms = require('./lib/Logograms.json').mnemes;
    const logogram = this.props.logogram;

    if (logogram == null) {
      return <Box height={20} />
    }

    return (
      <Box height={20}>
        <Stack direction='row' justifyContent={'left'} alignItems={'center'} spacing={1}>
          <img src={`${process.env.PUBLIC_URL}/assets/logograms/${logograms[logogram].type}.png`} width={16} height={16} alt={logograms[logogram].type} />
          <Typography fontSize={14}>{logogram}</Typography>
        </Stack>
      </Box>
    );
  }
}

export default BALogogramComponent