import Box from "@mui/system/Box";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { fetchByEmployeeId, update, completeOnboarding as complete } from "../../assets/FetchServices/Onboarding";
import CustomizedSteppers from "../CustomizedSteppers";
import IntroductoryMessage from "./IntroductoryMessage";
import OnboardingVideos from "./OnboardingVideos";
import OnboardingDocuments from "./OnboardingDocuments";
import OnboardingTasks from "./OnboardingTasks";
import OnboardingSurvey from "./OnboardingSurvey";
import OnboardingSuccessful from "./OnboardingSuccessful";
import StateContext from '../../context/StateContext';

/**
 * Onboarding page for new employees.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function OnboardingPage({style}) {
    //Onboarding status object which holds all the information necessary for the onboarding process
    const [onboardingStatus, setOnboardingStatus] = useState({});

    useEffect(() => {
        getOnboarding();
    }, []);

    const stateContext = useContext(StateContext);
    const currentUser = stateContext.state.employee ? stateContext.state.employee.empId : -1;
    const navigate = useNavigate();

    //Function for retrieving onboarding status
    function getOnboarding() {
        //console.log(stateContext.state.employee);
        fetchByEmployeeId(currentUser).then((data) => {
            if (data) {
                //console.log(data);
                setOnboardingStatus(data);
            }
        });
    };

    //Function for transitioning to the previous step
    function previousPage() { 
        setOnboardingStatus({...onboardingStatus, stepNumber: onboardingStatus.stepNumber - 1}); 
    };

    //Function for transitioning to the next step
    function nextPage() { 
        setOnboardingStatus({...onboardingStatus, stepNumber: onboardingStatus.stepNumber + 1});
        //console.log(onboardingStatus.id);
    };

    //Function for saving onboarding process for later
    function save() {
        //console.log(onboardingStatus);
        update(onboardingStatus);
        navigate("/dashboard", { replace: true });
    };

    //Function for marking the onboarding process as complete
    function completeOnboarding() {
        //console.log("Executing completeOnboarding")
        complete(currentUser);
        update({
            ...onboardingStatus,
            isComplete: true
        });
        stateContext.updateState("employee", {
            ...stateContext.state.employee,
            completedOnboardingAt: dayjs()
        })
        //console.log(stateContext.state.employee);
        navigate("/dashboard", { replace: true });
    };

    //Labels for each onboarding step
    const steps = [
        {label: "Start"},
        {label: "Videos"},
        {label: "Readings"},
        {label: "To-dos"},
        {label: "Survey"},
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
            {/*Steps overview*/}
            <CustomizedSteppers 
                stepnumber={onboardingStatus.stepNumber} 
                steps={steps} 
                style={{
                    marginBottom: "50px"
                }} 
            />
            {/*Introduction page*/}
            {onboardingStatus.stepNumber === 0 && <IntroductoryMessage next={nextPage} save={save} />}
            {/*Videos page*/}
            {onboardingStatus.stepNumber === 1 && 
                <OnboardingVideos 
                    prev={previousPage} 
                    next={nextPage} 
                    save={save} 
                    watchedVideos={onboardingStatus.watchedVideos}
                    setWatchedVideos={(value) => setOnboardingStatus({...onboardingStatus, watchedVideos: value})}
                />
            }
            {/*Documents page*/}
            {onboardingStatus.stepNumber === 2 && 
                <OnboardingDocuments 
                    prev={previousPage} 
                    next={nextPage} 
                    save={save}
                    readDocuments={onboardingStatus.readDocuments}
                    onboardingId={onboardingStatus.id}
                    setReadDocuments={(value) => setOnboardingStatus({...onboardingStatus, readDocuments: value})}
                />
            }
            {/*To-do page*/}
            {onboardingStatus.stepNumber === 3 && 
                <OnboardingTasks 
                    prev={previousPage} 
                    next={nextPage} 
                    save={save}
                    onboardingId={onboardingStatus.id}
                />
            }
            {/*Survey page*/}
            {onboardingStatus.stepNumber === 4 && 
                <OnboardingSurvey 
                    prev={previousPage} 
                    next={nextPage} 
                    save={save}
                    onboardingId={onboardingStatus.id}
                    setSurvey={(value) => setOnboardingStatus({...onboardingStatus, survey: value})}
                />
            }
            {/*Success page*/}
            {onboardingStatus.stepNumber === 5 && <OnboardingSuccessful completeOnboarding={completeOnboarding} />}
        </Box>
    );
};

//Control panel settings for storybook
OnboardingPage.propTypes = {};

//Default values for this component
OnboardingPage.defaultProps = {
    style: {}
};