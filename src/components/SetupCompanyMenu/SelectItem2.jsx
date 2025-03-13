import { styled } from '@mui/system';
import PropTypes from 'prop-types';

/**
 * Button component for selecting deparmentments and roles in the SetupDepartmentsMenu and 
 * SetupRolesMenu components
 * 
 * Props:
 * - children<Any>: Text to be used for the button label
 * 
 * - state<Boolean>: Flag determining whether the button this component represents is selected.
 * 
 * - setState<Function>: Function for toggling the selected state this component represents.
 *      Syntax: setState(<Boolean>)
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SelectItem({children, state, setState, style}) {
    //Button styles
    let Item = styled("div")({...{
        backgroundColor: "#FFFFFF",
        border: "1px solid",
        borderColor: state ? "#D6BBFB" : "#D0D5DD",
        color: state ? "#6941C6" : "#475467",
        outline : state ? "5px solid #9E77ED3D" : 0,
        padding: "10px",
        borderRadius: "4px",
        textAlign: "center",
        fontSize: "13px",
        fontFamily: "Inter, sans-serif",
        "&:hover": {
            cursor: "pointer"
        }
    }, ...style});

    return (
        <Item onClick={() => setState(!state)}>{children}</Item>
    );
};

//Control panel settings for storybook 
SelectItem.propTypes = {
    //SelectItem text
    children: PropTypes.string,

    //SelectItem state
    state: PropTypes.bool,

    //SelectItem setState function
    setState: PropTypes.func
};

//Default values for this component
SelectItem.defaultProps = {
    state: false,
    setState: () => {},
    children: 'Label',
    style: {}
};