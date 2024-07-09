import Chip from '@mui/material/Chip';
import Box from '@mui/system/Box';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Button component which displays a dropdown menu when toggled.
 * 
 * Props:
 * - label<String>: Text to be used for the button label.
 * 
 * - menuComponent<Component>: Menu component to be displayed when button is toggled.
 * 
 * - icon<Component>: Optional prop for including an icon in the button label.
 *      Default: null
 * 
 * - style<Object>: Optional prop for adding further inline styling .
 *      Default: {}
 */
export default function MenuToggleButton({label, menuComponent, icon, style}) {
    const [selected, setSelected] = useState(false);
    const [display, setDisplay] = useState("none");

    useEffect(() => {setDisplay((selected) ? "block" : "none")});

    const StyledChip = styled(Chip)({
        backgroundColor: (selected) ? "#EAECF0" : "#FFFFFF",
        borderRadius: "4px"
    });

    return (
        <Box sx={style}>
            <StyledChip icon={icon} label={label} variant="outlined" onClick={() => setSelected(!selected)} />
            <Box sx={{display: display, position: "absolute"}}>
                {menuComponent}
            </Box>
        </Box>
    );
};

//Control panel settings for storybook
MenuToggleButton.propTypes = {
    //Button text
    label: PropTypes.string.isRequired
};

//Default values for this component
MenuToggleButton.defaultProps = {
    icon: null,
    style: {}
};