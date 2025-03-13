import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import dayjs from "dayjs";
import PropTypes from 'prop-types';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';
import { update } from '../../assets/FetchServices/TimeOffHistory';
import { fetchOne, update as updatePolicy } from '../../assets/FetchServices/EmployeeAnnualTimeOff';

/**
 * Popup component for displaying the information of a time off request to be deleted by a manager or administrator.
 * 
 * Props:
 * - request_information<Object>: Contains the request information.
 *      Syntax: {
 *          timeOffId: <Integer>
 *          avatar: <Image Source>
 *          name: <String>
 *          role: <String>
 *          email: <String>
 *          office: <String>
 *          effectiveDate: <String>
 *          timeOffBalance: <String>
 *          timeOffRequested: <String>
 *          requestedDaysTotal: <String>
 *          timeOffCategory: <String>
 *          status: <String>
 *      }
 * 
 * - close<Function>: Function for closing this popup component
 *      Syntax: close()
 * 
 * - refresh<Function>: Function for closing this popup and freshing the list of updates in the
 *      parent component.
 *      Syntax: refresh()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffConfirmDelete({request_information, close, refresh, style}) {
    //Custom style elements
    const StyledTD = styled('td')({
        textAlign: "start",
        paddingBottom: "15px",
        width: "50%"
    });

    //Function for confirming or refusing a request to delete a time off period
    function resolveRequest(newStatus) {
        //Update the time off period status
        const updatedPeriod = {
            id: request_information.timeOffId,
            status: newStatus
        };
        update(updatedPeriod).then((data) => {
            console.log(data);
            if (newStatus === "Cancelled") {
                const period = data.data;
                //Retrieve the related employeeAnnualTimeOff record
                fetchOne(period.empId)
                .then((data) => {
                    if (data) {
                        console.log(data);
                        const policy = data.filter((p) => (p.year === dayjs().year() && p.timeOffId === period.timeOffId))[0];
                        //Refund the hours used in the time off request
                        const refundBalance = {
                            id: policy.id,
                            cumulativeHoursTaken: policy.hoursUsed - period.hours
                        };
                        updatePolicy(refundBalance)
                        .then((data) => {
                            if (data) {
                                console.log(data);
                                refresh();
                            }
                        })
                    }
                });
            }
            refresh();
        });
    };

    return (
        <Box sx={{...{
            width: "524px",
            borderRadius: "12px",
            boxShadow: "0 15px 6px #10182808",
            padding: "40px",
            fontFamily: fonts.fontFamily,
            color: colors.darkGrey
        }, ...style}}
        >
            {/*Title*/}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <h3>Confirm delete time off request</h3>
                <CloseIcon onclick={close} sx={{
                    backgroundColor: "#FFFFFF",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#D0D5DD"
                    }
                }}/>
            </Stack>
            {/*Request Information*/}
            <table style={{width: "100%", marginBottom: "40px"}}>
                <tr>
                    <StyledTD><b>Photo</b></StyledTD>
                    <StyledTD>
                        <Avatar
                            alt={request_information.name}
                            src={request_information.avatar}
                            sx={{width: "60px", height: "60px"}} 
                        />
                    </StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Name</b></StyledTD>
                    <StyledTD>{request_information.name}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Role</b></StyledTD>
                    <StyledTD>{request_information.role}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Email</b></StyledTD>
                    <StyledTD>{request_information.email}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Office</b></StyledTD>
                    <StyledTD>{request_information.office}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Effective date</b></StyledTD>
                    <StyledTD>{request_information.effectiveDate}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Time off balance</b></StyledTD>
                    <StyledTD>{request_information.timeOffBalance}</StyledTD>
                </tr>
            </table>
            <table styled={{width: "100%"}}>
                <tr>
                    <StyledTD><b>Time off requested</b></StyledTD>
                    <StyledTD>{request_information.timeOFfRequested}</StyledTD>
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
            {/*Options*/}
            {request_information.status === "Cancelled" && 
                <b style={{color: "#5D6B98", marginBottom: "30px"}}>Time off request has been deleted</b>}
            {(request_information.status !== "Deleting" && request_information.status !== "Cancelled") &&
                <b style={{color: "#5D6B98", marginBottom: "30px"}}>Time off request is not being deleted</b>}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={2}
            >
                {(request_information.status === "Deleting") ?
                    <>
                        <HRMButton mode="tertiary" onClick={close}>Cancel</HRMButton>
                        <HRMButton mode="secondaryA" onClick={() => resolveRequest("Pending")}>Reject</HRMButton>
                        <HRMButton mode="error" onClick={() => resolveRequest("Cancelled")}>Delete</HRMButton>
                    </> :
                    <HRMButton mode="tertiary" onClick={close}>Close</HRMButton>}
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
TimeOffConfirmDelete.propTypes = {
    //Information included in the time off request
    request_information: PropTypes.objectOf(PropTypes.string),

    //Function for closing this popup component
    close: PropTypes.func,

    //Function for closing this popup and refreshing the list of updates in the parent component
    refresh: PropTypes.func
};

//Default values for this component
TimeOffConfirmDelete.defaultProps = {
    style: {}
};