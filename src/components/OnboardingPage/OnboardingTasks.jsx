import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import HRMButton from "../Button/HRMButton";
import ToDoTable from "./ToDoTable";
import { fetchAllByOnboardingId, update } from "../../assets/FetchServices/Task";
import { fonts } from "../../Styles";

/**
 * Menu component for the onboarding page containing onboarding tasks to be completed.
 * 
 * Props:
 * - prev<Function>: Function provided by the parent component to transition to the previous page.
 *      Syntax: previous()
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
export default function OnboardingTasks({prev, next, save, onboardingId, style}) {
    //Tasks to be displayed
    const [tasks, setTasks] = useState([]);
    //Flag determining if the user has completed all the tasks
    const [allTasksComplete, setAllTasksComplete] = useState(false);

    useEffect(() => {
        getTasks();
        console.log(tasks);
    }, []);

    useEffect(() => {
        setAllTasksComplete(tasks.every((task) => task.done));
    }, [tasks]);

    //Function for retrieving the onboarding tasks
    function getTasks() {
        fetchAllByOnboardingId(onboardingId).then((data) => {
            console.log(data);
            if (data) {
                setTasks(data);
            }
        });
    };

    //Function for saving changes to the onboarding tasks
    function saveTasks() {
        console.log(tasks);
        tasks.forEach((task) => update(task));
        save();
    };

    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: "10px",
            minWidth: "1003px",
            paddingX: "113px",
            paddingY: "44px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Title*/}
            <h4 style={{textAlign: "center", marginTop: 0, marginBottom: "10px"}}>
                Complete your to-do items
            </h4>
            <p style={{textAlign: "center", marginBottom: "50px"}}>
                You may discuss your to-dos with your manager
            </p>
            {/*Content*/}
            <ToDoTable
                tasks={tasks} 
                setTasks={setTasks}
                style={{marginBottom: "50px"}}
            />
            {/*Buttons*/}
            <Stack direction="row" alignContent="center" justifyContent="space-between">
                <HRMButton mode="secondaryB" startIcon={<ArrowBackIcon />} onClick={prev}>Previous</HRMButton>
                <Stack direction="row" alignContent="center" spacing={2}>
                    <HRMButton 
                        mode="secondaryB" 
                        onClick={saveTasks}
                    >
                        Save and complete later
                    </HRMButton>
                    <HRMButton mode="primary" enabled={allTasksComplete} onClick={next}>Save and next</HRMButton>
                </Stack>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
OnboardingTasks.propTypes = {
    //Function for transitioning to the previous page
    prev: PropTypes.func,

    //Function for transitioning to the next page
    next: PropTypes.func,

    //Function for saving the onboarding status
    save: PropTypes.func,

    //Onboarding ID
    onboardingId: PropTypes.number
};

//Default values for this component
OnboardingTasks.defaultProps = {
    style: {}
};