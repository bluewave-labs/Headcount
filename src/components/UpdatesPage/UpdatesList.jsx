import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Label from '../Label/Label';
import HRMButton from '../Button/HRMButton';
import NewTeamMember from '../PopupComponents/NewTeamMember';
import TimeOffRequestSentWindow from '../PopupComponents/TimeOffRequestSentWindow';
import TimeOffApproval from '../PopupComponents/TimeOffApproval';
import TimeOffRequestResolved from '../PopupComponents/TimeOffRequestResolved';
import { update } from '../../assets/FetchServices/Notification';
import StateContext from '../../context/StateContext';
import TimeOffConfirmDelete from '../PopupComponents/TimeOffConfirmDelete';
import TimeOffDeleted from '../PopupComponents/TimeOffDeleted';
import TimeOffNotDeleted from '../PopupComponents/TimeOffNotDeleted';

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
    //States determining which popup components should be displayed
    const [newMember, setNewMember] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [approval, setApproval] = useState(false);
    const [requestResolved, setRequestResolved] = useState(false);
    const [deleteRequest, setDeleteRequest] = useState(false);
    const [requestDeleted, setRequestDeleted] = useState(false);
    const [requestNotDeleted, setRequestNotDeleted] = useState(false);
    //Details for each notification popup component
    const [newMemberDetails, setNewMemberDetails] = useState({});
    const [requestSentDetails, setRequestSentDetails] = useState({});
    const [approvalDetails, setApprovalDetails] = useState({});
    const [requestResolvedDetails, setRequestResolvedDetails] = useState({});
    const [deleteRequestDetails, setDeleteRequestDetails] = useState({});
    const [requestDeletedDetails, setRequestDeletedDetails] = useState({});
    const [requestNotDeletedDetails, setRequestNotDeletedDetails] = useState({}); 

    //ID of the currently logged in employee
    const stateContext = useContext(StateContext);
    const currentUser = stateContext.state.employee ? stateContext.state.employee.empId : -1;

    //Retrieve the status of a notification for a given employee
    function checkNotificationStatus(update, id) {
        return update.recipients.filter((emp) => emp.empId === id)[0].notificationStatus;
    };

    //Function for updating the status of an update 
    function handleSwitch(up) {
        //Update the given notification record in the database
        update({ 
            notificationId: up.id, 
            employeeEmpId: currentUser,
            status: (checkNotificationStatus(up, currentUser) === "new" 
                || checkNotificationStatus(up, currentUser) === "waiting") ? "seen" : "new" 
        })
        .then((data) => {
            if (data) {
                console.log(data);
                refresh();
            }
        });
    };

    //Function for retrieving update details for popup component
    function retrieveDetails(up) {
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
                effectiveDate: dayjs(up.employee.effectiveDate).format("DD/MM/YYYY"),
                timeOffBalance: (up.employeeAnnualTimeOff.hoursAllowed - 
                    up.employeeAnnualTimeOff.cumulativeHoursTaken),
                timeOffRequested: `${dayjs(up.timeOffHistory.startDate).format("DD/MM/YYYY")} - 
                    ${dayjs(up.timeOffHistory.endDate).format("DD/MM/YYYY")}`,
                requestedDaysTotal: dayjs(up.timeOffHistory.endDate).diff(dayjs(up.timeOffHistory.startDate), "day"),
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
                timeOffRequested: `${dayjs(up.timeOffHistory.startDate).format("DD/MM/YYYY")} -
                    ${dayjs(up.timeOffHistory.endDate).format("DD/MM/YYYY")}`,
                requestedDaysTotal: dayjs(up.timeOffHistory.endDate).diff(dayjs(up.timeOffHistory.startDate), "day"),
                timeOffCategory: up.timeOff.category
            };
            setRequestSentDetails(details);
        }
        //Retrieve details for "Time off request approved/rejected" update
        else if (up.subject === "Your time off request has been approved" || 
        up.subject === "Your time off request has been rejected") {
            const details = {
                startDate: dayjs(up.timeOffHistory.startDate).format("MMM D, YYYY"),
                endDate: dayjs(up.timeOffHistory.endDate).format("MMM D, YYYY"),
                status: up.timeOffHistory.status,
                notes: up.timeOffHistory.note
            };
            setRequestResolvedDetails(details);
        }
        //Retrieve details for "Delete time off request" update
        else if (up.subject === "Employee would like to delete time off request") {
            const details = {
                notification: up,
                timeOffId: up.timeOffHistory.id,
                avatar: up.employee.photo,
                name: `${up.employee.firstName} ${up.employee.lastName}`,
                role: up.employee.role.roleTitle,
                email: up.employee.email,
                office: up.employee.officeLocation,
                effectiveDate: dayjs(up.employee.effectiveDate).format("DD/MM/YYYY"),
                timeOffBalance: (up.employeeAnnualTimeOff.hoursAllowed - 
                    up.employeeAnnualTimeOff.cumulativeHoursTaken),
                timeOffRequested: `${dayjs(up.timeOffHistory.startDate).format("DD/MM/YYYY")} - 
                    ${dayjs(up.timeOffHistory.endDate).format("DD/MM/YYYY")}`,
                requestedDaysTotal: dayjs(up.timeOffHistory.endDate).diff(dayjs(up.timeOffHistory.startDate), "day"),
                timeOffCategory: up.timeOff.category,
                status: up.timeOffHistory.status
            };
            setDeleteRequestDetails(details);
        }
        //Retrieve details for "Time off request deleted" update
        else if (up.subject === "Your time off request has been deleted") {
            const details = {
                timeOffBalance: (up.employeeAnnualTimeOff.hoursAllowed -
                    up.employeeAnnualTimeOff.cumulativeHoursTaken),
                timeOffRequested: `${dayjs(up.timeOffHistory.startDate).format("DD/MM/YYYY")} -
                    ${dayjs(up.timeOffHistory.endDate).format("DD/MM/YYYY")}`,
                requestedDaysTotal: dayjs(up.timeOffHistory.endDate).diff(dayjs(up.timeOffHistory.startDate), "day"),
                timeOffCategory: up.timeOff.category
            };
            setRequestDeletedDetails(details);
        }
        //Retrieve details for "Time off request not deleted" update
        else if (up.subject === "Your time off request was not deleted") {
            const details = {
                timeOffBalance: (up.employeeAnnualTimeOff.hoursAllowed -
                    up.employeeAnnualTimeOff.cumulativeHoursTaken),
                timeOffRequested: `${dayjs(up.timeOffHistory.startDate).format("DD/MM/YYYY")} -
                    ${dayjs(up.timeOffHistory.endDate).format("DD/MM/YYYY")}`,
                requestedDaysTotal: dayjs(up.timeOffHistory.endDate).diff(dayjs(up.timeOffHistory.startDate), "day"),
                timeOffCategory: up.timeOff.category
            };
            setRequestNotDeletedDetails(details);
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
                                backgroundColor: (checkNotificationStatus(update, currentUser) != "seen") ? "#F9FAFB" : "#FFFFFF",
                                border: "1px solid #EAECF0",
                            }}>
                                {/*Update status*/}
                                <TableCell>
                                    {checkNotificationStatus(update, currentUser) === "new" && <Label mode="status" dot="orange" label="New"/>}
                                    {checkNotificationStatus(update, currentUser) === "waiting" && <Label mode="status" dot="red" label="Waiting"/>}
                                    {checkNotificationStatus(update, currentUser) === "seen" && <Label mode="status" dot="grey" label="Seen"/>}
                                </TableCell>
                                {/*Update name and description*/}
                                <TableCell><b>{update.subject}</b></TableCell>
                                <TableCell>{update.message}</TableCell>
                                {/*Mark as read/unread button*/}
                                <TableCell align="right" sx={{paddingRight: 0, width: "16%"}}>
                                    <HRMButton mode="tertiary" onClick={() => handleSwitch(update)}>
                                        <b>Mark as {checkNotificationStatus(update, currentUser) === "seen" && 'un'}read</b>
                                    </HRMButton>
                                </TableCell>
                                {/*View button*/}
                                <TableCell align="right" sx={{paddingLeft: 0}}>
                                    <HRMButton 
                                        mode="tertiary" 
                                        onClick={() => {
                                            console.log("View button clicked");
                                            retrieveDetails(update);
                                            if (update.subject === "New team member added") {
                                                setNewMember(true);
                                            }
                                            else if (update.subject === "New time off request") {
                                                setApproval(true);
                                            }
                                            else if (update.subject === "Your time off request has been sent") {
                                                setRequestSent(true);
                                            }
                                            else if (update.subject === "Your time off request has been approved" || 
                                            update.subject === "Your time off request has been rejected") {
                                                setRequestResolved(true);
                                            }
                                            else if (update.subject === "Employee would like to delete time off request") {
                                                setDeleteRequest(true);
                                            }
                                            else if (update.subject === "Your time off request has been deleted") {
                                                setRequestDeleted(true);
                                            }
                                            else if (update.subject === "Your time off request was not deleted") {
                                                setRequestNotDeleted(true);
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
                <NewTeamMember 
                    employee_details={newMemberDetails} 
                    close={() => setNewMember(false)} 
                />
            </Dialog>
            {/*Time off request sent update popup component*/}
            <Dialog open={requestSent} onClose={() => setRequestSent(false)}>
                <TimeOffRequestSentWindow 
                    request_information={requestSentDetails} 
                    close={() => setRequestSent(false)} 
                />
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
            {/*Time off request approved/rejected popup component*/}
            <Dialog open={requestResolved} onClose={() => setRequestResolved(false)}>
                <TimeOffRequestResolved 
                    time_off_information={requestResolvedDetails}
                    close={() => setRequestResolved(false)}
                />
            </Dialog>
            {/*Delete time off request popup component*/}
            <Dialog open={deleteRequest} onClose={() => setDeleteRequest(false)}>
                <TimeOffConfirmDelete
                    request_information={deleteRequestDetails}
                    close={() => setDeleteRequest(false)}
                    refresh={() => {
                        setDeleteRequest(false);
                        handleSwitch(deleteRequestDetails.notification);
                    }}
                />
            </Dialog>
            {/*Time off period successfully deleted popup component*/}
            <Dialog open={requestDeleted} onClose={() => setRequestDeleted(false)}>
                <TimeOffDeleted
                    request_information={requestDeletedDetails}
                    close={() => setRequestDeleted(false)}
                />
            </Dialog>
            {/*Time off period not deleted popup component*/}
            <Dialog open={requestNotDeleted} onClose={() => setRequestNotDeleted(false)}>
                <TimeOffNotDeleted
                    request_information={requestNotDeletedDetails}
                    close={() => setRequestNotDeleted(false)}
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