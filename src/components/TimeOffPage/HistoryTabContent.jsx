import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import TuneIcon from '@mui/icons-material/Tune';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import UpcomingTimeOffTable from './UpcomingTimeOffTable';
import PagesNavBar from '../StaticComponents/PagesNavBar';
import MenuToggleButton from '../BasicMenus/MenuToggleButton';
import NoContentComponent from '../StaticComponents/NoContentComponent';
import Label from '../Label/Label';
import { colors, fonts } from '../../Styles';
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
 * Displays the content for the History tab in the time off menu which includes the complete time
 * off history for the current user. Displays up to 10 periods of time off at a time along with 
 * a customization menu and controls for navigating between pages of components.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function HistoryTabContent({style}) {
    const [currentPage, setCurrentPage] = useState(1);  //The current page number
    //Flags for determining which buttons in the "customize" dropdown are selected
    const [typeFilter, setTypeFilter] = useState(true);
    const [amountFilter, setAmountFilter] = useState(true);
    const [noteFilter, setNoteFilter] = useState(true);
    //Time off periods to be displayed
    const [timeOffPeriods, setTimeOffPeriods] = useState([]);
    //Flag for determining if records are being retrieved from the database
    const [loadingPeriods, setLoadingPeriods] = useState(false);
    

    //Filter table columns depending on which filters are active
    //"From", "To" and at least one other column will always be active
    const activeFilters = [];
    if (typeFilter) { activeFilters.push("Type"); }
    if (amountFilter) { activeFilters.push("Amount"); }
    if (noteFilter) { activeFilters.push("Note"); }

    //ID of the currently logged in employee
    const stateContext = useContext(StateContext);
    const currentUser = stateContext.state.employee ? stateContext.state.employee.empId : -1;

    //Refresh the list of time off periods
    useEffect(() => {
        getTimeOffPeriods();
    }, []);

    //Function for retrieving any past time off periods
    function getTimeOffPeriods() {
        //Send request to database for time off periods
        setLoadingPeriods(true);
        fetchAllByEmployee(currentUser)
        .then((data) => {
            if (data) {
                const periods = [];
                //const data = response.data;
                data.forEach((p) => {
                    //Only retrieve and display past periods
                    if (dayjs(p.startDate).isBefore(dayjs())) {
                        periods.push({
                            id: p.id,
                            from: formatDate(dayjs(p.startDate).toDate()),
                            to: formatDate(dayjs(p.endDate).toDate()),
                            type: p.timeOff.category,
                            hours: p.hours,
                            note: p.note
                        });
                    }
                });
                setTimeOffPeriods(periods);
            }
        })
        .finally(() => setLoadingPeriods(false));
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
            //marginTop: "40px",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Time off header*/}
            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between"
                sx={{ marginY: "16px" }}
            >
                <Stack direction="row" alignItems="center" spacing={3}>
                    <h3>Time off history</h3>
                    <Label 
                        mode="brand" 
                        label={timeOffPeriods.length} 
                        style={{borderRadius: "50%"}} 
                    />
                </Stack>
                {/*Customize button*/}
                {timeOffPeriods.length > 0 &&
                    <MenuToggleButton 
                        label="Customize" 
                        menuItems={{
                            "Type": [typeFilter, (value) => {
                                if (activeFilters.length >= 2 || !typeFilter) {setTypeFilter(value)}
                            }],
                            "Amount": [amountFilter, (value) => {
                                if (activeFilters.length >= 2 || !amountFilter) {setAmountFilter(value)}
                            }],
                            "Note": [noteFilter, (value) => {
                                if (activeFilters.length >= 2 || !noteFilter) {setNoteFilter(value)}
                            }]
                        }}
                        icon={<TuneIcon />} 
                    />
                }
            </Stack>
            {/*If there are periods of time off, display the time off period list and navbar */}
            {loadingPeriods ? 
                <CircularProgress sx={{marginX: "50%", marginY: "20%"}} /> :
                (timeOffPeriods.length > 0) ?
                    <>
                        {/*Upcoming time off table*/}
                        <UpcomingTimeOffTable 
                            timeOffPeriods={periodsToDisplay} 
                            tableColumns={activeFilters}
                            editFlag={false} 
                            //refresh={() => setRefresh(!refresh)}
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
HistoryTabContent.propTypes = {};

//Default values for this component
HistoryTabContent.defaultProps = {
    style: {}
};