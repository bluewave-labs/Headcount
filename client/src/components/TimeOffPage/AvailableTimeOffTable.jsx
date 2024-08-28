import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system';
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';

/**
 * Menu component for listing the available time off policies and the time used and available 
 * time left for each of them.
 * 
 * Props:
 * - policies<Array<Object>>: List of objects containing policy information to be displayed.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function AvailableTimeOffTable({policies, style}) {
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

    return (
        <TableContainer sx={{...{
            minWidth: "885px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <Table>
                {/*Table header*/}
                <TableHead>
                    <TableRow sx={{backgroundColor: "#F9FAFB"}}>
                        <TableHeaderCell sx={{width: "50%", paddingLeft: "25px"}}><b>Policy type</b></TableHeaderCell>
                        <TableHeaderCell><b>Available days</b></TableHeaderCell>
                        <TableHeaderCell><b>Hours used</b></TableHeaderCell>
                    </TableRow>
                </TableHead>
                {/*Policy information*/}
                <TableBody>
                    {policies.map((policy) => (
                        <TableRow>
                            <TableBodyCell sx={{width: "50%", paddingLeft: "25px"}}><b>{policy.type}</b></TableBodyCell>
                            <TableBodyCell>{policy.availableDays}</TableBodyCell>
                            <TableBodyCell>{policy.hoursUsed}</TableBodyCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

//Control panel settings for storybook
AvailableTimeOffTable.propTypes = {
    //Time off policies to be displayed
    policies: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
};

//Default values for this component
AvailableTimeOffTable.defaultProps = {
    style: {}
};