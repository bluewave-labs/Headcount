import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState, useEffect, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import DateSelect from './DateSelect';
import Checkbox from '../Checkbox/Checkbox';
import HRMButton from '../Button/HRMButton';
import TimeOffTable from './TimeOffTable';
import { colors, fonts } from '../../Styles';
import StateContext from '../../context/StateContext';
import { fetchAllByEmployee, createOne as createOnePeriod, update as updatePeriod } from '../../assets/FetchServices/TimeOffHistory';
import { fetchOne, update as updatePolicy } from '../../assets/FetchServices/EmployeeAnnualTimeOff';


//Function for determining if a time period is valid. A time period is only valid if the
//starting date is before or on the same day as the ending date.
function isValidPeriod(from, to) {
    if (from.getFullYear() < to.getFullYear()) {
        return true;
    } 
    else if (from.getFullYear() === to.getFullYear()) {
        if (from.getMonth() < to.getMonth()) {
            return true;
        } 
        else if (from.getMonth() === to.getMonth()) {
            return from.getDate() <= to.getDate();
        } 
        else {
            return false;
        }
    } else {
        return false;
  }
};

//Function for parsing a JavaScript date into a string format.
function formatDate(date) {
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return `${month} ${day}, ${year}`;
};

/**
 * Popup component for displaying the form for submitting a time off request. Includes controls
 * for setting the time off policy, the length of the time off period and the amount of time
 * off per day.
 *
 * Props:
 * - close<Function>: Function for closing this popup component.
 *      Syntax: close()
 *
 * - sendRequest<Function>: Function for submitting a time off request.
 *      Syntax: sendRequest()
 *
 * - initialRequest<Object>: When editing a time off request, this object shows the original
 *      details of the request
 *      Syntax: {
 *          id: <Integer>
 *          timeOffId: <Integer>
 *          from: <Date>
 *          to: <Date>
 *          hours: <Float>
 *          type: <String>
 *      }
 *
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffRequest({
  close,
  sendRequest,
  initialRequest,
  style,
}) {
    //Time off policy menu
    const [categoryMenu, setCategoryMenu] = useState([]);
    //Selected time off policy
    const [category, setCategory] = useState(null);
    //Time off starting and ending dates
    const [from, setFrom] = useState(
        initialRequest ? initialRequest.from : dayjs().toDate()
    );
    const [to, setTo] = useState(
        initialRequest ? initialRequest.to : dayjs().toDate()
    );
    //States determining whether the menus for setting dates should be open
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    //Range of dates between the starting and ending date
    const [dateRange, setDateRange] = useState(getDateRange());
    const [timeOffDates, setTimeOffDates] = useState([]);
    //Total number of hours, full days and half days off
    const [totalHoursOff, setTotalHoursOff] = useState(0);
    const [fullDaysOff, setFullDaysOff] = useState(0);
    const [halfDaysOff, setHalfDaysOff] = useState(0);
    //Flag determining if the amount of time off should be set for each day or for just the
    //starting and ending dates
    const [eachDay, setEachDay] = useState(false);
    //Flag determining if there is enough time off balance for the given policy to grant the
    //requested time off amount
    const [sufficientTime, setSufficientTime] = useState(true);
    //Flag determining if the time off periods conflict with each other
    const [validDates, setValidDates] = useState(true);
    //Flag determining if an error has occured
    const [errorOccurred, setErrorOccurred] = useState(false);

    //Retrieve policy category options
    useEffect(() => {
        getTimeOffPolicies();
        getUpcomingTimeOffDates();
    }, []);

    //Ensure there is no overlap between existing time off periods
    useEffect(() => {
        setValidDates(validateDates());
    }, [timeOffDates]);

    //Set initial time off policy option
    useEffect(() => {
        setCategory(
            initialRequest ? 
            categoryMenu.filter((item) => item.timeOffId === initialRequest.timeOffId)[0] : 
            categoryMenu[0]
        );
    }, [categoryMenu]);
    
    //Validate time off request duration when changing time off policies
    useEffect(() => {
        if (category) {
            setSufficientTime(totalHoursOff <= category.availableHours); 
        }
    }, [category]);

    //Automatically adjust or validate dates to ensure a valid period is set
    useEffect(() => {
        if (!isValidPeriod(from, to)) {
            setTo(from);
        }
        setDateRange(getDateRange());
        calculateTimeOffHours();
        setValidDates(validateDates());
    }, [from]);

    useEffect(() => {
        if (!isValidPeriod(from, to)) {
            setFrom(to);
        }
        setDateRange(getDateRange());
        calculateTimeOffHours();
        setValidDates(validateDates());
    }, [to]);

    //Custom style elements
    const Header4 = styled("h4")({
        marginBottom: "10px"
    });

    const MemoTimeOffTable = memo(TimeOffTable);

    //ID of the currently logged in employee
    const stateContext = useContext(StateContext);
    const currentUser = stateContext.state.employee ? stateContext.state.employee.empId : -1;

    //Function for retrieving the time off category options
    function getTimeOffPolicies() {
        //Retrieve employeeAnnualTimeOff records from database
        fetchOne(currentUser)
        .then((data) => {
            if (data) {
                const policies = {};
                //We are only interested in the records for the current year
                const filteredData = data.filter((p) => p.year === dayjs().year());
                filteredData.forEach((p) => {
                    policies[p.category] = {
                        id: p.id,
                        timeOffId: p.timeOffId,
                        type: p.category,
                        availableHours: p.hoursLeft + ((initialRequest && initialRequest.timeOffId === p.timeOffId) ? initialRequest.hours : 0),
                        hoursUsed: p.hoursUsed
                    }
                });
                //Set each policy as a selectable item in the dropdown
                setCategoryMenu(Object.values(policies));
            }
        });
    };

    //Function for retrieving the dates of the upcoming time off periods for ensuring there are
    //no conflicts between time off periods
    function getUpcomingTimeOffDates() {
        //Send request to database for time off periods
        fetchAllByEmployee(currentUser)
        .then((data) => {
            if (data) {
                let periods = [];
                data.forEach((p) => {
                    //Only retrieve periods that are upcoming
                    if (dayjs(p.startDate).isSameOrAfter(dayjs().subtract(1, "day")) && 
                        (p.status === "Approved" || p.status === "Pending")) 
                    {
                        periods.push({
                            id: p.id,
                            from: dayjs(p.startDate).toDate(),
                            to: dayjs(p.endDate).toDate(),
                        });
                    }
                });
                //If we are editing an existing period, then this period should not be included
                if (initialRequest) {
                    periods = periods.filter((p) => p.id !== initialRequest.id);
                }
                setTimeOffDates(periods);
            }
        })
    };

    //Date range for setting full and half days off
    function getDateRange() {
        const range = [];
        for (
            let d = new Date(from);
            isValidPeriod(d, to);
            d.setDate(d.getDate() + 1)
        ) {
            const data = {
                date: formatDate(new Date(d)),
                day: "full", // full by default
            };
            range.push(data);
        }
        return range;
    };

    //Calculate the total hours, full days and half days off based on the radio inputs selected
    function calculateTimeOffHours() {
        let totalHours = 0;
        let fullDays = 0;
        let halfDays = 0;
        //If setting the time off for each day individually
        if (eachDay) {
            //Iterate through each day, calculating the time off hours individually
            dateRange.forEach((d) => {
                if (d.day === "half") {
                    totalHours += 4;
                    halfDays++;
                } 
                else {
                    totalHours += 8;
                    fullDays++;
                }
            });
        } 
        //If only setting time off for the first and last day
        else {
            if (dateRange.length === 0) {
                return;
            }
            let d = dateRange[0];
            //Calculate the time off hours for the first day
            if (d.day === "half") {
                totalHours += 4;
                halfDays++;
            } 
            else {
                totalHours += 8;
                fullDays++;
            }
            if (dateRange.length >= 2) {
                d = dateRange[dateRange.length - 1];
                //Calculate the time off hours for the last day
                if (d.day === "half") {
                    totalHours += 4;
                    halfDays++;
                } else {
                    totalHours += 8;
                    fullDays++;
                }
                //Assume all days in between are full days off
                totalHours += (dateRange.length - 2) * 8;
                fullDays += dateRange.length - 2;
            }
        }
        setTotalHoursOff(totalHours);
        setFullDaysOff(fullDays);
        setHalfDaysOff(halfDays);
        //If the amount of time off requested exceeds what the selected time off policy allows,
        //then the send or update button will be disabled
        if (category) { 
            setSufficientTime(totalHours <= category.availableHours); 
        }
    };

    //Function for determining if the current time off request would overlap with any upcoming
    //time off periods
    function validateDates() {
        for (const p of timeOffDates) {
            if ((isValidPeriod(p.from, from) && isValidPeriod(from, p.to)) || 
                (isValidPeriod(p.from, to) && isValidPeriod(to, p.to)) ||
                (isValidPeriod(from, p.from) && isValidPeriod(p.to, to)))
            {
                return false;
            }
        };
        return true;
    };

    //Function for submitting a time off request
    function handleSubmit() {
        //Create and submit a new time off period to the database
        const newPeriod = {
            startDate: dayjs(from).toString(),
            endDate: dayjs(to).toString(),
            hours: totalHoursOff,
            empId: currentUser,
            timeOffId: category.timeOffId,
            requestDate: dayjs().toString(),
            decisionDate: dayjs().add(1, "day").toString()
        };
        createOnePeriod(newPeriod).then((data) => {
            if (data) {
                //console.log(data);
                //Update the time off balance
                const newBalance = {
                    id: category.id,
                    cumulativeHoursTaken: category.hoursUsed + totalHoursOff
                };
                updatePolicy(newBalance).then((data) => {
                    //console.log(data);
                    sendRequest();
                });
            }
            else {
                setErrorOccurred(true);
            }
        });
    };

    //Function for modifying an existing time off request
    function handleEdit() {
        //Update the initial time off period
        const updatedPeriod = {
            id: initialRequest.id,
            startDate: dayjs(from).toString(),
            endDate: dayjs(to).toString(),
            hours: totalHoursOff,
            timeOffId: category.timeOffId,
            status: "Pending"
        };
        updatePeriod(updatedPeriod).then((data) => {
            if (data) {
                //console.log(data);
                //If the time off policy has changed
                if (initialRequest.timeOffId !== category.timeOffId) {
                    //Refund the hours used in the original policy
                    const refundBalance = {
                        //Need to get employeeAnnualTimeOff id
                        id: categoryMenu.filter((p) => p.timeOffId === initialRequest.timeOffId)[0].id,
                        cumulativeHoursTaken: categoryMenu.filter((p) => p.timeOffId === initialRequest.timeOffId)[0].hoursUsed - initialRequest.hours
                    };
                    updatePolicy(refundBalance).then((data) => {
                        //console.log(data);
                        //Subtract the hours used in the new policy
                        const newBalance = {
                            id: category.id,
                            cumulativeHoursTaken: category.hoursUsed + totalHoursOff
                        };
                        updatePolicy(newBalance).then((data) => {
                            //console.log(data);
                            sendRequest();
                        });
                    });
                }
                //If the time off policy is the same but the amount of time off has changed
                else if (initialRequest.hours !== totalHoursOff) {
                    //Update the new balance for the current policy
                    const newBalance = {
                        id: category.id,
                        cumulativeHoursTaken: category.hoursUsed + totalHoursOff - initialRequest.hours
                    };
                    updatePolicy(newBalance).then((data) => {
                        //console.log(data);
                        sendRequest();
                    });
                }
                else {
                    sendRequest();
                }
            }
            else {
                setErrorOccurred(true);
            }
        });
    };

    return (
        <Box sx={{...{
            borderRadius: "12px",
            boxShadow: "0 15px 6px #10182808",
            paddingX: "36px",
            paddingY: "30px",
            minWidth: "532px",
            minHeight: "500px",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily,
        }, ...style}}>
        {/*Title*/}
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
                marginBottom: "30px",
            }}
        >
            {initialRequest ? <h3>Edit my time off</h3> : <h3>Request new time off</h3>}
            <CloseIcon
                onClick={close}
                sx={{
                    backgroundColor: "#FFFFFF",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#D0D5DD",
                    },
                }}
            />
        </Stack>
            {/*Set time off category*/}
            <Header4>Time off category</Header4>
            <Select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                    width: "100%",
                    marginBottom: "30px",
                }}
            >
                {categoryMenu.map((option) => (
                    <MenuItem value={option}>
                        {option.type} - left: {Math.floor(option.availableHours / 8)} days ({option.availableHours} hours)
                    </MenuItem>
                ))}
            </Select>
            {/*Set starting and ending dates of time off period*/}
            <Stack
                direction="row"
                alignItems="center"
                spacing={4}
                sx={{ marginBottom: "40px" }}
            >
                <Box>
                    <Header4>From</Header4>
                    <Chip
                        icon={<CalendarMonthIcon />}
                        label={formatDate(from)}
                        variant="outlined"
                        onClick={() => setOpenFrom(true)}
                        disableTouchRipple
                        sx={{ borderRadius: "4px" }}
                    />
                </Box>
                <Box>
                    <Header4>To</Header4>
                    <Chip
                        icon={<CalendarMonthIcon />}
                        label={formatDate(to)}
                        variant="outlined"
                        onClick={() => setOpenTo(true)}
                        disableTouchRipple
                        sx={{ borderRadius: "4px" }}
                    />
                </Box>
            </Stack>
            {/*Set amount of time off per day*/}
            <Header4>Amount</Header4>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Checkbox
                    type="checkbox"
                    id="setHours"
                    name="setHours"
                    value="setHours"
                    size="large"
                    onChange={() => setEachDay(!eachDay)}
                    style={{ marginRight: "10px" }}
                />
                <p>Set hours for each day during the time off period</p>
            </Stack>
            {/*Time off per day table*/}
            <MemoTimeOffTable
                dateRange={dateRange}
                eachDay={eachDay}
                onChange={calculateTimeOffHours}
            />
            {/*Time off summary*/}
            <p style={{ marginBottom: "30px" }}>
                {fullDaysOff} full days ({fullDaysOff * 8} hrs) and {halfDaysOff} half
                day ({halfDaysOff * 4} hrs) will be requested ({totalHoursOff} hrs in
                total).
            </p>
            {/*Warning message when editing an already approved request*/}
            {(initialRequest && initialRequest.status === "Approved") && 
                <h4 style={{color: "#F79009", marginBottom: "15px"}}>
                    This time off request has already been approved. If you make any changes to 
                    this request, it will need to be approved again.
                </h4>
            }
            {/*Validation messages to be displayed if the request being submitted is invalid */}
            {!validDates && <h4 style={{color: "#D92D20", marginBottom: "15px"}}>
                Your time off request dates overlap with existing upcoming time off periods.
            </h4>}
            {!sufficientTime && <h4 style={{color: "#D92D20", marginBottom: "15px"}}>
                You are requesting {totalHoursOff} hours off. The selected time off policy only 
                has {category.availableHours} hours available.
            </h4>}
            {/*Error message to be displayed if an error occurs*/}
            {errorOccurred && <h4 style={{color: "#D92D20", marginBottom: "15px"}}>
                An error occurred. Could not send time off request.
            </h4>}
            {/*Send or cancel*/}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={3}
            >
                <HRMButton mode="secondaryB" onClick={close}>
                Cancel
                </HRMButton>
                {initialRequest ? (
                <HRMButton mode="primary" onClick={handleEdit} enabled={sufficientTime && validDates}>
                    Update
                </HRMButton>
                ) : (
                <HRMButton mode="primary" onClick={handleSubmit} enabled={sufficientTime && validDates}>
                    Send
                </HRMButton>
                )}
            </Stack>
            {/*Popup components for setting starting and ending dates*/}
            <Dialog open={openFrom} onClose={() => setOpenFrom(false)}>
                <DateSelect close={() => setOpenFrom(false)} setDate={setFrom} initialValue={from} />
            </Dialog>
            <Dialog open={openTo} onClose={() => setOpenTo(false)}>
                <DateSelect close={() => setOpenTo(false)} setDate={setTo} initialValue={to} />
            </Dialog>
        </Box>
    );
};

//Control panel settings for storybook
TimeOffRequest.propTypes = {
    //The function to close this component
    close: PropTypes.func,

    //The function to send the request and close this component
    sendRequest: PropTypes.func,

    //When editing a time off request, this object shows the original details of the request
    initialRequest: PropTypes.object
};

//Default values for this component
TimeOffRequest.defaultProps = {
    initialRequest: null,
    style: {},
};
