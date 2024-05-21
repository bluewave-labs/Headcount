import {styled} from '@mui/system';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

/**
 * Button components for both HRM and Onboarding applications. Can be configured to be a primary,
 * secondary, tertiary or error button using prop values.
 * 
 * Props:
 * - mode<String>: Determines the type of the button. 
 *      Valid values: ['primary', 'secondaryA', 'secondaryB', 'tertiary', 'error']
 * 
 * - children<Any>: Text to be used for the button label.
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 * 
 * - enabled<Boolean>: Flag determining whether the button is enabled or disabled.
 *      Default: true
 */
export default function HRMButton({mode, children, style, enabled}) {
    const primaryStyle = {
        textTransform: "none",
        backgroundColor: "#7F56D9",
        "&:hover": {
            backgroundColor: "#6941C6"
        },
        "&:active": {
            outline: "5px solid #9E77ED3D"
        }
    };

    const secondaryAStyle = {
        textTransform: "none",
        color: "#6941C6",
        borderColor: "#D6BBFB",
        "&:hover": {
            borderColor: "#D6BBFB",
            backgroundColor: "#F9F5FF"
        },
        "&:active": {
            outline: "5px solid #9E77ED3D"
        }
    }

    const secondaryBStyle = {
        textTransform: "none",
        color: "#475467",
        borderColor: "#D0D5DD",
        "&:hover": {
            borderColor: "#D0D5DD",
            backgroundColor: "#F9FAFB"
        },
        "&:active": {
            outline: "5px solid #98A2B324"
        }
    };

    const tertiaryStyle = {
        textTransform: "none",
        color: "#475467"
    };

    const errorStyle = {
        textTransform: "none",
        backgroundColor: "#D92D20",
        "&:hover": {
            borderColor: "#912018",
            backgroundColor: "#B42318"
        },
        "&:active": {
            outline: "5px solid #FCCED7"
        }
    };

    let StyledButton;
    switch (mode) {
        case "primary": 
            StyledButton = styled(Button)({...primaryStyle, ...style});
            break;
        case "secondaryA":
            StyledButton = styled(Button)({...secondaryAStyle, ...style});
            break;
        case "secondaryB":
            StyledButton = styled(Button)({...secondaryBStyle, ...style});
            break;
        case "error":
            StyledButton = styled(Button)({...errorStyle, ...style});
            break;
        default:
            StyledButton = styled(Button)({...tertiaryStyle, ...style});
    }

    if (mode === "primary" || mode === "error") {
        return (
            <StyledButton variant="contained" disabled={!enabled} disableElevation>{children}</StyledButton>
        );
    }
    else if (mode === "secondaryA" || mode === "secondaryB") {
        return (
            <StyledButton variant="outlined" disabled={!enabled}>{children}</StyledButton>
        );
    }
    else {
        return (
            <StyledButton variant="text" disabled={!enabled}>{children}</StyledButton>
        );
    }
};

//Control panel settings for storybook 
HRMButton.propTypes = {
    //Button type
    mode: PropTypes.oneOf(['primary', 'secondaryA', 'secondaryB', 'tertiary', 'error']),

    //Button text
    children: PropTypes.string.isRequired,

    //Button enabled flag
    enabled: PropTypes.bool,

    //Behaviour when clicked
    onClick: PropTypes.func
};

//Default values for this component
HRMButton.defaultProps = {
    style: {},
    enabled: true
};

