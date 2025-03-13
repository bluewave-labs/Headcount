import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import HRMButton from "../Button/HRMButton";
import Checkbox from "../Checkbox/Checkbox";
import FilesTable from "./FilesTable";
import { fetchAllByOnboardingId } from "../../assets/FetchServices/File";
import { fonts } from "../../Styles";

/**
 * Menu component for the onboarding page containing onboarding documents to be viewed.
 * 
 * Props:
 * - prev<Function>: Function provided by the parent component to transition to the previous page.
 *      Syntax: previous()
 * 
 * - next<Function>: Function provided by the parent component to transition to the next page.
 *      Syntax: next()
 * 
 * - save<Function>: Function provided by the parent component to save the onboarding status and navigate to the
 *      application's homepage
 *      Syntax: save()
 * 
 * - readDocuments<Boolean>: Flag determining if the user has declared that s/he has reviewed all the documents.
 * 
 * - setReadDocuments<Function>: Function provided by the parent component to set the readDocuments flag.
 *      Syntax: setReadDocuments(<Boolean>)
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function OnboardingDocuments({prev, next, save, readDocuments, setReadDocuments, onboardingId, style}) {
    //Files to be displayed
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getFiles();
        console.log(files);
    }, []);

    //Function for retrieving the onboarding files
    function getFiles() {
        fetchAllByOnboardingId(onboardingId).then((data) => setFiles(data));
    };

    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: "10px",
            minWidth: "1003px",
            paddingX: "113px",
            paddingY: "44px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Title*/}
            <h4 style={{textAlign: "center", marginTop: 0, marginBottom: "10px"}}>Read the documents below</h4>
            <p style={{textAlign: "center", marginBottom: "50px"}}>
                You can view the documents in any browser or pdf viewer.
            </p>
            {/*Content*/}
            <FilesTable files={files} style={{marginBottom: "50px"}} />
            <Stack direction="row" alignItems="center" spacing={1} sx={{marginBottom: "30px"}}>
                <Checkbox
                    type="checkbox"
                    id="readDocuments"
                    name="readDocuments"
                    value="readDocuments"
                    size="large"
                    checked={readDocuments}
                    onChange={() => setReadDocuments(!readDocuments)}
                />
                <p>I have read the documents.<span style={{color: "red"}}>*</span></p>
            </Stack>
            {/*Buttons*/}
            <Stack direction="row" alignContent="center" justifyContent="space-between">
                <HRMButton mode="secondaryB" startIcon={<ArrowBackIcon />} onClick={prev}>Previous</HRMButton>
                <Stack direction="row" alignContent="center" spacing={2}>
                    <HRMButton 
                        mode="secondaryB" 
                        onClick={save}
                    >
                        Save and complete later
                    </HRMButton>
                    <HRMButton mode="primary" enabled={readDocuments} onClick={next}>Save and next</HRMButton>
                </Stack>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
OnboardingDocuments.propTypes = {
    //Function for transitioning to the previous page
    prev: PropTypes.func,

    //Function for transitioning to the next page
    next: PropTypes.func,

    //Function for saving the onboarding status
    save: PropTypes.func,

    //Flag determining whether the user has declared that s/he has read the documents
    readDocuments: PropTypes.bool,

    //Function for setting the readDocuments flag
    setReadDocuments: PropTypes.func
};

//Default values for this component
OnboardingDocuments.defaultProps = {
    style: {}
};