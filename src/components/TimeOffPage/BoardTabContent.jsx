import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import AvailableTimeOffTable from './AvailableTimeOffTable';
import UpcomingTimeOffTable from './UpcomingTimeOffTable';
import PagesNavBar from '../StaticComponents/PagesNavBar';
import Label from '../Label/Label';
import { colors, fonts } from '../../Styles';
import { fetchOne } from '../../assets/FetchServices/EmployeeAnnualTimeOff';
import { fetchAllByEmployee } from '../../assets/FetchServices/TimeOffHistory';
import StateContext from '../../context/StateContext';

//Function for parsing a JavaScript date into a string format.
function formatDate(date) {
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return `${month} ${day}, ${year}`;
};

/**
 * Displays the content for the Board tab in the time off menu which includes the available
 * time off per policy and any upcoming periods of time off scheduled.
 * 
 * Props:
 * - update<Boolean>: Flag for triggering the useEffect hook.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function BoardTabContent({update, style}) {
    //The current page number 
    const [currentPage, setCurrentPage] = useState(1);  
    //Time off policies to be displayed
    const [timeOffPolicies, setTimeOffPolicies] = useState({});
    //Time off periods to be displayed
    const [timeOffPeriods, setTimeOffPeriods] = useState([]);
    //Hook for refreshing the list of time off periods
    const [refresh, setRefresh] = useState(false);
    //Flag for determining if records are being retrieved from the database
    const [loadingPolicies, setLoadingPolicies] = useState(false);
    const [loadingPeriods, setLoadingPeriods] = useState(false);

    //ID of the currently logged in employee
    const stateContext = useContext(StateContext);
    const currentUser = stateContext.state.employee ? stateContext.state.employee.empId : -1;

    //console.log(update);
    
    dayjs.extend(isSameOrAfter);

    //Refresh the list of time off periods
    useEffect(() => {
        getTimeOffPolicies();
        getUpcomingTimeOffPeriods();
    }, [refresh, update]);

    //Function for retrieving the time off policies and their respective hours used and available
    function getTimeOffPolicies() {
        //Send request to database for time off policies
        setLoadingPolicies(true);
        fetchOne(currentUser).then((data) => {
            if (data) {
                //console.log(data);
                const policies = {};
                //Only display the information for the current year
                const filteredData = data.filter((p) => p.year === dayjs().year());
                filteredData.forEach((p) => {
                    policies[p.category] = {
                        id: p.timeOffId,
                        type: p.category,
                        availableHours: p.hoursLeft,
                        hoursUsed: p.hoursUsed
                    }
                });
                setTimeOffPolicies(policies);
            }
        }).finally(() => setLoadingPolicies(false));
    }

    //Function for retrieving any upcoming time off periods
    function getUpcomingTimeOffPeriods() {
        //Send request to database for time off periods
        setLoadingPeriods(true);
        fetchAllByEmployee(currentUser).then((data) => {
            if (data) {
                const periods = [];
                //const data = response.data;
                data.forEach((p) => {
                    //Only retrieve and display periods that are upcoming
                    if (dayjs(p.startDate).isSameOrAfter(dayjs().subtract(1, "day")) && (["Approved", "Pending", "Deleting"].includes(p.status))) {
                        periods.push({
                            id: p.id,
                            timeOffId: p.timeOffId,
                            from: formatDate(dayjs(p.startDate).toDate()),
                            to: formatDate(dayjs(p.endDate).toDate()),
                            type: p.timeOff.category,
                            hours: p.hours,
                            note: p.note,
                            status: p.status
                        });
                    }
                });
                setTimeOffPeriods(periods);
            }
        }).finally(() => setLoadingPeriods(false));
    };

    //Only shows 10 periods at a time
    const periodsToDisplay = timeOffPeriods.slice((currentPage - 1) * 10, currentPage * 10);

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
            {/*Available time off header and table*/}
            <h3 style={{marginBottom: "16px"}}>Available time offs</h3>

            <AvailableTimeOffTable policies={timeOffPolicies} />
            {/*Upcoming time off header*/}
            {loadingPolicies ? 
                <CircularProgress sx={{marginX: "50%", marginY: "10%"}} /> :
                <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={2} 
                    sx={{marginTop: "50px", marginBottom: "16px"}}
                >
                    <h3>Upcoming time offs</h3>
                    <Label 
                        mode="brand" 
                        label={timeOffPeriods.length} 
                        style={{borderRadius: "50%"}} 
                    />
                </Stack>
            }
            {loadingPeriods ?
                <CircularProgress sx={{marginX: "50%", marginY: "10%"}} /> :
                timeOffPeriods.length > 0 ?
                    <>
                        {/*Upcoming time off table*/}
                        <UpcomingTimeOffTable 
                            timeOffPeriods={periodsToDisplay} 
                            tableColumns={['Type', 'Amount', 'Note', 'Status']}
                            editFlag={true} 
                            refresh={() => setRefresh(!refresh)}
                            style={{marginBottom: "30px"}}
                        />
                        {/*Upcoming time off navbar*/}
                        {timeOffPeriods.length > 10 &&
                            <PagesNavBar 
                                numOfEntries={timeOffPeriods.length} 
                                currentPage={currentPage} 
                                handlePage={handlePage}
                            /> 
                        }  
                    </> :
                    <p>There is no upcoming time off right now.</p>
                
            }
        </Box>
    );
};

//Control panel settings for storybook
BoardTabContent.propTypes = {};

//Default values for this component
BoardTabContent.defaultProps = {
    style: {}
};