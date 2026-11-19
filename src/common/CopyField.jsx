import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

/**
 * Read-only text field with a button that copies its value to the clipboard.
 */
export default function CopyField({ value, ...props }) {
  const clipboardAvailable = typeof navigator !== 'undefined' && 'clipboard' in navigator;
  const [tooltip, setTooltip] = useState('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(
      () => setTooltip('Copied!'),
      () => setTooltip('Copy Error!'),
    );
  };

  return (
    <TextField
      type="text"
      value={value}
      slotProps={{
        input: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={clipboardAvailable ? tooltip : ''}>
                <span>
                  <IconButton
                    aria-label="Copy to clipboard"
                    disabled={!clipboardAvailable}
                    onClick={handleCopy}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </InputAdornment>
          ),
        },
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
