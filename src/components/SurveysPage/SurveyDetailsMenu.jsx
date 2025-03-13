import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";

/**
 * Menu component for switching between survey info and survey responses when viewing survey
 * details.
 * 
 * Props:
 * - infoSelected<Boolean>: Flag determining whether the info tab is selected.
 * 
 * - setInfoSelected<Function>: Function provided by the parent component to set the
 *      infoSelected flag.
 *      Syntax: setInfoSelected(<value>)
 * 
 * - answersSelected<Boolean>: Flag determining whether the answers tab is selected.
 * 
 * - setAnswersSelected<Function>: Function provided by the parent component to set the
 *      answersSelected flag.
 *      Syntax: setAnswersSelected(<value>)
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function SurveyDetailsMenu({
    infoSelected, 
    setInfoSelected, 
    answersSelected, 
    setAnswersSelected, 
    style
}) {
    return (
        <List sx={{...{
            width: "100px",
            paddingTop: "0px"
        }, ...style}}>
            {/*Info tab*/}
            <ListItem disablePadding>
                <ListItemText 
                    primary="Info" 
                    onClick={() => {
                        setInfoSelected(true);
                        setAnswersSelected(false);
                    }}
                    sx={
                        {...(infoSelected ? {
                            backgroundColor: "#D0D5DD"
                        } : {
                            backgroundColor: "#FFFFFF",
                            "&:hover": {
                                cursor: "pointer",
                                backgroundColor: "#F9FAFB"
                            }
                        }), ...{
                            padding: "10px",
                            borderRadius: "4px"
                        }}
                    } 
                />
            </ListItem>
            {/*Answers tab*/}
            <ListItem disablePadding>
                <ListItemText 
                    primary="Answers"
                    onClick={() => {
                        setAnswersSelected(true);
                        setInfoSelected(false);
                    }}
                    sx={
                        {...(answersSelected ? {
                            backgroundColor: "#D0D5DD"
                        } : {
                            backgroundColor: "#FFFFFF",
                            "&:hover": {
                                cursor: "pointer",
                                backgroundColor: "#F9FAFB"
                            }
                        }), ...{
                            padding: "10px",
                            borderRadius: "4px"
                        }}
                    } 
                />
            </ListItem>
        </List>
    );
};

//Control panel settings for storybook
SurveyDetailsMenu.propTypes = {
    //Flag determining whether the info tab is selected
    infoSelected: PropTypes.bool,

    //Function for setting the infoSelected flag
    setInfoSelected: PropTypes.func,

    //Flag determining whether the answers tab is selected
    answersSelected: PropTypes.bool,

    //Function for setting the answersSelected flag
    setAnswersSelected: PropTypes.func
};

//Default values for this component
SurveyDetailsMenu.defaultProps = {
    style: {}
};