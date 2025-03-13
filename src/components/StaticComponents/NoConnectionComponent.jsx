import Box from '@mui/system/Box';
import Logo from '../../Images/SeekPng.com_failure-png_9776670.png';
import { fonts } from '../../Styles';

/**
 * Component with some text or web elements to be displayed when the servers are unresponsive.
 * 
 * Props:
 * - children<Any>: Text or web elements to be displayed with the logo.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function NoConnectionComponent({children, style}) {
    return (
        <Box sx={{...{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <img src={Logo} alt="No Connection Logo" style={{
                width: "256px",
                marginTop: "100px",
                marginBottom: "20px",
                marginLeft: "auto",
                marginRight: "auto"
            }} />
            {children}
        </Box>
    );
};

//Control panel settings for storybook
NoConnectionComponent.propTypes = {};

//Default values for this component
NoConnectionComponent.defaultProps = {
    style: {}
};