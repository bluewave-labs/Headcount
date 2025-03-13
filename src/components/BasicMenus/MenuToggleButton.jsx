import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/system/Box';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../BasicMenus/MenuItem';

/**
 * Button component which displays a dropdown menu when toggled.
 * 
 * Props:
 * - label<String>: Text to be used for the button label.
 * 
 * - menuItems<Object>: Object containing states and functions for setting states in 
 *      parent components.
 *      Syntax: {
 *          <item name1>: [<item state1> <setState function1>]
 *          <item name2>: [<item state2> <setState function2>]
 *          ...
 *          <item nameN>: [<item stateN> <setState functionN>]
 *      }
 * 
 * - icon<Component>: Optional prop for including an icon in the button label.
 *      Default: null
 * 
 * - style<Object>: Optional prop for adding further inline styling .
 *      Default: {}
 */
export default function MenuToggleButton({label, menuItems, icon, style}) {
    const [selected, setSelected] = useState(false);
    const [display, setDisplay] = useState("none");

    useEffect(() => {setDisplay((selected) ? "block" : "none")});

    const StyledChip = styled(Chip)({
        backgroundColor: (selected) ? "#EAECF0" : "#FFFFFF",
        borderRadius: "4px"
    });

    return (
        <Box sx={{...{position: "relative"}, ...style}}>
            <StyledChip 
                icon={icon} 
                label={label} 
                variant="outlined" 
                onClick={() => setSelected(!selected)} 
            />
            <Box sx={{
                display: display, 
                position: "absolute", 
                width: 300, 
                border: "1px solid #EAECF0", 
                borderRadius: 2,
                backgroundColor: "#FFFFFF",
                zIndex: 999, 
                right: 0}}>
                <List>
                    {Object.entries(menuItems).map(([key, value]) => (
                        <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                            <MenuItem state={value[0]} setState={value[1]}>{key}</MenuItem>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

//Control panel settings for storybook
MenuToggleButton.propTypes = {
    //Button text
    label: PropTypes.string.isRequired,

    //Object containing menu items to be rendered
    menuItems: PropTypes.objectOf(PropTypes.array),

    //Icon to be displayed on the button
    icon: PropTypes.element
};

//Default values for this component
MenuToggleButton.defaultProps = {
    icon: null,
    style: {}
};