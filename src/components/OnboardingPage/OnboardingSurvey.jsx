import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import HRMButton from "../Button/HRMButton";
import { fetchAllByOnboardingId, update } from "../../assets/FetchServices/SurveyResponse";
import { fonts } from "../../Styles";

/**
 * Menu component for the onboarding page containing survey questions for the new employee.
 * 
 * Props:
 * - prev<Function>: Function provided by the parent component to transition to the previous page.
 *      Syntax: prev()
 * 
 * - next<Function>: Function provided by the parent component to transition to the next page.
 *      Syntax: next()
 * 
 * - save<Function>: Function provided by the parent component to save the onboarding status and navigate to the
 *      application's homepage.
 *      Syntax: save()
 * 
 * - onboardingId<Integer>: Onboarding ID provided by the parent component
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function OnboardingSurvey({prev, next, save, onboardingId, style}) {
    //Survey questions and responses to be displayed
    const [survey, setSurvey] = useState([]);

    useEffect(() => {
        getSurvey();
    }, []);

    //Function for retrieving the onboarding survey questions and responses
    function getSurvey() {
        fetchAllByOnboardingId(onboardingId).then((data) => {
            if (data) {
                setSurvey(data);
            }
        });
    };

    //Function to handle changes made to the survey responses
    function handleChange(e, orderNumber, answer) {
        const newSurvey = survey.filter((q) => q.orderNumber !== orderNumber);
        const updatedQuestion = survey.filter((q) => q.orderNumber === orderNumber)[0];
        updatedQuestion.answer = answer;
        newSurvey.push(updatedQuestion);
        setSurvey(newSurvey)
    };

    //Function for saving changes to the onboarding survey
    function saveSurvey() {
        survey.forEach((response) => update(response));
        save();
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
            <h4 style={{textAlign: "center", marginTop: 0, marginBottom: "10px"}}>
                Please answer the questions below as detailed as possible
            </h4>
            <p style={{textAlign: "center", marginBottom: "50px"}}>
                Your answers are going to be used to further improve our process.
            </p>
            {/*Content*/}
            {survey.sort((q1, q2) => q1.orderNumber - q2.orderNumber).map((q) => (
                <>
                    <p style={{textAlign: "left", marginBottom: "8px"}}>{q.question}</p>
                    <TextField 
                        id={`${q.question}-textfield`}
                        value={q.answer}
                        placeholder={"Your answer here"}
                        onChange={(e) => handleChange(e, q.orderNumber, e.target.value)}
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
                <HRMButton mode="secondaryB" startIcon={<ArrowBackIcon />} onClick={prev}>Previous</HRMButton>
                <Stack direction="row" alignContent="center" spacing={2}>
                    <HRMButton 
                        mode="secondaryB" 
                        onClick={saveSurvey}
                    >
                        Save and complete later
                    </HRMButton>
                    <HRMButton mode="primary" onClick={next}>Save and next</HRMButton>
                </Stack>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
OnboardingSurvey.propTypes = {
    //Function for transitioning to the previous page
    prev: PropTypes.func,

    //Function for transitioning to the next page
    next: PropTypes.func,

    //Function for saving the onboarding status
    save: PropTypes.func,

    //Onboarding ID
    onboardingID: PropTypes.number
};

//Default values for this component
OnboardingSurvey.defaultProps = {
    style: {}
};