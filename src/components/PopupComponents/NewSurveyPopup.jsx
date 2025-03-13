import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
//import Select from "@mui/material/Select";
//import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Dialog from "@mui/material/Dialog";
import Autocomplete from "@mui/material/Autocomplete";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { fetchAll as fetchAllEmployees } from "../../assets/FetchServices/Employee";
import { fetchAll as fetchAllTeams } from "../../assets/FetchServices/Team";
import { createOne, update } from "../../assets/FetchServices/SatisfactionSurvey";
import DateSelect from "./DateSelect";
import HRMButton from "../Button/HRMButton";
//import Checkbox from "../Checkbox/Checkbox";
import QuestionsList from "../SurveysPage/QuestionsList";
import RecipientsList from "../SurveysPage/RecipientsList";
import { fonts, colors } from "../../Styles";
const BASE_URL = require("../../assets/FetchServices/BaseUrl.json").value;

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
 * Popup component for displaying the menu for creating a new survey. The user decides the name,
 * messages and questions before finally reviewing and creating the survey.
 * 
 * Props:
 * - close<Function>: Function for closing this popup component.
 *      Syntax: close()
 * 
 * - refresh<Function>: Function provided by the parent component for refreshing the survey list.
 *      Syntax: refresh()
 * 
 * - initialSurvey<Object>: When editing a survey, this object shows the original details of the survey.
 *      Syntax: {
 *          anonymous: <Boolean>
 *          name: <String>
 *          welcomeTitle: <String>
 *          welcomeMessage: <String>
 *          endTitle: <String>
 *          endMessage: <String>
 *          startedAt: <String>
 *          completedAt: <String>
 *          satisfactionSurveyQuestions: <Array<Object>>
 *          satisfactionSurveyRecipients: <Array<Object>>
 *          frontendUrl: <String>
 *      }
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function NewSurveyPopup({close, refresh, initialSurvey, style}) {
    //Page number outlining the stage of the new survey creation
    const [pageNumber, setPageNumber] = useState(1);
    //Flag determining if a previous survey should be used
    //const [usePrevious, setUsePrevious] = useState(false);
    //Flag determining if the popup for choosing the survey start date is open
    const [openStartDate, setOpenStartDate] = useState(false);
    //Flag determining if the popup for choosing the survey end date is open
    const [openEndDate, setOpenEndDate] = useState(false);
    //The text to be added when adding a new question
    const [newQuestionText, setNewQuestionText] = useState("");
    //The option selected when adding a new recipient for the survey
    const [newRecipient, setNewRecipient] = useState(null);
    //All the relevant information regarding the new survey to be created
    const [newSurvey, setNewSurvey] = useState(initialSurvey ? {
        id: initialSurvey.id,
        anonymous: initialSurvey.anonymous,
        name: initialSurvey.name,
        welcomeTitle: initialSurvey.welcomeTitle,
        welcomeMessage: initialSurvey.welcomeMessage,
        endTitle: initialSurvey.endTitle,
        endMessage: initialSurvey.endMessage,
        startedAt: initialSurvey.startedAt,
        completedAt: initialSurvey.completedAt,
        satisfactionSurveyQuestions: initialSurvey.satisfactionSurveyQuestions,
        satisfactionSurveyRecipients: initialSurvey.satisfactionSurveyRecipients,
        frontendUrl: initialSurvey.frontendUrl
    } : {
        anonymous: false,
        name: "",
        welcomeTitle: "",
        welcomeMessage: "",
        endTitle: "",
        endMessage: "",
        startedAt: dayjs().toISOString(),
        completedAt: dayjs().toISOString(),
        satisfactionSurveyQuestions: [],
        satisfactionSurveyRecipients: [],
        frontendUrl: BASE_URL
    });
    //Options when selecting survey recipients
    const [recipientOptions, setRecipientOptions] = useState([]);
    const [recipientTeams, setRecipientTeams] = useState([]);
    //Validation states for determining if error messages should be displayed
    const [validation, setValidation] = useState({
        1: false,
        2: false,
        3: false,
        4: false
    });

    //Retrieve all options for survey recipient selection when the popup is opened
    useEffect(() => {
        console.log(newSurvey);
        getAllTeams();
        getAllRecipients();
    }, [])

    //Automatically adjust or validate dates to ensure a valid period is set
    useEffect(() => {
        if (!isValidPeriod(dayjs(newSurvey.startedAt).toDate(), dayjs(newSurvey.completedAt).toDate())) {
            setNewSurvey({...newSurvey, completedAt: newSurvey.startedAt});
        }
    }, [newSurvey.startedAt]);

    useEffect(() => {
        if (!isValidPeriod(dayjs(newSurvey.startedAt).toDate(), dayjs(newSurvey.completedAt).toDate())) {
            setNewSurvey({...newSurvey, startedAt: newSurvey.completedAt});
        }
    }, [newSurvey.completedAt]);

    //Remove any validation messages five seconds after they have appeared
    useEffect(() => {
        if (Object.entries(validation).some((value) => value[1])) {
            setTimeout(() => setValidation({
                1: false,
                2: false,
                3: false,
                4: false
            }), "5000");
        }
    }, [validation]);

    //Retrieve all teams to populate survey recipient options
    function getAllTeams() {
        fetchAllTeams().then((data) => {
            const teams = [
                ...[{ category: "Team", name: "Everyone" }],
                ...data.map((t) => {
                    return {
                        category: "Team",
                        name: t.teamName
                    }
                })
            ];
            //console.log(teams);
            setRecipientTeams(teams);
        });
    };

    //Retrieve all employees to populate survey recipient options
    function getAllRecipients() {
        fetchAllEmployees().then((data) => {
            const employees = data.map((e) => {
                return {
                    empId: e.empId,
                    category: "Employee",
                    teamName: e.team.teamName,
                    name: `${e.firstName} ${e.lastName}`
                }
            });
            //console.log(employees);
            setRecipientOptions(employees);
        });
    };

    //Function for navigating to the previous page
    function previousPage() {
        if (pageNumber === 1) {
            close();
        }
        else {
            setPageNumber(pageNumber - 1);
        }
    };

    //Function for navigating to the next page if requirements are met
    function nextPage() {
        //Survey requires a name in page 1
        if (pageNumber === 1 && !newSurvey.name) {
            setValidation({
                ...validation,
                [1]: true
            });
        }
        //Survey requires a welcome and ending title in page 2
        else if (pageNumber === 2 && (!newSurvey.welcomeTitle || !newSurvey.endTitle)) {
            setValidation({
                ...validation,
                [2]: true
            });
        }
        //Survey requires at least one question in page 3
        else if (pageNumber === 3 && newSurvey.satisfactionSurveyQuestions.length === 0) {
            setValidation({
                ...validation,
                [3]: true
            });
        }
        //Survey requires at least one recipient in page 4
        else if (pageNumber === 4 && newSurvey.satisfactionSurveyRecipients.length === 0) {
            setValidation({
                ...validation,
                [4]: true
            });
        }
        //Submit the survey request if on the last page
        else if (pageNumber === 5) {
            if (initialSurvey) {
                handleEdit();
            }
            else {
                handleSubmit();
            }
        }
        //Otherwise, navigate to the next page
        else {
            setPageNumber(pageNumber + 1);
        }
    };

    //Functions for submitting the new survey
    function handleSubmit() {
        createOne(newSurvey);
        refresh();
        close();
    };

    function handleEdit() {
        update(newSurvey);
        refresh();
        close();
    };

    //Function for adding a new question to the survey
    function addQuestion(questionText) {
        if (questionText) {
            setNewSurvey({
                ...newSurvey,
                satisfactionSurveyQuestions: [
                    ...newSurvey.satisfactionSurveyQuestions,
                    {
                        orderNumber: newSurvey.satisfactionSurveyQuestions.length,
                        question: questionText
                    }
                ]
            })
        }
    };

    //Function for adding a new recipient for the survey
    function addRecipient(option) {
        if (!initialSurvey) {
            //If a team option is selected, add every employee in that team as a recipient
            if (option.category === "Team") {
                let newRecipients;
                if (option.name === "Everyone") {
                    newRecipients = recipientOptions.filter(
                        (rec) => rec.teamName && newSurvey.satisfactionSurveyRecipients.every((rec2) => rec.empId !== rec2.empId)
                    );
                }
                else {
                    newRecipients = recipientOptions.filter(
                        (rec) => rec.teamName === option.name && newSurvey.satisfactionSurveyRecipients.every((rec2) => rec.empId !== rec2.empId)
                    );
                }

                setNewSurvey({
                    ...newSurvey, 
                    satisfactionSurveyRecipients: [
                        ...newSurvey.satisfactionSurveyRecipients,
                        ...newRecipients
                    ]
                });
            
            }
            //If an employee option is selected, only add that employee as a recipient
            else if (option.category === "Employee") {
                setNewSurvey({
                    ...newSurvey,
                    satisfactionSurveyRecipients: [
                        ...newSurvey.satisfactionSurveyRecipients,
                        option
                    ]
                });
            }
            //console.log(newSurvey.recipients);
        }
    };

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

    const Header4 = styled("h4")({
        marginBottom: "10px"
    });

    const Header5 = styled("h5")({
        marginBottom: "10px"
    });

    return (
        <Box sx={{...{
            width: "100%",
            padding: "30px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Title*/}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{marginBottom: "40px"}}
            >
                {pageNumber <= 4 ? 
                    <h3>Create new survey ({pageNumber}/4)</h3> : 
                    <h3>Review survey</h3>
                }
                <CloseIcon onClick={close} sx={{
                    backgroundColor: "#FFFFFF",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#D0D5DD"
                    }
                }}/>
            </Stack>
            {/*Popup content*/}
            {/*Page 1: Choosing survey name*/}
            {pageNumber === 1 &&
                <>
                    <Header4>Internal survey name<span style={{color: "red"}}>*</span></Header4>
                    <TextField 
                        value={newSurvey.name}
                        error={validation[1]}
                        placeholder="Survey name"
                        onChange={(e) => setNewSurvey({...newSurvey, name: e.target.value})}
                        helperText={validation[1] ? "Required": null}
                        sx={{ 
                            width: "100%",
                            marginBottom: "50px",
                        }}
                    />
                    {/*
                    <Stack 
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{
                            marginBottom: "10px"
                        }}
                    >
                        <Checkbox 
                            type="checkbox"
                            id="usePrevious"
                            name="usePrevious"
                            value="usePrevious"
                            size="large"
                            onChange={() => setUsePrevious(!usePrevious)}
                            style={{ marginRight: "10px" }}
                        />
                        <p>Use previous</p>
                    </Stack>
                    <Select sx={{ 
                        width: "100%", 
                        marginBottom: "20px" 
                    }}>
                        <MenuItem value="Previous Survey 1">Previous Survey 1</MenuItem>
                        <MenuItem value="Previous Survey 2">Previous Survey 2</MenuItem>
                    </Select>
                    */}
                </>
            }
            {/*Page 2: Entering titles, messages and starting and ending dates*/}
            {pageNumber === 2 &&
                <>
                    {/*Textfields for welcome screen title and message*/}
                    <Header4>Welcome screen title<span style={{color: "red"}}>*</span></Header4>
                    <TextField 
                        value={newSurvey.welcomeTitle}
                        error={validation[2] && !newSurvey.welcomeTitle}
                        placeholder="Welcome screen title"
                        onChange={(e) => setNewSurvey({...newSurvey, welcomeTitle: e.target.value})}
                        helperText={(validation[2] && !newSurvey.welcomeTitle) ? "Required" : null}
                        sx={{ 
                            width: "100%",
                            marginBottom: "20px" 
                        }}
                    />
                    <Header4>Welcome screen message</Header4>
                    <TextField 
                        value={newSurvey.welcomeMessage}
                        placeholder="Enter welcome screen message..."
                        multiline
                        rows={4}
                        onChange={(e) => setNewSurvey({...newSurvey, welcomeMessage: e.target.value})}
                        sx={{ 
                            width: "100%",
                            marginBottom: "40px"
                        }}
                    />
                    {/*Textfields for end screen title and message*/}
                    <Header4>End screen title<span style={{color: "red"}}>*</span></Header4>
                    <TextField 
                        value={newSurvey.endTitle}
                        error={validation[2] && !newSurvey.endTitle}
                        placeholder="End screen title"
                        onChange={(e) => setNewSurvey({...newSurvey, endTitle: e.target.value})}
                        helperText={(validation[2] && !newSurvey.endTitle) ? "Required" : null}
                        sx={{
                            width: "100%",
                            marginBottom: "20px"
                        }}
                    />
                    <Header4>End screen message</Header4>
                    <TextField 
                        value={newSurvey.endMessage}
                        placeholder="Enter end screen message..."
                        multiline
                        rows={4}
                        onChange={(e) => setNewSurvey({...newSurvey, endMessage: e.target.value})}
                        sx={{
                            width: "100%",
                            marginBottom: "20px"
                        }}
                    />
                    {/*Components for selecting starting and ending dates*/}
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={4}
                        sx={{ marginBottom: "40px" }}
                    >
                        <Box>
                            <Header4>Start date</Header4>
                            <Chip 
                                icon={<CalendarMonthIcon />}
                                label={formatDate(dayjs(newSurvey.startedAt).toDate())}
                                variant="outlined"
                                onClick={() => setOpenStartDate(true)}
                                disableTouchRipple
                                sx={{ borderRadius: "4px" }}
                            />
                        </Box>
                        <Box>
                            <Header4>End date</Header4>
                            <Chip 
                                icon={<CalendarMonthIcon />}
                                label={formatDate(dayjs(newSurvey.completedAt).toDate())}
                                variant="outlined"
                                onClick={() => setOpenEndDate(true)}
                                disableTouchRipple
                                sx={{ borderRadius: "4px" }}
                            />
                        </Box>
                    </Stack>
                </>
            }
            {/*Page 3: Adding survey questions*/}
            {pageNumber === 3 &&
                <>
                    <Header5 style={{ marginBottom: "10px" }}>Survey questions</Header5>
                    <Stack
                        direction="row"
                        alignItems="flex-start"
                        spacing={2}
                        sx={{ marginBottom: "10px" }}
                    >
                        {/*Textfield and button for adding a new survey question*/}
                        <TextField
                            value={newQuestionText}
                            placeholder="New question text"
                            size="small"
                            rows={4}
                            multiline
                            onChange={(e) => setNewQuestionText(e.target.value)}
                            sx={{
                                width: "100%"
                            }}
                        />
                        <HRMButton 
                            mode="secondaryB" 
                            onClick={() => addQuestion(newQuestionText)}
                            style={{ width: "120px" }}
                        >
                            <b style={{ color: colors.darkGrey }}>Add new</b>
                        </HRMButton>
                    </Stack>
                    {/*List of added survey questions*/}
                    {newSurvey.satisfactionSurveyQuestions.length > 0 ? 
                        <QuestionsList 
                            questions={newSurvey.satisfactionSurveyQuestions} 
                            setQuestions={(questions) => setNewSurvey({...newSurvey, questions})}
                            style={{ marginBottom: "20px" }} 
                        /> :
                        <Header4>No questions have been added</Header4>
                    }
                </>
            }
            {/*Page 4: Adding survey recipients*/}
            {pageNumber === 4 && 
                <>
                    <Header5>Survey recipients</Header5>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ marginBottom: "20px" }}
                    >
                        <Autocomplete 
                            value={newRecipient}
                            options={[...recipientTeams, ...recipientOptions]}
                            groupBy={(option) => option.category}
                            getOptionLabel={(option) => option.name}
                            onChange={(e, newValue) => setNewRecipient(newValue)}
                            disabled={initialSurvey}
                            sx={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <HRMButton 
                            mode="secondaryB" 
                            onClick={() => addRecipient(newRecipient)}
                            enabled={!initialSurvey}
                            style={{ width: "120px" }}
                        >
                            <b style={{ color: colors.darkGrey }}>Add new</b>
                        </HRMButton>
                    </Stack>
                    {initialSurvey && 
                        <Header4 sx={{ color: "#D92D20" }}>Recipients cannot be added or removed after the survey has been published</Header4>
                    }
                    {newSurvey.satisfactionSurveyRecipients.length > 0 ?
                        <RecipientsList 
                            recipients={newSurvey.satisfactionSurveyRecipients} 
                            setRecipients={(newRecipients) => setNewSurvey({...newSurvey, satisfactionSurveyRecipients: newRecipients})}
                            canEdit={!initialSurvey}
                            style={{ marginBottom: "20px" }}
                        /> :
                        <Header4>No recipients have been added</Header4>
                    }
                </>
            }
            {/*Page 5: Reviewing survey details*/}
            {pageNumber === 5 && 
                <>
                    {/*Welcome screen title and message*/}
                    <Header5>Welcome screen title</Header5>
                    <p style={{ marginBottom: "40px" }}>{newSurvey.welcomeTitle}</p>
                    <Header5>Welcome screen message</Header5>
                    <p style={{ marginBottom: "40px" }}>
                        {newSurvey.welcomeMessage ? 
                            newSurvey.welcomeMessage : 
                            <i>No welcome screen message was provided</i>
                        }
                    </p>
                    {/*End screen title and message*/}
                    <Header5>End screen title</Header5>
                    <p style={{ marginBottom: "40px" }}>{newSurvey.endTitle}</p>
                    <Header5>End screen message</Header5>
                    <p style={{ marginBottom: "40px" }}>
                        {newSurvey.endMessage ? 
                            newSurvey.endMessage :
                            <i>No end screen message was provided</i>
                        }
                    </p>
                    {/*Start and end dates*/}
                    <Header5>Start date</Header5>
                    <p style={{ marginBottom: "40px" }}>
                        {formatDate(dayjs(newSurvey.startedAt).toDate())}
                    </p>
                    <Header5>End date</Header5>
                    <p style={{ marginBottom: "40px" }}>
                        {formatDate(dayjs(newSurvey.completedAt).toDate())}
                    </p>
                    {/*Survey questions*/}
                    <Header5>Survey questions</Header5>
                    <TableContainer sx={{ marginBottom: "40px" }}>
                        <Table>
                            <TableBody>
                                {newSurvey.satisfactionSurveyQuestions.sort((q1, q2) => q1.orderNumber - q2.orderNumber).map((q) => (
                                    <TableRow>
                                        <TableBodyCell>
                                            <p>{q.question}</p>
                                        </TableBodyCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/*Survey recipients*/}
                    <Header5>Survey recipients</Header5>
                    <TableContainer sx={{ marginBottom: "40px" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell><b>Name</b></TableHeaderCell>
                                    <TableHeaderCell><b>Team</b></TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {newSurvey.satisfactionSurveyRecipients.map((rec) => (
                                    <TableRow>
                                        <TableBodyCell><p>{rec.name}</p></TableBodyCell>
                                        <TableBodyCell><p>{rec.teamName}</p></TableBodyCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
            {/*Validation messages to inform user of survey requirements*/}
            {validation[3] && 
                <h4 style={{ color: "#D92D20", marginBottom: "20px" }}>
                    Survey must have at least one question
                </h4>
            }
            {validation[4] &&
                <h4 style={{ color: "#D92D20", marginBottom: "20px" }}>
                    Survey must have at least one recipient
                </h4>
            }
            {/*Navigation buttons*/}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={2}
            >
                <HRMButton mode="secondaryB" onClick={previousPage}>
                    {pageNumber === 1 ? "Cancel" : "Previous"}
                </HRMButton>
                <HRMButton mode="primary" onClick={nextPage}>
                    {pageNumber === 5 ? initialSurvey ? "Update" : "Send" : "Next"}
                </HRMButton>
            </Stack>
            {/*Popup components for setting the starting and ending dates of the new survey*/}
            <Dialog open={openStartDate} onClose={() => setOpenStartDate(false)}>
                <DateSelect 
                    close={() => setOpenStartDate(false)} 
                    setDate={(date) => setNewSurvey({...newSurvey, startedAt: date})}
                    initialValue={newSurvey.startedAt}
                />
            </Dialog>
            <Dialog open={openEndDate} onClose={() => setOpenEndDate(false)}>
                <DateSelect 
                    close={() => setOpenEndDate(false)}
                    setDate={(date) => setNewSurvey({...newSurvey, completedAt: date})}
                    initialValue={newSurvey.completedAt}
                />
            </Dialog>
        </Box>
    );
};

//Control panel settings for storybook
NewSurveyPopup.propTypes = {
    //Function for closing this popup component
    close: PropTypes.func,

    //Function for refreshing the survey list
    refresh: PropTypes.func,

    //Details of the initial survey when editing
    initialSurvey: PropTypes.object
};

//Default values for this component
NewSurveyPopup.defaultProps = {
    initialSurvey: null,
    style: {}
};