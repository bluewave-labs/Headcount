import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import HRMButton from '../Button/HRMButton';
import { fonts, colors } from '../../Styles';
import PropTypes from 'prop-types';

/**
 * More detailed popup component for notifying the user that a time off request was succcessfully
 * sent.
 * 
 * Props:
 * - request_information<Object>: Contains the request information
 *      Syntax: {
 *          timeOffBalance: <String>
 *          timeOffRequested: <String>
 *          requestedDaysTotal: <String>
 *          timeOffCategory: <String>
 *          notes: <String>
 *      }
 * 
 * - close<Function>: Function for closing this popup component
 *      Syntax: close()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffRequestSentWindow({request_information, close, style}) {
    //Custom style elements
    const StyledTD = styled("td")({
        textAlign: "start",
        width: "50%",
        paddingBottom: "20px"
    });

    return (
        <Box sx={{...{
            width: "490px",
            borderRadius: "12px",
            boxShadow: "0 15px 6px #10182808",
            color: colors.darkGrey,
            backgroundColor: "#FFFFFF",
            padding: "40px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Title*/}
            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between"
                sx={{marginBottom: "40px"}}
            >
                <h3>Your time off request has been sent</h3>
                <CloseIcon onClick={close} sx={{
                    backgroundColor: "#FFFFFF",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#D0D5DD"
                    }
                }}/>
            </Stack>
            {/*Time off request details*/}
            <table style={{width: "100%", marginBottom: "40px"}}>
                <tr>
                    <StyledTD><b>Time off balance</b></StyledTD>
                    <StyledTD>{request_information.timeOffBalance}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Time off requested</b></StyledTD>
                    <StyledTD>{request_information.timeOffRequested}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Requested days total</b></StyledTD>
                    <StyledTD>{request_information.requestedDaysTotal}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Time-off category</b></StyledTD>
                    <StyledTD>{request_information.timeOffCategory}</StyledTD>
                </tr>
            </table>
            <b>Your Notes</b>
            <p>{request_information.notes}</p>
            {/*Buttons*/}
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
                <HRMButton mode="primary" onClick={close}>OK</HRMButton>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
TimeOffRequestSentWindow.propTypes = {
    //Information included in the time off request
    request_information: PropTypes.objectOf(PropTypes.string),

    //Function for closing this popup
    close: PropTypes.func,
}

//Default values for this component
TimeOffRequestSentWindow.defaultProps = {
    style: {}
}