import Chip from '@mui/material/Chip';
import { styled } from '@mui/system';
import { colors, fonts } from '../../assets/Styles';
import PropTypes from 'prop-types';

/**
 * Label components for both HRM and Onboarding applications. Can be configured to be an orange, 
 * gray, purple(brand), green(success), new, waiting or seen label using prop values.
 * 
 * Props:
 * - mode<String>: Determines the type of the label. 
 *      Valid values: ['orange', 'gray', 'brand', 'success', 'status']
 * 
 * - dot<String>: Determines the colour of the dot icon, if applicable.
 *      Valid values: ['orange', 'red', 'grey', 'green', 'blue']
 *      Default: null
 * 
 * - label<String>: Text to be used for the label.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function Label({mode, dot, label, style}) {
    //Label styles
    const StyledChip = styled(Chip)({...{
        backgroundColor: (mode === "orange") ? "#FEF6EE" :
            (mode === "gray") ? "#F9FAFB" :
            (mode === "brand") ? "#F9F5FF" : 
            (mode === "success") ? "#ECFDF3" : "#FFFFFF",
        color: (mode === "orange") ? "#B42318" : 
            (mode === "gray") ? "#475467" :
            (mode === "brand") ? colors.purple :
            (mode === "success") ? "#067647" : colors.darkGrey,
        border: (mode === "orange") ? "1px solid #F9DBAF" :
            (mode === "gray") ? "1px solid #EAECF0" :
            (mode === "brand") ? "1px solid #E9D7FE" :
            (mode === "success") ? "1px solid #ABEFC6" : "1px solid #D0D5DD",
        fontFamily: fonts.fontFamily,
        fontWeight: (mode === "status") ? 
            fonts.bold.fontWeight : fonts.default.fontWeight,
        fontSize: "12px",
        borderRadius: "4px"
    }, ...style});

    //Colored dot styles if using a status label
    const coloredDot = <span style={{
        backgroundColor: (dot === "orange") ? "#F79009" :
            (dot === "red") ? "#D92D20" :
            (dot === "grey") ? "#344054" : 
            (dot === "green") ? "#17B26A" : 
            (dot === "blue") ? "#2E90FA" : "#FFFFFF",
        height: "6px",
        width: "6px",
        borderRadius: "50%",
        marginLeft: "6px",
    }}/>;

    return (
        <StyledChip 
            icon={(mode === "status") ? coloredDot : null} 
            label={label} 
            size="small"
            variant="outlined" 
        />
    );
};

//Control panel settings for storybook 
Label.propTypes = {
    //Label type
    mode: PropTypes.oneOf(['orange', 'gray', 'brand', 'success', 'status']),

    //Label coloured dot if applicable
    dot: PropTypes.oneOf(['orange', 'red', 'grey', 'green', 'blue', null]),

    //Label text
    label: PropTypes.string.isRequired
};

//Default values for this component
Label.defaultProps = {
    dot: null,
    style: {}
};