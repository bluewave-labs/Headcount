import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import HRMButton from "../Button/HRMButton";
import { fonts } from "../../Styles";

/**
 * Menu component for the satisfactory survey response page containing the survey questions.
 * 
 * Props:
 * - prev<Function>: Function provided by the parent component to transition to the previous page.
 *      Syntax: prev()
 * 
 * - next<Function>: Function provided by the parent component to transition to the next page.
 *      Syntax: next()
 * 
 * - save<Function>: Function provided by the parent component to save the survey responses and
 *      return to the main page.
 *      Syntax: save()
 * 
 * - surveyQuestions<Array<Object>>: List of survey question objects containing the question
 *      text and the employee's response.
 *      Syntax of object: {
 *          respondentId: <Integer>
 *          orderNumber: <Integer>
 *          question: <String>
 *          answer: <String>
 *      }
 * 
 * - setSurveyQuestions<Function>: Function provided by the parent component for handling
 *      the editing of survey responses.
 *      Syntax: setSurveyQuestions(<new list of survey questions>)
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function ResponseQuestions({
    prev, 
    next, 
    save, 
    surveyData,
    setResponse,
    style
}) {
    function handleChange(e, index, answer) {
        setResponse(index, answer);
    };

    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: "10px",
            minWidth: "1003px",
            paddingX: "113px",
            paddingY: "63px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Title*/}
            <h4 style={{ textAlign: "center", marginTop: 0, marginBottom: "10px" }}>
                Please answer the questions below as detailed as possible
            </h4>
            <p style={{ textAlign: "center", marginBottom: "50px" }}>
                Your answers are going to be used to further improve our process.
            </p>
            {/*Content*/}
            {surveyData.respondent.satisfactionSurveyResponses.map((q, index) => (
                <>
                    <p style={{ textAlign: "left", marginBottom: "8px" }}>{q.question}</p>
                    <TextField 
                        id={`${q.question}-textfield`}
                        value={q.answer}
                        placeholder="Your answer here"
                        onChange={(e) => handleChange(e, index, e.target.value)}
                        rows={4}
                        multiline
                        sx={{
                            marginBottom: "50px",
                            width: "100%"
                        }}
                    />
                </>
            ))}
            {/*Buttons*/}
            <Stack direction="row" alignContent="center" justifyContent="space-between">
                <HRMButton mode="secondaryB" startIcon={<ArrowBackIcon />} onClick={prev}>
                    Previous
                </HRMButton>
                <Stack direction="row" alignContent="center" spacing={2}>
                    <HRMButton mode="secondaryB" onClick={save}>
                        Save and complete later
                    </HRMButton>
                    <HRMButton mode="primary" onClick={next}>
                        Submit
                    </HRMButton>
                </Stack>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
ResponseQuestions.propTypes = {
    //Function for transitioning to the previous page
    prev: PropTypes.func,

    //Function for transitioning to the next page
    next: PropTypes.func,

    //Function for saving the onboarding status
    save: PropTypes.func,

    //List of survey questions to be displayed
    surveyQuestions: PropTypes.array,

    //Function for handling editing of survey responses
    setSurveyQuestions: PropTypes.func
};

//Default values for this component
ResponseQuestions.defaultProps = {
    style: {}
};