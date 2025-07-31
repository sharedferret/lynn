import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import {
  FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import { changeLanguage } from './i18n';
import UniversalisRegionPicker from './UniversalisRegionPicker';

export default function SettingsPopoverComponent({ setColorMode }) {
  const { t } = useTranslation('common');
  const [open, setOpen] = React.useState(false);

  /**
  const getFlag = () => {
    const language = localStorage.getItem('i18nextLng').substring(0, 2);

    switch (language) {
      case 'fr':
        return '🇫🇷';
      case 'de':
        return '🇩🇪';
      case 'jp':
        return '🇯🇵';
      default:
        return '🇨🇦';
    }
  };
  */

  const handleSettingsButtonClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const settingsButton = (
    <Stack
      direction="row"
      m={1}
      p={1}
      spacing={1}
      alignItems="center"
      flexGrow={1}
      style={{ cursor: 'pointer' }}
      onClick={(e) => handleSettingsButtonClick(e)}
    >
      <SettingsApplicationsIcon sx={{ color: 'white' }} />
      { /* <Typography fontWeight={600} fontSize={16}>{getFlag()}</Typography> */ }
      <Box>
        <Typography color="#fff" fontWeight={600} fontSize={16}>{t('settings.title')}</Typography>
      </Box>
    </Stack>
  );

  const [theme, setTheme] = React.useState(localStorage.getItem('theme'));
  const [language, setLanguage] = React.useState(localStorage.getItem('language') || 'en');

  const handleThemeChange = useCallback((event, newTheme) => {
    if (newTheme) {
      localStorage.setItem('theme', newTheme);
      setColorMode(newTheme);
      setTheme(newTheme);
    }
  }, [localStorage, setTheme]);

  const handleLanguageChange = useCallback((event, newLanguage) => {
    if (newLanguage) {
      setLanguage(newLanguage);
      changeLanguage(newLanguage);
    }
  }, [setLanguage, changeLanguage]);

  return (
    <>
      <Box flexGrow={1}>
        {settingsButton}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('settings.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('settings.theme_title')}</DialogContentText>
          <RadioGroup
            row
            value={theme}
            exclusive
            onChange={handleThemeChange}
          >
            <FormControlLabel value="light" control={<Radio />} label={t('settings.themes.light')} />
            <FormControlLabel value="dark" control={<Radio />} label={t('settings.themes.dark')} />
            <FormControlLabel value="system" control={<Radio />} label={t('settings.themes.system')} />
          </RadioGroup>

          <DialogContentText pt={2}>{t('settings.language_title')}</DialogContentText>

          <RadioGroup
            row
            value={language}
            onChange={handleLanguageChange}
          >
            <FormControlLabel value="en" control={<Radio />} label="🇨🇦 English" />
            <FormControlLabel value="fr" control={<Radio />} disabled label="🇫🇷 Français" />
            <FormControlLabel value="de" control={<Radio />} label="🇩🇪 Deutsch" />
            <FormControlLabel value="jp" control={<Radio />} disabled label="🇯🇵 日本語" />
          </RadioGroup>

          <DialogContentText pt={2}>{t('settings.universalis_region_title')}</DialogContentText>
          <UniversalisRegionPicker />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t('common.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
