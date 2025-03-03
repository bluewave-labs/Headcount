import Box from "@mui/system/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { startSurvey, submitSurvey } from "../../assets/FetchServices/SatisfactionSurvey";
import CustomizedSteppers from "../CustomizedSteppers";
import ResponseStart from "./ResponseStart";
import ResponseQuestions from "./ResponseQuestions";
import ResponseComplete from "./ResponseComplete";
import ResponseError from "./ResponseError";
import { fonts } from "../../Styles";
import { produce } from "immer";

/**
 * Satisfactory survey page for employees who have received a survey.
 *
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function ResponsePage({ style }) {
    //The current step in the survey process
    const [pageNumber, setPageNumber] = useState(0);
    //Flag determining if the survey was successfully loaded
    const [pageState, setPageState] = useState("loading");
    // Survey data containing survey questions
    const [surveyData, setSurveyData] = useState({});
    // Flag determining whether the popup message for saving responses should be displayed
    const [responseSaved, setResponseSaved] = useState(false);

    //Token to be used in the back end API call for starting the survey
    const { token } = useParams();

    //Retrieve the survey data
    useEffect(() => {
        getQuestions();
    }, []);

    //Function for retrieving the satisfactory survey questions
    function getQuestions() {
        startSurvey(token)
        .then((data) => {
            if (data) {
            setSurveyData(data);
            setPageState("complete");
            }
            else {
                setPageState("error");
                throw "Either the token provided is invalid or the survey has already been completed.";
            }
        })
        .catch((err) => {
            setPageState("error");
            console.log(err);
        });
    };

    //Function to set response to each question
    //Index is the index of the equation in the array
    //value is the inputs typed by the user.
    function setResponse(index, value) {
        try {
            const data = produce(surveyData, (newSurveyData) => {
                newSurveyData.respondent.satisfactionSurveyResponses[index].answer =
                value;
            });
            setSurveyData(data);
        } catch (error) {
            console.log(error);
        }
    };

    //Function for transitioning to the previous step
    function previousPage() {
        setPageNumber(pageNumber - 1);
    };

    //Function for transitioning to the next step
    function nextPage() {
        setPageNumber(pageNumber + 1);
    };

    //Function for saving the responses and continuing the survey later
    function saveResponses() {
        submitSurvey({
            respondentId: surveyData.respondent.id,
            hasCompleted: false,
            satisfactionSurveyResponses:
                surveyData.respondent.satisfactionSurveyResponses,
        });
        setResponseSaved(true);
    };

    //Function for submitting the responses and completing the survey
    function submitResponses() {
        submitSurvey({
            respondentId: surveyData.respondent.id,
            hasCompleted: true,
            satisfactionSurveyResponses:
                surveyData.respondent.satisfactionSurveyResponses,
        });
        nextPage();
    }

    //Labels for each survey step
    const steps = [
        { label: "Start" },
        { label: "Answer the questions" },
        { label: "Finish" },
    ];

    return (
        <Box sx={{
            ...{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            paddingX: "20%",
            paddingY: "50px",
            backgroundColor: "#FCFCFD",
            },
            ...style,
        }}>
            {pageState === "loading" && 
                <CircularProgress sx={{ marginX: "50%", marginY: "20%" }} />
            }
            {pageState ===  "complete" &&
                <>
                    {/*Steps overview*/}
                    <CustomizedSteppers
                        stepnumber={pageNumber}
                        steps={steps}
                        style={{
                            marginBottom: "50px",
                        }}
                    />
                    {/*Introduction page*/}
                    {pageNumber === 0 && <ResponseStart surveyName={surveyData.name} next={nextPage} />}
                    {/*Questions page*/}
                    {pageNumber === 1 && (
                        <ResponseQuestions
                            prev={previousPage}
                            next={submitResponses}
                            save={saveResponses}
                            surveyData={surveyData}
                            setResponse={setResponse}
                        />
                    )}
                    {/*Success page*/}
                    {pageNumber === 2 && (
                        <ResponseComplete submitResponse={submitResponses} />
                    )}
                </>
            }
            {pageState === "error" &&
                <>
                    {/*Error page to be displayed if token is invalid*/}
                    <ResponseError />
                </>
            }
            {/*Popup message to be displayed when saving responses without submitting*/}
            <Dialog 
                open={responseSaved}
                onClose={() => setResponseSaved(false)}
                fullWidth={true}
                maxWidth="md"
            >
                <Box sx={{
                    width: "100%",
                    padding: "30px",
                    fontFamily: fonts.fontFamily
                }}>
                    <h4 style={{ textAlign: "center" }}>
                        Your responses have been saved
                    </h4>
                    <p style={{ textAlign: "center" }}>
                        You can safely close this window and resume the survey later
                    </p>
                </Box>
            </Dialog>
        </Box>
    );
}

//Control panel settings for storybook
ResponsePage.propTypes = {};

//Default values for this component
ResponsePage.defaultProps = {
    style: {},
};
