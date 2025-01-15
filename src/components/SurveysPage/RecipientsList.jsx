import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/system/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import { colors } from "../../Styles";

/**
 * Table component for displaying the list of survey recipients when creating a new survey.
 * 
 * Props:
 * - recipients<Array<Object>>: List of survey recipients to be displayed.
 * 
 * - setRecipients<Function>: Function provided by the parent component for setting the list of 
 *      survey recipients.
 *      Syntax: setRecipients(<list of recipients>)
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function RecipientsList({recipients, setRecipients, style}) {
    //Custom style elements
    const TableHeaderCell = styled(TableCell)({
        color: colors.darkGrey,
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "12px",
        paddingBottom: "12px"
    });

    const TableBodyCell = styled(TableCell)({
        color: colors.darkGrey,
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "16px",
        paddingBottom: "16px"
    });

    //Remove a recipient from the list
    function remove(id) {
        setRecipients(recipients.filter((rec) => rec.id !== id));
    };

    return (
        <TableContainer sx={style}>
            <Table>
                {/*Table header*/}
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                        <TableHeaderCell sx={{ paddingLeft: "65px" }}><b>Name</b></TableHeaderCell>
                        <TableHeaderCell><b>Team</b></TableHeaderCell>
                    </TableRow>
                </TableHead>
                {/*List all recipients*/}
                <TableBody>
                    {recipients.map((rec) => (
                        <TableRow>
                            <TableBodyCell>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                >   
                                    {/*Delete button*/}
                                    <CloseIcon onClick={() => remove(rec.id)} sx={{
                                        backgroundColor: "#FFFFFF",
                                        "&:hover": {
                                            cursor: "pointer",
                                            backgroundColor: "#D0D5DD"
                                        }
                                    }}/>
                                    {/*Recipient's name*/}
                                    <p>{rec.name}</p>
                                </Stack>
                            </TableBodyCell>
                            <TableBodyCell>
                                {/*Recipient's department*/}
                                <p>{rec.team}</p>
                            </TableBodyCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

//Control panel settings for storybook
RecipientsList.propTypes = {
    //List of survey recipients to be displayed
    recipients: PropTypes.array,

    //Function provided by the parent component for setting the list of survey recipients
    setRecipients: PropTypes.func
};

//Default values for this component
RecipientsList.defaultProps = {
    style: {}
};