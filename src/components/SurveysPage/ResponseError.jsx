import Box from "@mui/system/Box";
import { fonts } from "../../Styles";

/**
 * Satisfactory survey error page to be displayed if an invalid token is provided.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function ResponseError({style}) {
    return (
        <Box sx={{...{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            paddingX: "20%",
            paddingY: "50px",
            backgroundColor: "#FCFCFD",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <h4 style={{ textAlign: "center" }}>
                An error occurred. Either the token provided is invalid or the survey has already been completed.
            </h4>
        </Box>
    );
};

//Control panel settings for storybook
ResponseError.propTypes = {};

//Default values for this component
ResponseError.defaultProps = {
    style: {}
};