import React from 'react';
import { Dialog, Typography, Stack } from '@mui/material';
import HRMButton from '../Button/HRMButton';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      h2: {
        fontWeight: 550,
        fontFamily: 'Inter',
        fontSize: '16px',
        color: '#101828',
        marginBottom: '4px',
      },
      body1: {
        fontWeight: 550,
        fontFamily: 'Inter',
        fontSize: '13px',
        color: '#344054',
        paddingBottom: '8px',
      },
      body2: {
        fontWeight: 400,
        fontFamily: 'Inter',
        fontSize: '13px',
        color: '#344054',
        marginLeft:'9px',
        marginTop: '4px',
        padding: '9px, 10px',
      },
      body3: {
        fontWeight: 400,
        fontFamily: 'Inter',
        fontSize: '13px',
        color: '#475467',
        padding: '9px, 10px',
      },
      
    
    },
  });

export default function ConfirmationDialog({ open, closeConfirmationDialog, onConfirm, data }) {

  const handleConfirm = () => {
    onConfirm(); // Trigger the onConfirm callback to handle confirmation

  };
  
  return (
    <ThemeProvider theme={theme}>
    <Dialog open onClose={closeConfirmationDialog} PaperProps={{
        sx: {
        borderRadius:'12px',
        }
    }}>
      <Stack direction="column" spacing={2} sx={{ padding: '20px' }}>
        <Typography variant="h2">End this employment?</Typography>
        <Typography variant="body3">
            When you click on "End employment", the employee will<br /> be terminated either on the date selected, or<br /> immediately.
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={3} sx= {{marginTop: '19px'}}>
            <HRMButton mode="secondaryB" onClick={closeConfirmationDialog}>Cancel</HRMButton>
            <HRMButton mode="primary" onClick={handleConfirm}>End Employment</HRMButton>
        </Stack>
       
      </Stack>
    </Dialog>
    </ThemeProvider>
  );
}

ConfirmationDialog.propTypes = {
  closeConfirmationDialog: PropTypes.func.isRequired,
    
};