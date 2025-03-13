import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import Dialog from "@mui/material/Dialog";
import dayjs from "dayjs";
import { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import NewSurveyPopup from "../PopupComponents/NewSurveyPopup";
import HRMButton from "../Button/HRMButton";
import { fonts } from "../../Styles";

//Function for parsing a JavaScript date into a string format.
function formatDate(date) {
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return `${month} ${day}, ${year}`;
};

/**
 * Content component for displaying the information of a given survey.
 * 
 * Props:
 * - surveyInfo<Array<Object>>: Information on the selected survey to be displayed.
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
export default function SurveyInfo({surveyInfo, refresh, style}) {
    //Flag determining whether the popup for editing the selected survey should be displayed
    const [editSurvey, setEditSurvey] = useState(false);

    //console.log(surveyInfo);

    //Custom style elements
    const StyledTD = styled("td")({
        verticalAlign: "top",
        textAlign: "start",
        width: "50%",
        paddingTop: "10px",
        paddingBottom: "20px",
        borderTop: "1px solid #EBEBEB"
    });

    return (
        <Box sx={{...{
            width: "692px",
            fontFamily: fonts.fontFamily,
            fontSize: fonts.default.size
        }, ...style}}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
                {/*Edit button*/}
                <HRMButton 
                    mode="primary" 
                    onClick={() => setEditSurvey(true)} 
                    style={{ marginBottom: "30px" }}
                >
                    Edit survey
                </HRMButton>
            </Stack>
            {/*Survey content*/}
            <table style={{ width: "100%" }}>
                <tr>
                    <StyledTD><b>Welcome title</b></StyledTD>
                    <StyledTD>{surveyInfo.welcomeTitle}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Welcome message</b></StyledTD>
                    <StyledTD>
                        {
                            surveyInfo.welcomeMessage ? 
                            surveyInfo.welcomeMessage : 
                            <i>No welcome message was provided</i>
                        }
                    </StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>End title</b></StyledTD>
                    <StyledTD>{surveyInfo.endTitle}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>End message</b></StyledTD>
                    <StyledTD>
                        {
                            surveyInfo.endMessage ?
                            surveyInfo.endMessage :
                            <i>No end message was provided</i>
                        }
                    </StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Start date:</b></StyledTD>
                    <StyledTD>{formatDate(dayjs(surveyInfo.startedAt).toDate())}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Finish date:</b></StyledTD>
                    <StyledTD>{formatDate(dayjs(surveyInfo.completedAt).toDate())}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Questions</b></StyledTD>
                    <StyledTD>
                        <ol>
                            {surveyInfo.satisfactionSurveyQuestions.sort((q1, q2) => q1.orderNumber - q2.orderNumber).map((q) => (
                                <li style={{ marginBottom: "10px" }}>{q.question}</li>
                            ))}
                        </ol>
                    </StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Recipients</b></StyledTD>
                    <StyledTD>
                        <ul>
                            {surveyInfo.satisfactionSurveyRecipients.map((r) => (
                                <li style={{ marginBottom: "10px" }}>{r.name}</li>
                            ))}
                        </ul>
                    </StyledTD>
                </tr>
            </table>
            {/*Popup component for editing a survey*/}
            <Dialog 
                open={editSurvey} 
                onClose={() => setEditSurvey(false)} 
                fullWidth={true} 
                maxWidth="md"
            >
                <NewSurveyPopup 
                    close={() => setEditSurvey(false)} 
                    refresh={refresh} 
                    initialSurvey={surveyInfo} 
                />
            </Dialog>
        </Box>
    );
};

//Control panel settings for storybook
SurveyInfo.propTypes = {
    //Information on the selected survey to be displayed
    surveyInfo: PropTypes.object
};

//Default values for this component
SurveyInfo.defaultProps = {
    style: {}
};