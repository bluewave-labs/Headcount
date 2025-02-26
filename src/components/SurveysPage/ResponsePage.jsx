import Box from "@mui/system/Box";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { startSurvey, submitSurvey } from "../../assets/FetchServices/SatisfactionSurvey";
import CustomizedSteppers from "../CustomizedSteppers";
import ResponseStart from "./ResponseStart";
import ResponseQuestions from "./ResponseQuestions";
import ResponseComplete from "./ResponseComplete";
import ResponseError from "./ResponseError";
import StateContext from "../../context/StateContext"

/**
 * Satisfactory survey page for employees who have received a survey.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function ResponsePage({style}) {
    //The current step in the survey process
    const [pageNumber, setPageNumber] = useState(0);
    //Flag determining if the survey was successfully loaded
    const [validSurvey, setValidSurvey] = useState(false);
    //List of survey questions
    const [surveyQuestions, setSurveyQuestions] = useState([]);

    //Token to be used in the back end API call for starting the survey
    const { token } = useParams(); 

    //Retrieve the survey questions
    useEffect(() => {
        getQuestions();
    }, []);

    //Retrieve the employee's ID
    const stateContext = useContext(StateContext);
    const currentUser = stateContext.state.employee ? stateContext.state.employee.empId : -1;

    //Function for retrieving the satisfactory survey questions
    function getQuestions() {
        startSurvey(token).then((data) => {
            console.log(token);
            console.log(data);
            if (data) {
                setValidSurvey(true);
                setSurveyQuestions(data.respondent.satisfactionSurveyResponses);
            }
        });
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
            respondentId: currentUser,
            hasCompleted: false,
            satisfactionSurveyResponses: surveyQuestions
        });
    };

    //Function for submitting the responses and completing the survey
    function submitResponses() {
        submitSurvey({
            respondentId: currentUser,
            hasCompleted: true,
            satisfactionSurveyResponses: surveyQuestions
        });
    };

    //Labels for each survey step
    const steps = [
        {label: "Start"},
        {label: "Answer the questions"},
        {label: "Finish"}
    ];

    return (
        <Box sx={{...{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            paddingX: "20%",
            paddingY: "50px",
            backgroundColor: "#FCFCFD"
        }, ...style}}>
            {validSurvey ? 
                <>
                    {/*Steps overview*/}
                    <CustomizedSteppers 
                        stepnumber={pageNumber}
                        steps={steps}
                        style={{
                            marginBottom: "50px"
                        }}
                    />
                    {/*Introduction page*/}
                    {pageNumber === 0 && <ResponseStart next={nextPage} />}
                    {/*Questions page*/}
                    {pageNumber === 1 && <ResponseQuestions 
                        prev={previousPage} 
                        next={nextPage}
                        save={saveResponses}
                        surveyQuestions={surveyQuestions}
                        setSurveyQuestions={(newQuestions) => setSurveyQuestions(newQuestions)}
                    />}
                    {/*Success page*/}
                    {pageNumber === 2 && <ResponseComplete submitResponse={submitResponses} />}
                </> :
                <>
                    {/*Error page to be displayed if token is invalid*/}
                    <ResponseError />
                </>
            }
        </Box>
    );
};

//Control panel settings for storybook
ResponsePage.propTypes = {};

//Default values for this component
ResponsePage.defaultProps = {
    style: {}
};