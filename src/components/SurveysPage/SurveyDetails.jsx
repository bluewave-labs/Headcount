import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import PropTypes from "prop-types";
import SurveyDetailsMenu from "./SurveyDetailsMenu";
import SurveyInfo from "./SurveyInfo";
import SurveyResponses from "./SurveyResponses";
import { colors, fonts } from "../../Styles";

/**
 * Content component for displaying either a survey's information or the list of employees who
 * completed the survey.
 * 
 * Props: 
 * - survey<Object>: The selected survey in question.
 * 
 * - back<Function>: The function for navigating back to the survey table.
 *      Syntax: back()
 * 
 * - refresh<Function>: Function provided by the parent component for refreshing the survey list.
 *      Syntax: refresh()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function SurveyDetails({survey, back, refresh, style}) {
    //Hooks determining which tab on the survey details page is selected
    const [infoSelected, setInfoSelected] = useState(true);
    const [answersSelected, setAnswersSelected] = useState(false);

    return (
        <Box sx={{...{
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily,
            width: "100%"
        }, ...style}}>
            {/*Header*/}
            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="flex-start" 
                spacing={2}
                sx={{marginBottom: "40px"}}
            >
                <ArrowBackIcon 
                    onClick={back} 
                    sx={{
                        backgroundColor: "#FFFFFF",
                        "&:hover": {
                            cursor: "pointer",
                            backgroundColor: "#D0D5DD"
                        }
                    }} 
                />
                <h3>Survey Details | {survey.name}</h3>
            </Stack>
            <Stack direction="row" alignItems="flex-start" spacing={2}>
                {/*Info and Answers tabs*/}
                <SurveyDetailsMenu 
                    infoSelected={infoSelected}
                    setInfoSelected={setInfoSelected}
                    answersSelected={answersSelected}
                    setAnswersSelected={setAnswersSelected}
                />
                {/*Tab content*/}
                {infoSelected && <SurveyInfo surveyInfo={survey} refresh={refresh} />}
                {answersSelected && <SurveyResponses responseList={survey.satisfactionSurveyAnswers} />}
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
SurveyDetails.propTypes = {
    //The selected survey
    survey: PropTypes.object,

    //Function for navigating back to the survey table
    back: PropTypes.func,

    //Function for refreshing the survey list
    refresh: PropTypes.func
};

//Default values for this component
SurveyDetails.defaultProps = {
    style: {}
};