import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/system/Stack";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import HRMButton from "../Button/HRMButton";
import { fonts, colors } from "../../Styles";

/**
 * Table component for displaying the files to be downloaded and viewed in the onboarding 
 * documents page.
 * 
 * Props:
 * - files<Array<Object>>: List of file names for each file
 *      Syntax of file object: {
 *          name: <String>
 *      }
 * 
 * - style<Object>: Optional prop for adding further inline styling
 *      Default: {} 
 */
export default function FilesTable({files, style}) {
    //Custom style elements
    const TableHeaderCell = styled(TableCell)({
        color: colors.darkGrey,
        paddingTop: "10px",
        paddingBottom: "10px"
    });

    return (
        <TableContainer sx={{...{
            minWidth: "812px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <Table>
                <TableHead>
                    <TableRow sx={{backgroundColor: "#F9FAFB"}}>
                        <TableHeaderCell>
                            <b style={{color: colors.grey}}>File name</b>
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files.map((file) => (
                        <TableRow>
                            <TableCell>
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <b>{file.title}</b>
                                    <HRMButton mode="tertiary">
                                        <a
                                            href={`data:application/pdf;base64,${atob(file.file)}`}
                                            download={file.name}
                                            style={{
                                                textDecoration: "none",
                                                fontWeight: "bold",
                                                color: "#7F56D9"
                                            }}
                                        >
                                            Download
                                        </a>
                                    </HRMButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

//Control panel settings for storybook
FilesTable.propTypes = {
    //Files to be downloaded
    files: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
};

//Default values for this component
FilesTable.defaultProps = {
    style: {}
};