import { ButtonGroup, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { colors } from '../../Styles';

/**
 * ButtonGroup component for both HRM and Onboarding applications.
 * 
 * Props:
 * - buttonLabels<Array<String>>: Labels for each button in the button group. For each label in
 *      'buttonLabels', a new button with that label will be added to the button group.
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function HRMButtonGroup({buttonLabels, style}) {
    return (
        <ButtonGroup 
            variant="outlined"
            sx={style}
        >
            {buttonLabels.map(label => {
                return <Button
                    sx={{
                        fontFamily: `"Inter", sans-serif`,
                        textTransform: "none",
                        borderColor: "#D0D5DD",
                        color: colors.darkGrey,
                        borderRadius: "8px",
                        "&:hover": {
                            cursor: 'pointer',
                            borderColor: "#D0D5DD"
                        }
                    }}>
                        {label}
                    </Button>
            })}
        </ButtonGroup>
    );
};

//Control panel settings for storybook 
HRMButtonGroup.propTypes = {
    //Button labels
    buttonLabels: PropTypes.array
};

//Default values for this component
HRMButtonGroup.defaultProps = {
    style: {}
};