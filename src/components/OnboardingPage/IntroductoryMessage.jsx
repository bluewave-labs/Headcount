import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import { styled } from "@mui/system";
import { useContext } from "react";
import PropTypes from "prop-types";
import HRMButton from "../Button/HRMButton";
import { fonts } from "../../Styles";
import StateContext from "../../context/StateContext";

/**
 * Menu component for the onboarding page containing the welcome message for the new employee.
 * 
 * Props:
 * - next<Function>: Function provided by the parent component to transition to the next page.
 *      Syntax: next()
 * 
 * - save<Function>: Function provided by the parent component to save the onboarding status and navigate
 *      to the application's homepage.
 *      Syntax: save()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function IntroductoryMessage({next, save, style}) {
    const stateContext = useContext(StateContext);
    //const currentUser = stateContext.state.employee ? stateContext.state.employee.empId : -1;

    //Obtain company name, employee name and job title
    const jobTitle = stateContext.state.employee.role.roleTitle;
    const employeeName = stateContext.state.employee.firstName;

    //Custom style elements
    const StyledP = styled("p")({
        marginBottom: "8px",
        lineHeight: "1.5"
    });

    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: "10px",
            minWidth: "1003px",
            paddingX: "155px",
            paddingY: "69px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Title*/}
            <h4 style={{textAlign: "center", marginTop: 0, marginBottom: "10px"}}>Onboarding Process</h4>
            {/*Content*/}
            <StyledP>
                As part of our onboarding process, we want to ensure that everything proceeds smoothly 
                for you.
            </StyledP>
            <StyledP>
                Congratulations on accepting the job offer to join our team as our new {jobTitle}. 
                We were impressed by your skills and experiences throughout the interview process and 
                are confident in your ability to make valuable contributions to our team.
            </StyledP>
            <StyledP>Please don't hesitate to ask any questions you may have.</StyledP>
            <StyledP>Welcome aboard {employeeName}</StyledP>
            {/*Buttons*/}
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                <HRMButton 
                    mode="secondaryB" 
                    onClick={save}
                >
                    Quit and complete later
                </HRMButton>
                <HRMButton mode="primary" onClick={next}>Next</HRMButton>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
IntroductoryMessage.propTypes = {
    //Function for transitioning to the next page
    next: PropTypes.func,

    //Function for saving the onboarding status
    save: PropTypes.func
};

//Default values for this component
IntroductoryMessage.defaultProps = {
    style: {}
};