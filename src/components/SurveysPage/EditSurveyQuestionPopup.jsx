import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import HRMButton from "../Button/HRMButton";
import { fonts, colors } from "../../Styles";

/**
 * Popup component for editing a survey question text.
 * 
 * Props:
 * - question<Object>: The survey question being edited.
 *      Syntax: {
 *          index: <Integer>
 *          question: <String>
 *      }
 * 
 * - update<Function>: Function provided by the parent component for updating a survey question.
 *      Syntax: update(<updated question>)
 * 
 * - close<Function>: Function provided by the parent component for closing this popup component.
 *      Syntax: close()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function EditSurveyQuestionPopup({question, update, close, style}) {
    //The updated question object
    const [newQuestion, setNewQuestion] = useState(question);

    return (
        <Box sx={{...{
            borderRadius: "12px",
            padding: "30px",
            minWidth: "532px",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <Stack
                direction="row"
                alignItems="flex-start"
                spacing={2}
            >
                {/*Textfield containing the modified question text*/}
                <TextField 
                    value={newQuestion.question}
                    rows={4}
                    multiline
                    onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                    sx={{
                        width: "100%"
                    }}
                />
                {/*Update and cancel buttons*/}
                <Stack
                    direction="column"
                    alignItems="center"
                    spacing={1}
                >
                    <HRMButton mode="primary" onClick={() => update(newQuestion)}>Update</HRMButton>
                    <HRMButton mode="secondaryB" onClick={close}>Cancel</HRMButton>
                </Stack>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
EditSurveyQuestionPopup.propTypes = {};

//Default values for this component
EditSurveyQuestionPopup.defaultProps = {
    style: {}
};