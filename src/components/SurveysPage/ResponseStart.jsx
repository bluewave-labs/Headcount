import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import PropTypes from "prop-types";
import HRMButton from "../Button/HRMButton";
import { fonts } from "../../Styles";

/**
 * Menu component for the satisfaction survey response page containing the 
 * introductory message.
 * 
 * Props:
 * - surveyName<String>: Name of the given satisfaction survey.
 * 
 * - next<Function>: Function provided by the parent component to transition to the next page.
 *      Syntax: next()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function ResponseMessage({surveyName, next, style}) {
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
            <h4 style={{ textAlign: "center", marginTop: 0, marginBottom: "10px" }}>
                {surveyName}
            </h4>
            {/*Content*/}
            <p>
                Thank you for taking the time to provide feedback. Your input is invaluable
                in helping us improve your experience at [Company Name]. Please be honest in
                your responses, as your feedback will remain confidential.
            </p>
            {/*Buttons*/}
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                <HRMButton mode="primary" onClick={next}>Next</HRMButton>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
ResponseMessage.propTypes = {
    //Function for transitioning to the next page
    next: PropTypes.func
};

//Default values for this component
ResponseMessage.defaultProps = {
    style: {}
};