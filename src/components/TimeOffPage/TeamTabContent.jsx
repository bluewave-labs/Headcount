import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import FilterListIcon from '@mui/icons-material/FilterList';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import UpcomingTimeOffTable from './UpcomingTimeOffTable';
import PagesNavBar from '../StaticComponents/PagesNavBar';
import NoContentComponent from '../StaticComponents/NoContentComponent';
import MenuToggleButton from '../BasicMenus/MenuToggleButton';
import Label from '../Label/Label';
import { colors, fonts } from '../../Styles';
import StateContext from '../../context/StateContext';
import { fetchAllByEmployee } from '../../assets/FetchServices/TimeOffHistory';
import { fetchMyTeam, fetchAll } from '../../assets/FetchServices/Employee';


//Function for parsing a JavaScript date into a string format.
function formatDate(date) {
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return `${month} ${day}, ${year}`;
};

/**
 * Displays the content for the Team tag in the time off menu which includes the time off periods
 * of every member of the user's team. Displays up to 10 periods of time off at a time along with 
 * controls for navigating between pages of components.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TeamTabContent({style}) {
    const [currentPage, setCurrentPage] = useState(1);  //The current page number
    //Flags for determining which buttons in the "filter by status" dropdown are selected
    const [approvedFilter, setApprovedFilter] = useState(true);
    const [waitingFilter, setWaitingFilter] = useState(true);
    const [rejectedFilter, setRejectedFilter] = useState(true);
    //Time off periods to be displayed
    const [timeOffPeriods, setTimeOffPeriods] = useState([]);
    //Flag for determining if records are being retrieved from the database
    const [loadingPeriods, setLoadingPeriods] = useState(false);
    

    //ID of the currently logged in employee
    const stateContext = useContext(StateContext);
    const isAdmin = stateContext.state.user && stateContext.state.user.permission.id === 1;
    const isManager = stateContext.state.user && stateContext.state.user.permission.id === 2;
    const currentUser = stateContext.state.employee ? stateContext.state.employee.empId : -1;


    //Set the current page back to 1 each time the filters are changed
    useEffect(() => {
        setCurrentPage(1);
    }, [approvedFilter, waitingFilter, rejectedFilter]);

    //Refresh the list of time off periods
    useEffect(() => {
        getTimeOffPeriods();
    }, []);

    //Function for retrieving all the time off periods for the current manager's team
    function getTimeOffPeriods() {
        if (isAdmin) {
            setLoadingPeriods(true);
            fetchAll()
            .then((data) => {
                //Retrieve all employee IDs in current team
                const team = data.map((emp) => emp.empId);
                const periods = [];
                //Retrieve the time off periods for each employee
                team.forEach((id) => {
                    fetchAllByEmployee(id)
                    .then((data) => {
                        if (data) {
                            data.forEach((p) => {
                                periods.push({
                                    id: p.id,
                                    user: {
                                        name: `${p.employee.firstName} ${p.employee.lastName}`,
                                        avatar: p.employee.photo
                                    },
                                    from: formatDate(dayjs(p.startDate).toDate()),
                                    to: formatDate(dayjs(p.endDate).toDate()),
                                    type: p.timeOff.category,
                                    hours: p.hours,
                                    note: p.note,
                                    status: p.status
                                });
                            })
                            setTimeOffPeriods([...timeOffPeriods, ...periods]);
                        }
                    })
                });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoadingPeriods(false));
        }
        else if (isManager) {
            setLoadingPeriods(true);
            fetchMyTeam(currentUser)
            .then((data) => {
                //Retrieve all employee IDs in current team
                const team = data.map((emp) => emp.empId);
                const periods = [];
                //Retrieve the time off periods for each employee
                team.forEach((id) => {
                    fetchAllByEmployee(id)
                    .then((data) => {
                        if (data) {
                            data.forEach((p) => {
                                periods.push({
                                    id: p.id,
                                    user: {
                                        name: `${p.employee.firstName} ${p.employee.lastName}`,
                                        avatar: p.employee.photo
                                    },
                                    from: formatDate(dayjs(p.startDate).toDate()),
                                    to: formatDate(dayjs(p.endDate).toDate()),
                                    type: p.timeOff.category,
                                    hours: p.hours,
                                    note: p.note,
                                    status: p.status
                                });
                            })
                            setTimeOffPeriods([...timeOffPeriods, ...periods]);
                        }
                    })
                });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoadingPeriods(false));
        }
    };

    //Filter out time off periods depending on which filters are active
    //At least one filter will always be active
    const activeFilters = [];
    if (approvedFilter) { activeFilters.push("Approved"); }
    if (waitingFilter) { activeFilters.push("Waiting"); }
    if (rejectedFilter) { activeFilters.push("Rejected"); }

    const filteredPeriods = timeOffPeriods.filter((period) => activeFilters.includes(period.status));

    //Only shows 10 periods at a time
    const periodsToDisplay = filteredPeriods.slice((currentPage - 1) * 10, currentPage * 10);

    //Function for changing the page number
    function handlePage(n) {
        if (n > 0 && n <= Math.ceil(timeOffPeriods.length / 10)) {
            setCurrentPage(n);
        }
    };

    return (
        <Box sx={{...{
            marginTop: "40px",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Time off header*/}
            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between"
                sx={{
                    marginY: "16px"
                }}
            >
                <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={3} 
                >
                    <h3>My team's history</h3>
                    <Label 
                        mode="brand" 
                        label={timeOffPeriods.length} 
                        style={{borderRadius: "50%"}} 
                    />
                </Stack>
                {/*Filter by status button*/}
                {timeOffPeriods.length > 0 &&
                    <MenuToggleButton 
                        label="Filter by status" 
                        menuItems={{
                            "Approved": [approvedFilter, (value) => {
                                if (activeFilters.length >= 2 || !approvedFilter) {setApprovedFilter(value)}
                            }],
                            "Waiting": [waitingFilter, (value) => {
                                if (activeFilters.length >= 2 || !waitingFilter) {setWaitingFilter(value)}
                            }],
                            "Rejected": [rejectedFilter, (value) => {
                                if (activeFilters.length >= 2 || !rejectedFilter) {setRejectedFilter(value)}
                            }]
                        }} 
                        icon={<FilterListIcon />} 
                    />
                }
            </Stack>
            {/*If there are periods of time off, display the time off period list and navbar */}
            {loadingPeriods ? 
                <CircularProgress sx={{marginX: "50%", marginY: "20%"}} /> :
                timeOffPeriods.length > 0 ?
                    <>
                        <UpcomingTimeOffTable 
                            timeOffPeriods={periodsToDisplay}
                            tableColumns={['Person', 'Type', 'Amount', 'Note', 'Status']}
                            editFlag={false}  
                            style={{marginBottom: "30px"}}
                        />
                        {filteredPeriods.length > 10 && 
                            <PagesNavBar 
                                numOfEntries={filteredPeriods.length} 
                                currentPage={currentPage}
                                handlePage={handlePage}
                            />
                        }
                    </> :
                    <>
                        {/*Otherwise, display a message that there is no history*/}
                        <NoContentComponent>
                            <h3>There is no time off history</h3>
                            <p>Any updates about your time off history will be shown here.</p>
                        </NoContentComponent>
                    </>
            }
        </Box>
    );
};

//Control panel settings for storybook
TeamTabContent.propTypes = {};

//Default values for this component
TeamTabContent.defaultProps = {
    style: {}
};