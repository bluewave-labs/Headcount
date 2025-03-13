import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';

/**
 * Popup component for notifying the user that a time off request was successfully sent
 * 
 * Props:
 * - close<Function>: Function for closing this popup component.
 *      Syntax: close()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffRequestSent({close, style}) {
    return (
        <Box sx={{...{
            border: "1px solid #D0D5DD",
            borderRadius: "12px",
            padding: "16px",
            backgroundColor: "#FFFFFF",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <Stack direction="row" alignItems="center" spacing={4}>
                <p>New time off request created successfully</p>
                <CloseIcon onClick={close} sx={{
                    backgroundColor: "#FFFFFFF",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#D0D5DD"
                    }
                }}/>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
TimeOffRequestSent.propTypes = {
    //The function to close this component
    close: PropTypes.func
};

//Default values for this component
TimeOffRequestSent.defaultProps = {
    style: {}
};