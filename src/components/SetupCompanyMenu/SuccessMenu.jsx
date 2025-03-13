import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import HRMButton from '../Button/HRMButton';
import SuccessImage from '../../Images/Success_HR_Management_1.0.png';
import { colors, fonts } from '../../assets/Styles';
import { useNavigate } from "react-router-dom";

/**
 * Setup menu component for onboarding purposes. Lets the user know that they are finished the
 * onboarding process
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SuccessMenu({style}) {
    const navigate = useNavigate();

    const handleClick = ()=> {
        navigate("/dashboard", {replace: true})
    }
    return (
        <Box sx={{...{
            width: "1003px",
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingY: 8,
            paddingX: 0,
            backgroundColor: "#FFFFFF",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily,
            textAlign: "center"
        }, ...style}}>
            {/*Text and image*/}
            <Stack spacing={3}>
                <img style={{margin: "1em auto", width: "148px", height: "148px"}} src={SuccessImage} alt="Image" />
                <h3>Well done!</h3>
                <p>You have completed the initial setup</p>
            </Stack>
            {/*Complete setup button*/}
            <HRMButton mode="primary" style={{
                marginTop: "40px"
            }}
            onClick={handleClick}>
                Dismiss and complete setup
            </HRMButton>
        </Box>
    );
};

//Control panel settings for storybook
SuccessMenu.propTypes = {};

//Default values for this component
SuccessMenu.defaultProps = {};