import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import TimeOffMenu from './TimeOffMenu';
import TimeOffRequest from '../PopupComponents/TimeOffRequest';
import TimeOffRequestSent from '../PopupComponents/TimeOffRequestSent';
import HRMButton from '../Button/HRMButton';

/**
 * Time off page of the HRM application. Contains the time off menu as well as controls for 
 * request time off.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffPage({style}) {
    //States determining whether the time off request menu and request successful notifications
    //should be displayed
    const [openRequest, setOpenRequest] = useState(false);
    const [requestSuccess, setRequestSuccess] = useState(false);
    //Hook for updating the list of time off periods
    const [update, setUpdate] = useState(false);
    //console.log(update);

    //Function for sending a time off request
    function sendRequest() {
        setOpenRequest(false);
        setRequestSuccess(true);
        setTimeout(() => setRequestSuccess(false), 5000);
        setUpdate(!update);
    }

    return (
        <Box sx={style}>
            {/*Main page content*/}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    marginBottom: "16px"
                }}
            >
                <h3>Time off</h3>
                <HRMButton 
                    mode="primary" 
                    onClick={() => setOpenRequest(true)}
                >
                    Request new time off
                </HRMButton>
            </Stack>
            <TimeOffMenu update={update} />
            {/*Time off request menu*/}
            <Dialog open={openRequest} onClose={() => setOpenRequest(false)}>
                <TimeOffRequest 
                    close={() => setOpenRequest(false)} 
                    sendRequest={sendRequest} 
                />
            </Dialog>
            {/*Request successful notification*/}
            <TimeOffRequestSent 
                close={() => setRequestSuccess(false)} 
                style={{
                    display: (requestSuccess) ? "block" : "none",
                    position: "fixed",
                    right: "40px",
                    bottom: "40px",
                    zIndex: 999
                }} 
            />
        </Box>
    );
};

//Control panel settings for storybook
TimeOffPage.propTypes = {};

//Default values for this component
TimeOffPage.defaultProps = {
    style: {},
    //innerStyle: {}
};