import Box from '@mui/system/Box';
import { fonts } from '../../Styles';

/**
 * Component with some text or web elements to be displayed when there is no content to display in
 * the parent component.
 * 
 * Props:
 * - children<Any>: Text or web elements to be displayed with the logo.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function NoContentComponent({children, style}) {
    return (
        <Box sx={{...{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <Box sx={{
                width: "256px",
                border: "1px solid #EBEBEB",
                borderRadius: "8px",
                padding: "18px",
                marginBottom: "20px",
                marginX: "auto"
            }}>
                <Box sx={{
                    width: "85px",
                    height: "13px",
                    borderRadius: "3px",
                    backgroundColor: "#D9D9D9",
                    marginBottom: "20px"
                }}/>
                <Box sx={{
                    width: "100%",
                    height: "20px",
                    borderRadius: "3px",
                    backgroundColor: "#F3F3F3",
                    marginBottom: "13px"
                }}/>
                <Box sx={{
                    width: "100%",
                    height: "20px",
                    borderRadius: "3px",
                    backgroundColor: "#F3F3F3",
                    marginBottom: "13px"
                }}/>
                <Box sx={{
                    width: "100%",
                    height: "20px",
                    borderRadius: "3px",
                    backgroundColor: "#F3F3F3"
                }}/>
            </Box>
            {children}
        </Box>
    );
};

//Control panel settings for storybook
NoContentComponent.propTypes = {};

//Default values for this component
NoContentComponent.defaultProps = {
    style: {}
};