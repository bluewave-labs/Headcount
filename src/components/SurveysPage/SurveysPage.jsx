import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import SurveysMenu from "./SurveysMenu";
import { fonts } from "../../Styles";

/**
 * Surveys page of the HRM application. Contains the surveys menu.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function SurveysPage({style}) {
    return (
        <Box sx={{...{
            //padding: "40px",
            paddingBottom: "40px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{
                    marginBottom: "16px",
                    minWidth: "1042px"
                }}    
            >
                <h3>Satisfaction Surveys</h3>
            </Stack>
            <SurveysMenu />
        </Box>
    );
};

//Control panel settings for storybook
SurveysPage.propTypes = {};

//Default values for this component
SurveysPage.defaultProps = {
    style: {},
};