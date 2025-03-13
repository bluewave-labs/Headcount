import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import Chip from '@mui/material/Chip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HRMButton from '../Button/HRMButton';
import PropTypes from 'prop-types';
import { fonts } from '../../Styles';

/**
 * Navbar component for displaying the page numbers for displaying pages of various menus.
 * 
 * Props:
 * - numOfEntries<Integer>: The number of entries to be displayed by the parent menu component.
 *      Must be greater than 0.
 * 
 * - currentPage<Integer>: The currently selected page in the parent menu component. Is set 
 *      using the parent's state management hooks. Must be between 1 and the number of pages.
 * 
 * - handlePage<Function>: The function to set the currently selected page.
 *      Syntax: handlePage(<page number>)
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function PagesNavBar({numOfEntries, currentPage, handlePage, style}) {
    const numOfPages = Math.ceil(numOfEntries / 10);
    const pageNumbers = Array.from({length: numOfPages}, (_, i) => i + 1);

    //Body of the navbar, displaying the page numbers
    let pageButtons;

    //If there are less than 7 pages of updates, just display all the pages
    if (numOfPages < 7) {
        pageButtons = <Stack direction="row" spacing={1}>
            {pageNumbers.map((n) => (
                (currentPage === n) ? 
                    <Chip label={n} sx={{backgroundColor: "#EAECF0"}} /> : 
                    <Chip label={n} onClick={() => handlePage(n)} sx={{backgroundColor: "#FFFFFF"}} />
            ))}
        </Stack>;
    }
    //If there are more than 7 pages of updates, some page numbers will need to be truncated to 
    //fit everything in
    else {
        pageButtons = <Stack direction="row" spacing={1}>
            {/*Always display the first 3 page buttons*/}
            {(currentPage === 1) ? 
                <Chip label={1} sx={{backgroundColor: "#EAECF0"}} /> : 
                <Chip label={1} onClick={() => handlePage(1)} sx={{backgroundColor: "#FFFFFF"}} />}
            {(currentPage === 2) ? 
                <Chip label={2} sx={{backgroundColor: "#EAECF0"}} /> : 
                <Chip label={2} onClick={() => handlePage(2)} sx={{backgroundColor: "#FFFFFF"}} />}
            {(currentPage === 3) ? 
                <Chip label={3} sx={{backgroundColor: "#EAECF0"}} /> : 
                <Chip label={3} onClick={() => handlePage(3)} sx={{backgroundColor: "#FFFFFF"}} />}
            {/*Display ellipsis if there is a significant gap between the current page and the
                first 3 pages*/}
            {currentPage > 6 && <Chip label={"..."} sx={{backgroundColor: "#FFFFFF"}} />}

            {/*Display the current page as well as buttons for the previous and next 2 pages
            if they are not already displayed*/}
            {(currentPage - 2 > 3 && currentPage - 2 < numOfPages - 2) && 
                <Chip label={currentPage - 2} onClick={() => handlePage(currentPage - 2)} sx={{backgroundColor: "#FFFFFF"}} />}
            {(currentPage - 1 > 3 && currentPage - 1 < numOfPages - 2) && 
                <Chip label={currentPage - 1} onClick={() => handlePage(currentPage - 1)} sx={{backgroundColor: "#FFFFFF"}} />}
            {(currentPage > 3 && currentPage < numOfPages - 2) && 
                <Chip label={currentPage} sx={{backgroundColor: "#EAECF0"}} />}
            {(currentPage + 1 > 3 && currentPage + 1 < numOfPages - 2) && 
                <Chip label={currentPage + 1} onClick={() => handlePage(currentPage + 1)} sx={{backgroundColor: "#FFFFFF"}} />}
            {(currentPage + 2 > 3 && currentPage + 2 < numOfPages - 2) && 
                <Chip label={currentPage + 2} onClick={() => handlePage(currentPage + 2)} sx={{backgroundColor: "#FFFFFF"}} />}
            
            {/*Display ellipsis if there is a significant gap between the current page and the
                last 3 pages*/}
            {currentPage < numOfPages - 5 && <Chip label={"..."} sx={{backgroundColor: "#FFFFFF"}} />}
            {/*Always display the last 3 page buttons*/}
            {(currentPage === numOfPages - 2) ? 
                <Chip label={numOfPages - 2} sx={{backgroundColor: "#EAECF0"}} /> : 
                <Chip label={numOfPages - 2} onClick={() => handlePage(numOfPages - 2)} sx={{backgroundColor: "#FFFFFF"}} />}
            {(currentPage === numOfPages - 1) ? 
                <Chip label={numOfPages - 1} sx={{backgroundColor: "#EAECF0"}} /> : 
                <Chip label={numOfPages - 1} onClick={() => handlePage(numOfPages - 1)} sx={{backgroundColor: "#FFFFFF"}} />}
            {(currentPage === numOfPages) ? 
                <Chip label={numOfPages} sx={{backgroundColor: "#EAECF0"}} /> : 
                <Chip label={numOfPages} onClick={() => handlePage(numOfPages)} sx={{backgroundColor: "#FFFFFF"}} />}
        </Stack>
    }

    return (
        <Box sx={{...{
            boxSizing: "border-box",
            minWidth: "925px",
            display: "flex",
            padding: 2,
            justifyContent: "space-between",
            border: "1px solid #EAECF0",
            borderRadius: "4px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <HRMButton mode="secondaryB" startIcon={<ArrowBackIcon />} onClick={() => handlePage(currentPage - 1)}>Previous</HRMButton>
            {pageButtons}
            <HRMButton mode="secondaryB" endIcon={<ArrowForwardIcon />} onClick={() => handlePage(currentPage + 1)}>Next</HRMButton>
        </Box>
    );
};

//Control panel settings for storybook
PagesNavBar.propTypes = {
    //Number of entries to display in parent component
    numOfEntries: PropTypes.number,

    //Currently selected page
    currentPage: PropTypes.number,

    //Function for changing the selected page
    handlePage: PropTypes.func
};

//Default values for this component
PagesNavBar.defaultProps = {
    style: {}
};