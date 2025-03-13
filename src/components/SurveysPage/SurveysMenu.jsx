import Box from "@mui/system/Box";
import CustomTabs from "../tabs/CustomTabs";
import ResultsTabContent from "./ResultsTabContent";
import TemplatesTabContent from "./TemplatesTabContent";
import { fonts } from "../../Styles";

/**
 * Menu component for the surveys page.
 * 
 * Props: 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function SurveysMenu({style}) {
    const tabs = [
        { label: "Results", child: <ResultsTabContent /> },
        { label: "Templates", child: <TemplatesTabContent />}
    ]

    return (
        <Box sx={{...{
            boxSizing: "border-box",
            minWidth: "980px",
            paddingX: "45px",
            paddingY: "57px",
            border: "1px solid #EAECF0",
            borderRadius: "5px",
            backgroundColor: "#FFFFFF",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <CustomTabs items={tabs} />
        </Box>
    );
};

//Control panel settings for storybook
SurveysMenu.propTypes = {};

//Default values for this component
SurveysMenu.defaultProps = {
    style: {}
};