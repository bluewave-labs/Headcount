import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import Dialog from "@mui/material/Dialog";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { useState } from "react";
import PropTypes from "prop-types";
import HRMButton from "../Button/HRMButton";
import SurveyResponsePopup from "../PopupComponents/SurveyResponsePopup";
import { colors } from "../../Styles";

/**
 * Content component for displaying employees who have completed surveys and their responses.
 * 
 * Props:
 * - responseList<Array<Object>>: List of employees who have completed the survey and their responses.
 *      Syntax: {
 *          name: <String>
 *          team: <String>
 *          responses: <Array<Object>>
 *      }
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function SurveyResponses({responseList, style}) {
    //State determining whether the survey result popup component should be displayed
    const [surveyPopup, setSurveyPopup] = useState(false);
    //Index of the current selected survey. Used to navigate between surveys in the popups
    const [surveyIndex, setSurveyIndex] = useState(null);
    const [filterName, setFilterName] = useState("");
    const [filterTeam, setFilterTeam] = useState("");

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

    //Employee entries after filtering by employee name and department
    const filteredRes = responseList.filter(
        (res) => res.name.toLowerCase().includes(filterName.toLowerCase()) && 
        res.teamName.toLowerCase().includes(filterTeam.toLowerCase())
    );

    //Functions for incrementing and decrementing the selected survey index
    function previousIndex() {
        if (surveyIndex > 0) {
            setSurveyIndex(surveyIndex - 1);
        }
    }

    function nextIndex() {
        if (surveyIndex < filteredRes.length - 1) {
            setSurveyIndex(surveyIndex + 1);
        }
    }

    return (
        <Box sx={{...{
            width: "692px"
        }, ...style}}>
            {/*Text fields for filtering results*/}
            <Stack 
                direction="row" 
                alignContent="center" 
                justifyContent="flex-start"
                spacing={1}
                sx={{marginBottom: "20px"}}
            >
                <TextField 
                    placeholder="Search employee name" 
                    size="small" 
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    sx={{width: "265px"}} 
                    slotProps={{
                        input: {
                            endAdornment: <CloseIcon 
                                onClick={() => setFilterName("")}
                                sx={{
                                    color: colors.lightGrey,
                                    "&:hover": {
                                        cursor: "pointer"
                                    }
                                }} 
                            />
                        }
                    }}
                />
                <TextField 
                    placeholder="Filter by team" 
                    size="small" 
                    value={filterTeam}
                    onChange={(e) => setFilterTeam(e.target.value)}
                    sx={{width: "265px"}} 
                    slotProps={{
                        input: {
                            endAdornment: <CloseIcon 
                                onClick={() => setFilterTeam("")}
                                sx={{
                                    color: colors.lightGrey,
                                    "&:hover": {
                                        cursor: "pointer"
                                    }
                                }}
                            />
                        }
                    }}
                />
            </Stack>
            {/*Table of employees*/}
            <TableContainer sx={{width: "100%"}}>
                <Table>
                    {/*Table header*/}
                    <TableHead>
                        <TableRow sx={{backgroundColor: "#F9FAFB"}}>
                            <TableHeaderCell><b>Name</b></TableHeaderCell>
                            <TableHeaderCell colSpan={2}><b>Team</b></TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    {/*Employee entries*/}
                    <TableBody>
                        {filteredRes.map((res, index) => (
                            <TableRow>
                                <TableBodyCell>{res.name}</TableBodyCell>
                                <TableBodyCell>{res.teamName}</TableBodyCell>
                                <TableBodyCell>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="flex-end"
                                    >
                                        <HRMButton 
                                            mode="tertiary" 
                                            onClick={() => {
                                                setSurveyIndex(index);
                                                setSurveyPopup(true);
                                            }}
                                        >
                                            <b style={{color: colors.purple}}>View</b>
                                        </HRMButton>
                                    </Stack>
                                </TableBodyCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*Survey response popup*/}
            <Dialog open={surveyPopup} onClose={() => setSurveyPopup(false)} maxWidth="md" fullWidth>
                <SurveyResponsePopup 
                    survey={filteredRes[surveyIndex]} 
                    hasPrev={surveyIndex > 0}
                    prev={previousIndex}
                    hasNext={surveyIndex < filteredRes.length - 1}
                    next={nextIndex}
                />
            </Dialog>
        </Box>
    );
};

//Control panel settings for storybook
SurveyResponses.propTypes = {
    //List of employees who have completed the survey and their responses
    responseList: PropTypes.array
};

//Default values for this component
SurveyResponses.defaultProps = {
    style: {}
};