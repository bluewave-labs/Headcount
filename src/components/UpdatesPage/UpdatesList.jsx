import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import Label from '../Label/Label';
import HRMButton from '../Button/HRMButton';
import NewTeamMember from '../PopupComponents/NewTeamMember';
import TimeOffRequestSentWindow from '../PopupComponents/TimeOffRequestSentWindow';
import TimeOffApproval from '../PopupComponents/TimeOffApproval';
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * Menu component for listing update notifications in the home page.
 * 
 * Props:
 * - updates<Array<Object>>: List of objects containing update information to be displayed.
 * 
 * - refresh<Function>: Function for refreshing the list of updates. 
 *      Syntax: refresh()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function UpdatesList({updates, refresh, style}) {
    //States determining whether the new team member, time off request sent and time off approval
    //components should be displayed
    const [newMember, setNewMember] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [approval, setApproval] = useState(false);
    //Details for each notification popup component
    const [newMemberDetails, setNewMemberDetails] = useState({});
    const [requestSentDetails, setRequestSentDetails] = useState({});
    const [approvalDetails, setApprovalDetails] = useState({});

    //ID of the currently logged in employee
    const currentUserId = 1;

    //URL endpoints to be used for API calls
    const notificationURL = `http://localhost:5000/api/notifications/`;

    //Retrieve the status of a notification for a given employee
    function checkNotificationStatus(update, id) {
        return update.recipients.filter((emp) => emp.empId === id)[0].notificationStatus;
    };

    //Function for updating the status of an update 
    function handleSwitch(up) {
        //Update the given notification record in the database
        axios.put(
            notificationURL, 
            { 
                notificationId: up.id, 
                employeeEmpId: currentUserId,
                status: (checkNotificationStatus(up, currentUserId) === "new" 
                    || checkNotificationStatus(up, currentUserId) === "waiting") ? "seen" : "new" 
            }, 
            { params: { id: up.id } }
        )
        .then((response) => {
            console.log(response);
            refresh();
        })
        .catch((error) => {
            console.log(error);
        })
    };

    //Function for retrieving update details for popup component
    function retrieveDetails(up) {
        console.log("Running retrieveDetails()")
        //Retrieve details for "New team member added" update
        if (up.subject === "New team member added") {
            const details = {
                avatar: up.employee.photo,
                name: `${up.employee.firstName} ${up.employee.lastName}`,
                role: up.employee.role.roleTitle,
                email: up.employee.email,
                office: up.employee.location,
                effectiveDate: up.employee.effectiveDate
            };
            setNewMemberDetails(details);
        }
        //Retrieve details for "New time off request" update
        else if (up.subject === "New time off request") {
            const details = {
                notification: up,
                timeOffId: up.timeOffHistory.id,
                avatar: up.employee.photo,
                name: `${up.employee.firstName} ${up.employee.lastName}`,
                role: up.employee.role.roleTitle,
                email: up.employee.email,
                office: up.employee.officeLocation,
                effectiveDate: up.employee.effectiveDate,
                timeOffBalance: (up.employeeAnnualTimeOff.hoursAllowed - 
                    up.employeeAnnualTimeOff.cumulativeHoursTaken),
                timeOffRequested: `${up.timeOffHistory.startDate} - 
                    ${up.timeOffHistory.endDate}`,
                requestedDaysTotal: Math.ceil(up.timeOffHistory.hours / 24),
                timeOffCategory: up.timeOff.category,
                status: up.timeOffHistory.status
            };
            setApprovalDetails(details);
        }
        //Retrieve details for "Time off request sent" update
        else if (up.subject === "Your time off request has been sent") {
            const details = {
                timeOffBalance: (up.employeeAnnualTimeOff.hoursAllowed -
                    up.employeeAnnualTimeOff.cumulativeHoursTaken),
                timeOffRequested: `${up.timeOffHistory.startDate} -
                    ${up.timeOffHistory.endDate}`,
                requestedDaysTotal: Math.ceil(up.timeOffHistory.hours / 24),
                timeOffCategory: up.timeOff.category,
                notes: up.timeOffHistory.note
            };
            setRequestSentDetails(details);
        }
    };

    return (
        <>
            <TableContainer sx={{...{
                minWidth: "925px"
            }, ...style}}>
                <Table>
                    <TableBody>
                        {updates.map((update) => (
                            <TableRow sx={{
                                backgroundColor: (checkNotificationStatus(update, currentUserId) != "seen") ? "#F9FAFB" : "#FFFFFF",
                                border: "1px solid #EAECF0",
                            }}>
                                {/*Update status*/}
                                <TableCell>
                                    {checkNotificationStatus(update, currentUserId) === "new" && <Label mode="status" dot="orange" label="New"/>}
                                    {checkNotificationStatus(update, currentUserId) === "waiting" && <Label mode="status" dot="red" label="Waiting"/>}
                                    {checkNotificationStatus(update, currentUserId) === "seen" && <Label mode="status" dot="grey" label="Seen"/>}
                                </TableCell>
                                {/*Update name and description*/}
                                <TableCell><b>{update.subject}</b></TableCell>
                                <TableCell>{update.message}</TableCell>
                                {/*Mark as read/unread button*/}
                                <TableCell align="right" sx={{paddingRight: 0, width: "16%"}}>
                                    <HRMButton mode="tertiary" onClick={() => handleSwitch(update)}>
                                        <b>Mark as {checkNotificationStatus(update, currentUserId) === "seen" && 'un'}read</b>
                                    </HRMButton>
                                </TableCell>
                                {/*View button*/}
                                <TableCell align="right" sx={{paddingLeft: 0}}>
                                    <HRMButton 
                                        mode="tertiary" 
                                        onClick={() => {
                                            retrieveDetails(update);
                                            if (update.subject === "New team member added") {
                                                setNewMember(true);
                                            }
                                            if (update.subject === "New time off request") {
                                                setApproval(true);
                                            }
                                            if (update.subject === "Your time off request has been sent") {
                                                setRequestSent(true);
                                            }
                                        }} 
                                    >
                                        <a 
                                            style={{
                                                color: "#7F56D9", 
                                                textDecoration: "none", 
                                                fontWeight: "bold"
                                            }}
                                        >
                                            View
                                        </a>
                                    </HRMButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*New team member added update popup component*/}
            <Dialog open={newMember} onClose={() => setNewMember(false)}>
                <NewTeamMember employee_details={newMemberDetails} close={() => setNewMember(false)} />
            </Dialog>
            {/*Time off request sent update popup component*/}
            <Dialog open={requestSent} onClose={() => setRequestSent(false)}>
                <TimeOffRequestSentWindow request_information={requestSentDetails} close={() => setRequestSent(false)} />
            </Dialog>
            {/*New time off request update popup component*/}
            <Dialog open={approval} onClose={() => setApproval(false)}>
                <TimeOffApproval 
                    request_information={approvalDetails} 
                    close={() => setApproval(false)} 
                    refresh={() => {
                        setApproval(false);
                        handleSwitch(approvalDetails.notification);
                    }}
                />
            </Dialog>
        </>
    );
};

//Control panel settings for storybook
UpdatesList.propTypes = {
    //List of updates to be rendered
    updates: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),

    //Function for refreshing list of updates
    refresh: PropTypes.func
};

//Default values for this component
UpdatesList.defaultProps = {
    style: {}
};