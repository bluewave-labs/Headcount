import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/system';
import Checkbox from '../Checkbox/Checkbox';
import { colors } from '../../Styles';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

/**
 * Table component for displaying time off options for each day in the TimeOffRequest component.
 * 
 * Props:
 * - dateRange<Array<Object>>: Array of dates in the range of the time off period.
 *      Syntax of date object: {
 *          date: <String>
 *          day: <String>
 *      }
 * 
 * - eachDay<Boolean>: Flag determining if every day in the date range should be displayed in the
 *      table.
 * 
 * - onChange<Function>: Function to handle changes made by the user to the radio buttons.
 *      Syntax: onChange()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffTable({
    dateRange, 
    eachDay,
    onChange,
    style
}) {

    //Function for setting the user input in the parent component
    function handleChange(e, index, value) {
        dateRange[index].day =  value;
        onChange();
    }

    //Sync the user input with the parent component 
    useEffect(() => {
        onChange();
    }, []);
    
    //Custom style elements
    const TableHeaderCell = styled(TableCell)({
        color: colors.darkGrey, 
        paddingTop: "10px",
        paddingBottom: "10px"
    });

    const TableBodyCell = styled(TableCell)({
        color: colors.darkGrey,
        paddingTop: "25px",
        paddingBottom: "25px"
    });

    const StyledChip = styled(Chip)({
        border: "1px solid #EAECF0",
        backgroundColor: "#F9FAFB"
    });

    return (
        <TableContainer sx={{...{
            width: "100%", 
            maxHeight: "260px", 
            marginY: "20px", 
            overflowY: "auto"
        }, ...style}}>
            <Table>
                {/*Table header*/}
                <TableHead>
                    <TableRow sx={{backgroundColor: "#F9FAFB"}}>
                        <TableHeaderCell><b>Day</b></TableHeaderCell>
                        <TableHeaderCell align="center"><b>Full day</b></TableHeaderCell>
                        <TableHeaderCell align="center"><b>Half day</b></TableHeaderCell>
                    </TableRow>
                </TableHead>
                {/*Table options*/}
                <TableBody>
                    {/*If the eachDay checkbox is selected, then display input options for each day*/}
                    {(eachDay) ? dateRange.map((day, index) => (
                        <TableRow>
                            <TableBodyCell>
                                <StyledChip label={<b>{day.date}</b>} />
                            </TableBodyCell>
                            <TableBodyCell align="center">
                                <Checkbox 
                                    type="radio" 
                                    name={day.date}
                                    value="full" 
                                    onChange={(e) => handleChange(e, index, "full")}
                                    checked={day.day === "full"}
                                />
                            </TableBodyCell>
                            <TableBodyCell align="center">
                                <Checkbox 
                                    type="radio" 
                                    name={day.date}
                                    value="half" 
                                    onChange={(e) => handleChange(e, index, "half")}
                                    checked={day.day === "half"}
                                />
                            </TableBodyCell>
                        </TableRow>
                    )) : (
                        <>
                            {/*Otherwise, only display the input options for the first and last day*/}
                            {dateRange.length > 0 &&
                                <TableRow>
                                    <TableBodyCell>
                                        <StyledChip label={<b>{dateRange[0].date}</b>} />
                                    </TableBodyCell>
                                    <TableBodyCell align="center">
                                        <Checkbox 
                                            type="radio" 
                                            name={dateRange[0].date}
                                            value="full" 
                                            onChange={(e) => handleChange(e, 0, "full")}
                                            checked={dateRange[0].day === "full"}
                                        />
                                    </TableBodyCell>
                                    <TableBodyCell align="center">
                                        <Checkbox 
                                            type="radio"
                                            name={dateRange[0].date}
                                            value="half"
                                            onChange={(e) => handleChange(e, 0, "half")}
                                            checked={dateRange[0].day === "half"}
                                        />
                                    </TableBodyCell>
                                </TableRow>
                            }
                            {dateRange.length > 1 &&
                                <TableRow>
                                    <TableBodyCell>
                                        <StyledChip label={<b>{dateRange[dateRange.length - 1].date}</b>} />
                                    </TableBodyCell>
                                    <TableBodyCell align="center">
                                        <Checkbox 
                                            type="radio" 
                                            name={dateRange[dateRange.length - 1].date}
                                            value="full" 
                                            onChange={(e) => handleChange(e, dateRange.length -1, "full")}
                                            checked={dateRange[dateRange.length - 1].day === "full"}
                                        />
                                    </TableBodyCell>
                                    <TableBodyCell align="center">
                                        <Checkbox 
                                            type="radio"
                                            name={dateRange[dateRange.length - 1].date}
                                            value="half"
                                            onChange={(e) => handleChange(e, dateRange.length - 1, "half")}
                                            checked={dateRange[dateRange.length - 1].day === "half"}
                                        />
                                    </TableBodyCell>
                                </TableRow>
                            }
                        </>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

//Control panel settings for storybook
TimeOffTable.propTypes = {
    //Array of dates in the range of the time off period.
    dateRange: PropTypes.arrayOf(PropTypes.string),

    //Flag determining if every day in the date range should be displayed in the table.
    eachDay: PropTypes.bool,

    //Function to handle changes made by the user to the radio buttons.
    onChange: PropTypes.func
};

//Default values for this component
TimeOffTable.defaultProps = {
    style: {}
};