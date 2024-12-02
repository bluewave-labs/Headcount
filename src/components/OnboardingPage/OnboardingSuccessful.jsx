import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import HRMButton from "../Button/HRMButton";
import { fonts } from "../../Styles";

/**
 * Menu component for the onboarding page to notify the user that the onboarding process is complete.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function OnboardingSuccessful({completeOnboarding, style}) {
    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: "10px",
            minWidth: "1003px",
            paddingY: "83px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <Stack direction="column" justifyContent="center">
                <h4 style={{textAlign: "center", marginTop: 0, marginBottom: "8px"}}>
                    All set! Thank you for completing the onboarding!
                </h4>
                <p style={{textAlign: "center", marginTop: 0, marginBottom: "20px"}}>Now you can log in to the system.</p>
                <HRMButton 
                    mode="primary" 
                    style={{
                        marginLeft: "auto", 
                        marginRight: "auto", 
                        width: "230px"
                    }}
                    onClick={completeOnboarding}
                >
                    Complete and notify the HR
                </HRMButton>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
OnboardingSuccessful.propTypes = {};

//Default values for this component
OnboardingSuccessful.defaultProps = {
    style: {}
};