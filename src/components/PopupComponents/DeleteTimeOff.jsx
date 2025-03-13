import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import PropTypes from 'prop-types';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';
import { update } from '../../assets/FetchServices/TimeOffHistory';

/**
 * Popup component for confirming a request to delete an upcoming period of time off
 * 
 * Props:
 * - period<Object>: Time off period to be deleted
 *      Syntax: {
 *          id: <Integer>
 *          timeOffId: <Integer>
 *          from: <Date>
 *          to: <Date>
 *          hours: <Float>
 *          type: <String>
 *      }
 * 
 * - close<Function>: Function for closing this popup component.
 *      Syntax: close()
 * 
 * - refresh<Function>: Function for refreshing the list of time off periods in the parent 
 *      component.
 *      Syntax: refresh()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function DeleteTimeOff({period, close, refresh, style}) {

    //Function for deleting a time off request
    function handleDelete() {
        const updatedPeriod = {
            id: period.id,
            status: "Deleting"
        }
        update(updatedPeriod).then((data) => {
            console.log(data);
            refresh();
        });
    };

    return (
        <Box sx={{...{
            width: "411px",
            borderRadius: "12px",
            boxShadow: "0 15px 6px #10182808",
            paddingX: "36px",
            paddingY: "30px",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Text*/}
            <h3>Delete time off request?</h3>
            <p style={{marginBottom: "40px"}}>
                When you remove this time off request, a confirmation message will be sent 
                to your manager
            </p>
            {/*Buttons*/}
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                <HRMButton mode="tertiary" onClick={close}>Cancel</HRMButton>
                <HRMButton mode="error" onClick={handleDelete}>Remove</HRMButton>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
DeleteTimeOff.propTypes = {
    //Information on the time off period to be deleted.
    period: PropTypes.object,

    //The function to close this component
    close: PropTypes.func,

    //Function for refreshing the list of time off periods in the parent component.
    refresh: PropTypes.func
};

//Default values for this component
DeleteTimeOff.defaultProps = {
    style: {}
};