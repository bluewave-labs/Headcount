import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/system/Stack";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/system";
import { useState } from "react";
import PropTypes from "prop-types";
import HRMButton from "../Button/HRMButton";
import EditSurveyQuestionPopup from "./EditSurveyQuestionPopup";
import { colors } from "../../Styles";

/**
 * Table component for displaying the list of survey questions when creating a new survey.
 * 
 * Props: 
 * - questions<Array<Object>>: List of survey questions to be displayed.
 * 
 * - setQuestions<Function>: Function provided by the parent component for setting the list of 
 *      survey questions.
 *      Syntax: setQuestions(<list of questions>)    
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function QuestionsList({questions, setQuestions, style}) {
    //Question object to be modified in the edit survey question popup
    const [editQuestion, setEditQuestion] = useState(null);
    //Flag for determining if the edit survey question popup should be open
    const [editQuestionPopup, setEditQuestionPopup] = useState(false);

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

    //Reorder two adjacent survey questions by switching their indices
    function reorder(initialIndex, newIndex) {
        if (newIndex >= 0 && newIndex < questions.length) {
            //Swap indices of questions being reordered
            const selectedQuestion = questions.filter((q) => q.orderNumber === initialIndex)[0];
            const otherQuestion = questions.filter((q) => q.orderNumber === newIndex)[0];
            selectedQuestion.orderNumber = newIndex;
            otherQuestion.orderNumber = initialIndex;

            //Update the questions list
            const newQuestions = questions.filter((q) => q.orderNumber !== initialIndex && q.orderNumber !== newIndex);
            newQuestions.push(selectedQuestion);
            newQuestions.push(otherQuestion);
            setQuestions(newQuestions);
        }
    };

    //Remove a survey question from the list
    function remove(index) {
        const newQuestions = questions.filter((q) => q.orderNumber !== index);
        newQuestions.forEach((q) => {
            if (q.orderNumber > index) {
                q.orderNumber -= 1;
            }
        });
        setQuestions(newQuestions);
    };

    //Enable editing for a given survey question 
    function enableEdit(question) {
        setEditQuestion(question);
        setEditQuestionPopup(true);
    };

    //Update the text for a given survey question
    function handleEdit(newQuestion) {
        setQuestions(
            questions.map((q) => q.orderNumber === newQuestion.orderNumber ? newQuestion : q)
        );
        setEditQuestionPopup(false);
    };

    return (
        <>
            <TableContainer sx={{...{
                width: "100%"
            }, ...style}}>
                <Table>
                    {/*Table header*/}
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                            <TableHeaderCell><b>Order</b></TableHeaderCell>
                            <TableHeaderCell colSpan={2}><b>Question Text</b></TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    {/*List all questions*/}
                    <TableBody>
                        {questions.sort((q1, q2) => q1.orderNumber - q2.orderNumber).map((q, index) => (
                            <TableRow>
                                <TableBodyCell>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        {/*Reordering buttons*/}
                                        <b>{q.orderNumber + 1}</b>
                                        <ArrowUpwardIcon 
                                            onClick={() => reorder(index, index - 1)}
                                            sx={{
                                                backgroundColor: "#FFFFFF",
                                                "&:hover": {
                                                    cursor: "pointer",
                                                    backgroundColor: "#D0D5DD"
                                                }
                                            }}
                                        />
                                        <ArrowDownwardIcon 
                                            onClick={() => reorder(index, index + 1)}
                                            sx={{
                                                backgroundColor: "#FFFFFF",
                                                "&:hover": {
                                                    cursor: "pointer",
                                                    backgroundColor: "#D0D5DD"
                                                }
                                            }}
                                        />
                                    </Stack>
                                </TableBodyCell>
                                <TableBodyCell>
                                    {/*Question text*/}
                                    <p>{q.question}</p>
                                </TableBodyCell>
                                <TableBodyCell>
                                    {/*Delete and edit buttons*/}
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="flex-end"
                                        spacing={2}
                                    >
                                        <HRMButton
                                            mode="tertiary"
                                            onClick={() => remove(index)}
                                        >
                                            <b style={{ color: "#475467" }}>
                                                Delete
                                            </b>
                                        </HRMButton>
                                        <HRMButton 
                                            mode="tertiary"
                                            onClick={() => enableEdit(q)}
                                        >
                                            <b style={{ color: colors.purple }}>
                                                Edit
                                            </b>
                                        </HRMButton>
                                    </Stack>
                                </TableBodyCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*Edit survey question popup*/}
            <Dialog open={editQuestionPopup} onClose={() => setEditQuestionPopup(false)}>
                <EditSurveyQuestionPopup 
                    question={editQuestion} 
                    update={(newQuestion) => handleEdit(newQuestion)}
                    close={() => setEditQuestionPopup(false)}
                />
            </Dialog>
        </>
    );
};

//Control panel settings for storybook
QuestionsList.propTypes = {
    //List of survey questions to be displayed
    questions: PropTypes.array,

    //Function provided by the parent component for setting the list of survey questions
    setQuestions: PropTypes.func
};

//Default values for this component
QuestionsList.defaultProps = {
    style: {}
};