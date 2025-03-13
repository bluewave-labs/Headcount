import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import HRMButton from '../Button/HRMButton';
import { useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

/**
 * Popup component for displaying the date selector controls. Used to set starting and 
 * ending dates.
 * 
 * Props:
 * - close<Function>: Function for closing this popup component.
 *      Syntax: close()
 * 
 * - setDate<Function>: Function for setting the date in the parent component.
 *      Syntax: setDate(<JavaScript date>)
 * 
 * - initialValue<Date>: Default value for the date selector.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function DateSelect({close, setDate, initialValue, style}) {
    //Value of the date to be set
    const [value, setValue] = useState(dayjs(initialValue));

    //Function for setting the date in the parent component
    function submit() {
        setDate(value.toDate());
        close();
    }

    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: "12px",
            paddingX: 0,
            paddingY: 0
        }, ...style}}>
            <List>
                {/*Date selector*/}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar 
                        value={value} 
                        onChange={(newValue) => setValue(newValue)} 
                        minDate={dayjs()}
                    />
                </LocalizationProvider>
                <Divider />
                {/*Apply or cancel*/}
                <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={2}
                    sx={{display: "flex", padding: "16px"}} 
                >
                    <HRMButton 
                        mode="secondaryB" 
                        onClick={() => close()} 
                        style={{flex: 1}}
                    >
                        Cancel
                    </HRMButton>
                    <HRMButton 
                        mode="primary" 
                        onClick={() => submit()} 
                        style={{flex: 1}}
                    >
                        Apply
                    </HRMButton>
                </Stack>
            </List>
        </Box>
    );
};

//Control panel settings for storybook
DateSelect.propTypes = {
    //The function to close this component
    close: PropTypes.func,

    //The function to set the date in the parent component
    setDate: PropTypes.func
};

//Default values for this component
DateSelect.defaultProps = {
    style: {}
};