import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import { colors, fonts } from "../../Styles"

/**
 * Popup component for displaying an employee's responses in the surveys page.
 * 
 * Props:
 * - survey<Object>: Object containing employee name and survey responses
 *      Syntax: {
 *          name: <String>
 *          team: <String>
 *          response: {
 *              question: <String>
 *              answer: <String>
 *          }
 *      }
 * 
 * - hasPrev<Boolean>: Flag determining if there is a previous survey to navigate to in the parent component.
 * 
 * - prev<Function>: Function provided by the parent component for navigating to the previous survey.
 *      Syntax: prev()
 * 
 * - hasNext<Boolean>: Flag determining if there is a next survey to navigate to in the parent component.
 * 
 * - next<Function>: Function provided by the parent component for navigating to the next survey.
 *      Syntax: next()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function SurveyResponsePopup({survey, hasPrev, prev, hasNext, next, style}) {
    //Custom style elements
    const StyledTD = styled("td")({
        verticalAlign: "top",
        textAlign: "start",
        width: "50%",
        paddingTop: "10px",
        paddingBottom: "20px",
        borderTop: "1px solid #EBEBEB"
    });

    return (
        <Box sx={{...{
            padding: "30px",
            fontFamily: fonts.fontFamily,
            fontSize: fonts.default.size
        }, ...style}}>
            {/*Employee name and navigation buttons*/}
            <Stack 
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    marginBottom: "30px"
                }}
            >
                <ArrowBackIosNewIcon 
                    onClick={prev}
                    sx={hasPrev ? 
                        {
                            backgroundColor: "#FFFFFF",
                            "&:hover": {
                                cursor: "pointer",
                                backgroundColor: "#D0D5DD"
                            }
                        } : {
                            backgroundColor: "#FFFFFF",
                            color: colors.lightGrey
                        }
                    }
                />
                <h3>{survey.name}</h3>
                <ArrowForwardIosIcon
                    onClick={next}
                    sx={hasNext ? 
                        {
                            backgroundColor: "#FFFFFF",
                            "&:hover": {
                                cursor: "pointer",
                                backgroundColor: "#D0D5DD"
                            }
                        } : {
                            backgroundColor: "#FFFFFF",
                            color: colors.lightGrey
                        }
                    } 
                />
            </Stack>
            {/*Survey questions and responses*/}
            <table cellSpacing="20" style={{ width: "100%" }}>
                <tr>
                    <StyledTD><h3>Question</h3></StyledTD>
                    <StyledTD><h3>Response</h3></StyledTD>
                </tr>
                {survey.satisfactionSurveyResponses.map((q) => (
                    <tr>
                        <StyledTD><b>{q.question}</b></StyledTD>
                        <StyledTD>{q.answer}</StyledTD>
                    </tr>
                ))}
            </table>
        </Box>
    );
};

//Control panel settings for storybook
SurveyResponsePopup.propTypes = {
    //Object containing employee name and survey responses
    survey: PropTypes.object,

    //Flag determining if there is a previous survey to navigate to in the parent component
    hasPrev: PropTypes.bool,

    //Function provided by the parent component for navigating to the previous survey
    prev: PropTypes.func,

    //Flag determining if there is a next survey to navigate to in the parent component
    hasNext: PropTypes.bool,

    //Function provided by the parent component for navigating to the next survey
    next: PropTypes.func
};

//Default values for this component
SurveyResponsePopup.defaultProps = {
    style: {}
};